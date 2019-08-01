import React, { Component } from 'react'
import {View,ScrollView,Dimensions,Text,TouchableOpacity,StatusBar,FlatList,StyleSheet} from 'react-native'
import {
    LineChart,
    StackedBarChart,
 
  } from 'react-native-chart-kit'
  const{width,height}=Dimensions.get('window')
  import {LinearGradient} from 'expo-linear-gradient'
  import Block from '../componentes/Block'
  import rgba from 'hex-to-rgba'
  import { networkIp } from '../direccionIp';


export default class Dashboard extends Component {
    static navigationOptions =({ navigation }) =>({
        header:null,
    })
    constructor(props){
        super(props)
        this.state=({
            resumenProductos:[],
            activas:[],
            resumenFechas:[],
            loading:true,
            loading2:true,
            loading3:true
        })
    }
    
     _renderItem = ({item}) => {
        var color1 = Array('#8EC5FC','#A9C9FF','#D9AFD9')
        var color2 = Array('#E0C3FC','#FFBBEC','#97D9E1')
        var index=Math.floor(Math.random()*color1.length)
        return (
            
           <TouchableOpacity  activeOpacity={0.8} key={item.id} style={styles.cardInicio} onPress={()=>this.props.navigation.navigate('MonitoreoProduccion', {
            produccion:item
        })} >
                <LinearGradient 
                    end={{x:1,y:0}}
                    colors={[color1[index],color2[index]]}
                    style={styles.activos}
                    >
                        <Text style={{letterSpacing:0.5,fontSize:18,color:'white',fontWeight:'bold'}}>{item.nombre_producto}</Text>
                        <Text style={{letterSpacing:0.5,fontSize:14,color:'white',   fontWeight: "500",}}>{item.cantidad_producir}u</Text>
                        <Text style={{letterSpacing:0.5,fontSize:14,color:'white',fontWeight:'bold'}}>${item.costo_total}</Text>
                        <Text style={{letterSpacing:0.5,fontSize:12,color:'white',fontWeight:'bold'}}>{item.fecha_ini_produccion} - {item.fecha_fin_produccion}</Text>
                        <Text style={{letterSpacing:0.5,fontSize:12,color:'white',paddingLeft:5,fontWeight:'bold'}}>Lotes: {item.lotes} - Peso: {item.peso}</Text>
                
                </LinearGradient>
            </TouchableOpacity>
           
        )
   }
    componentDidMount(){
        fetch(networkIp.ipAddress+'/resumenProductos').then((response) => response.json()).then((responseData) => {
                this.setState({
                    resumenProductos: responseData,
                    loading:false
                });
            }).then(()=>{
                fetch(networkIp.ipAddress+'/produccionesActivas').then((response) => response.json()).then((responseData)  => {
        
                    this.setState({
                    activas: responseData,
                    loading2:false
                    });
                    
                    }).then(()=>{
                        fetch(networkIp.ipAddress+'/resumenFechaCantidad').then((response) => response.json()).then((responseData)  => {
                
                            this.setState({
                                resumenFechas: responseData,
                                loading3:false
                            });
                            
                            }).done();
                    }).done();
            }).done()

       
    }
    render() {
        var labelResumen=[]
        var valueResumen=[]
        var contador=0

        if(this.state.loading==false){
            this.state.resumenProductos.map((item,key) => {
                 labelResumen[contador]=item.Nombre
                 valueResumen[contador]=[item.Cantidad,item.Costo]
                contador++
            })
        }
        var labelResumenFechas=[]
        var valueResumenFechas=[]
        var contadorFechas=0

        if(this.state.loading3==false){
            this.state.resumenFechas.map((item,key) => {
                labelResumenFechas[contadorFechas]=item.Fecha
                valueResumenFechas[contadorFechas]=item.Cantidad
                contadorFechas++
            })
        }
       
       
        
        return (
            <ScrollView  style={{flex:1,paddingTop:StatusBar.currentHeight}}>
                <Text style={{padding:25,fontSize:24,color:'gray'}}>Dashboard</Text>
                <Text style={{paddingLeft:15,color:'gray', letterSpacing:0.3}}>
                    Cantidad y costo por productos
                </Text>
                { this.state.loading==false
                ? 
                    <ScrollView    showsHorizontalScrollIndicator={false}
                    horizontal={true}                    >
                        <StackedBarChart
                        data={{
                            labels: labelResumen,
                            legend: ['Cantidad', 'Costo'],
                            data: valueResumen,
                            barColors: ['#8BC6EC', '#9599E2'],
                            
                        }}
                        width={400}
                        height={220}
                        chartConfig={{
                            backgroundColor: '#ECF1FF',
                            backgroundGradientFrom: '#ECF1FF',
                            backgroundGradientTo: '#ECF1FF',
                            decimalPlaces: 2,
                            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                            style: {
                            borderRadius: 16,
                            },
                        }}
                        style={{
                            marginVertical: 8,
                            borderRadius: 16,
                            marginHorizontal:5,
                        }}
                        />
                    </ScrollView>
                : <Text> </Text>
                }
                 <Text style={{paddingLeft:15,color:'gray', letterSpacing:0.3}}>
                    Cantidad por productos fecha
                </Text>
                { this.state.loading3==false
                ? 
                    <ScrollView    showsHorizontalScrollIndicator={false}
                    horizontal={true}                    >
                        <LineChart
                            data={{
                                labels: labelResumenFechas,
                                datasets: [
                                {
                                    data: valueResumenFechas,
                                    strokeWidth: 2,
                                },
                                ],
                            }}
                            
                            width={400}
                            height={220}
                            chartConfig={{
                                backgroundColor: '#1cc910',
                                backgroundGradientFrom: '#FFEBE9',
                                backgroundGradientTo: '#FFEBE9',
                                decimalPlaces: 2,
                                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                                style: {
                                borderRadius: 16,
                                },
                            }}
                            style={{
                                marginVertical: 8,
                                borderRadius: 16,
                            }}
                            />
                    </ScrollView>
                : <Text> </Text>
                }
                <Text style={{paddingLeft:15,color:'gray', letterSpacing:0.3}}>
                    Producciones en estado activo {this.state.activas.length}
                </Text>
               <FlatList
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                    data={this.state.activas}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={this._renderItem}
                    height={220}

                />  
            </ScrollView>
        )
    }
}
const styles =StyleSheet.create({
 
    cardInicio:{
        backgroundColor:'#FFFFFF',
        borderRadius: 15,
        padding: 20,
        marginBottom: 16,
        paddingVertical:25,
        borderColor:'gray',
        justifyContent:'center',
        alignItems:'center',
        width:width/1.3
    },
    activos:{
      justifyContent:'center',
      alignItems:'center',
        height:'100%',
        borderRadius: 15,
        width:'100%'
     
    },
})