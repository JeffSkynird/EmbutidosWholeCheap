import React, { Component} from 'react'
import {Text,View,StyleSheet,ScrollView,FlatList,Dimensions,ImageBackground} from 'react-native'
import {StatusBar} from 'react-native';
import Block from '../componentes/Block'
import {LinearGradient} from 'expo-linear-gradient'
import {
  
    LineChart,
 
  } from 'react-native-chart-kit'
  const{width,height}=Dimensions.get('window')

  import { networkIp } from '../direccionIp';

export default class ProduccionInfo extends Component {
    static navigationOptions ={
        header:null
    }
    constructor(props){
        super(props)
        this.state=({
            detalle:[],
            tiempos:[],
            loading2:true 
        })
    }
 

    componentDidMount(){
        const { navigation } = this.props
        const itemId = navigation.getParam('produccion', 'NULL');
        const {id_orden_produccion} = itemId

          fetch(networkIp.ipAddress+'/produccion/'+id_orden_produccion).then((response) => response.json()).then((responseData)  => {
            
          this.setState({
                detalle: responseData 
            });
            
        }).then(()=>{
            fetch(networkIp.ipAddress+'/tiempoPorProceso/'+id_orden_produccion).then((response) => response.json()).then((responseData) => {
             this.setState({
                tiempos: responseData,
                loading2:false
             });
         }).done()
        }).done()
   
    }
    _renderItem = ({item}) => {
        var color1 = Array('#8EC5FC','#A9C9FF','#D9AFD9')
        var color2 = Array('#E0C3FC','#FFBBEC','#97D9E1')
        var index=Math.floor(Math.random()*color1.length)
        return (
            <View style={styles.cardInicio2}>
                 <LinearGradient 
                end={{x:1,y:0}}
                colors={[color1[index],color2[index]]}
                style={styles.activos}
                >
                        <View style={{justifyContent:'center',alignItems:'center'}}>
                            <Text style={{fontSize:16,color:'white',fontWeight:'bold',}}>{item.nombre_materia}</Text>
                            <Text style={{fontSize:16,color:'white',fontWeight:'bold'}}>{item.cantidad_materia} kg  </Text>
                            <Text style={{fontSize:16,color:'white',fontWeight:'bold'}}>$ {item.costo}</Text>
                        </View>
                    

                </LinearGradient>
               
              
               
            </View>
                

        )
   }
   timeStringToFloat(time) { 
    var b = time;
    var temp = new Array();
    temp = b.split('.');

    var minutes = 100 / temp[1];
    minutes = 60 / minutes;

    return parseFloat(temp[0]+'.'+minutes.toFixed(0)); 
    } 
    render() {
        const { navigation } = this.props
        const itemId = navigation.getParam('produccion', 'NULL');
        const {cantidad_producir,costo_total,lotes,peso,nombre_producto,nombre_formula,dias} = itemId
        var tiempo=[]
        var procesos=[]
        var contador=0
        if(this.state.loading2==false){
            this.state.tiempos.map((item,key) => {
                tiempo[contador]=this.timeStringToFloat((parseFloat(item.tiempo/60)).toString());
                procesos[contador]=item.nombre_proceso.toString();
              contador++
            })
        }
      
        return (
            <ScrollView style={styles.principal} showsVerticalScrollIndicator={false}>
             

                <View style={{flex:1,}}>
                    <LinearGradient 
                        end={{x:1,y:0}}
                        colors={['#784BA0','#2B86C5']}
                        style={{paddingTop:StatusBar.currentHeight,width: width, height: height/4}}
                        >
                        <Text style={{     fontSize:24,  padding: 20,color:'white'}}>Detalle de produccion</Text>
                    </LinearGradient>

                    <View style={{marginTop:-50,backgroundColor:'#F7F8FA',borderTopLeftRadius:25,borderTopRightRadius:25,paddingTop:15}}>
                        <View style={styles.cardInicio}>
                        
                        <Block >
                            <Block center>
                                <Text style={{color:'#27A9FF',fontSize:39,letterSpacing:1.7}}>{cantidad_producir} u</Text>
                                <Text style={{letterSpacing:0.7}}>{nombre_producto} - {nombre_formula} - {dias} dias</Text>
                            </Block>
                            <Block style={styles.hLine}/>
                            <Block style={{flexDirection:'row'}}>
                                <Block center>
                                    <Text style={{fontSize:14,color:'#27A9FF',marginBottom:6}}>{costo_total}</Text>
                                    <Text style={{fontSize:12,letterSpacing:0.7}}>Costo de</Text>
                                    <Text style={{fontSize:12,marginBottom:0.7}}>Inversion</Text>
                                </Block>
                                <Block center>
                                    <Text style={{fontSize:14,color:'#27A9FF',marginBottom:6}}>{peso} kg</Text>
                                    <Text style={{fontSize:12,letterSpacing:0.7}}>Peso</Text>
                                    <Text style={{fontSize:12,marginBottom:0.7}}>Total</Text>
                                </Block>
                            

                                <Block center>
                                    <Text style={{fontSize:14,color:'#27A9FF',marginBottom:6}}>{lotes}</Text>
                                    <Text style={{fontSize:12,letterSpacing:0.7}}>Lotes</Text>
                                    <Text style={{fontSize:12,marginBottom:0.7}}>Totales</Text>
                                </Block>
                            </Block>
                        </Block>
                
                    </View>
                </View>
                
                <Text style={{     fontWeight:'bold',   padding: 20,color:'gray'}}>Tiempo por procesos</Text>
                { this.state.loading2==false
                    ? 
                    <ScrollView                  showsHorizontalScrollIndicator={false}
                    horizontal={true}                    >
                        <LineChart
                        data={{
                            labels: procesos,
                            datasets: [
                            {
                                data: tiempo,
                            },
                            ],
                        }}
                        width={600}
                        height={220}
                    
                        chartConfig={{
                            backgroundColor: '#1cc910',
                            backgroundGradientFrom: '#ECF1FF',
                            backgroundGradientTo: '#ECF1FF',
                            
                            color: (opacity = 255) => `rgba(0, 0, 0, ${opacity})`,
                            style: {
                            borderRadius: 16,
                            fontSize:10
                            },
                        }}
                        bezier
                        style={{
                            marginVertical: 8,
                            borderRadius: 16,
                            
                        }}
                    />  
                    </ScrollView>
                    
                    : <Text> </Text>
                }
                
                <Text style={{     fontWeight:'bold',   padding: 20,color:'gray'}}>Materia prima usada</Text>
                <FlatList
                showsHorizontalScrollIndicator={false}

                        horizontal={true}
                        data={this.state.detalle}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={this._renderItem}
                        />
        
                    <View style={{height:50}}/>
                    </View>
                    

            </ScrollView>
        )
    }
}
const styles = StyleSheet.create({
    principal:{
        flex:1,


        backgroundColor:'#F7F8FA',
        
    },
    cardInicio:{
        backgroundColor:'#FFFFFF',
     
        borderRadius: 15,
        padding: 20,
        marginBottom: 16,
        shadowColor:'#2F2F2F',
        shadowOpacity: 0.11,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 13,
        paddingVertical:25,
        
        elevation: 2,
        marginHorizontal:30

    },
    activos:{
      justifyContent:'center',
      alignItems:'center',
        height:'100%',
        borderRadius: 15,
     
       
        flexDirection:'row'
    },
    cardInicio2:{
        backgroundColor:'#FFFFFF',
        height:200,
        width:250,
        borderRadius: 15,
        padding: 0,
        marginBottom: 0,
        shadowColor:'#2F2F2F',
        shadowOpacity: 0.11,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 13,
        paddingVertical:0,
        elevation: 2,
        marginLeft:15

    },
    
    hLine:{
        backgroundColor:'#F0F0F0',
        marginVertical:16*2,
        marginHorizontal:16*2,
        height:1
    },
    vLine:{
        flex:0,
        backgroundColor:'#F0F0F0',
        marginVertical:16/2,
        height:1
    },
})