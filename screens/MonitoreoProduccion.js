import React, { Component } from 'react'
import {Text,View,StyleSheet,ScrollView,FlatList,ImageBackground,StatusBar,Dimensions} from 'react-native'
import Block from '../componentes/Block'
import {
  
    BarChart,
 
  } from 'react-native-chart-kit'
  const{width,height}=Dimensions.get('window')
  import {LinearGradient} from 'expo-linear-gradient'
  import { networkIp } from '../direccionIp';

export default class MonitoreoProduccion extends Component {
    static navigationOptions ={
        header:null
    }
    
    constructor(props){
        super(props)
        this.state=({
            tiempo:0,
            ajustes:[],
            tiempoLote:0,
            tiempoProceso:0,
            loading:true,
            loading2:true,
            loading3:true,
            loading4:true,

        })
    }

    componentDidMount(){
        const { navigation } = this.props
        const itemId = navigation.getParam('produccion', 'NULL');
        const {id_orden_produccion} = itemId

         
        fetch(networkIp.ipAddress+'/tiempoTranscurrido/'+id_orden_produccion).then((response) => response.json()).then((responseData)  => {
            this.setState({
                    tiempo: responseData,
                    loading:false
                });
            }).then(()=>{
            fetch(networkIp.ipAddress+'/ajusteProcesos/'+id_orden_produccion).then((response) => response.json()).then((responseData) => {
             this.setState({
                ajustes: responseData,
                loading2:false
             });
         }).then(()=>{
             var id_proc=0
            if(this.state.loading==false){
                tiempo=this.state.tiempo[0].tiempo
                id_proc=this.ajustesId(tiempo)
                fetch(networkIp.ipAddress+'/tiempoPorLote/'+id_orden_produccion+'/'+id_proc).then((response) => response.json()).then((responseData) => {
                this.setState({
                    tiempoLote: responseData,
                    loading3:false
                });

                }).then(()=>{
                    fetch(networkIp.ipAddress+'/tiempoHastaProceso/'+id_orden_produccion+'/'+id_proc).then((response) => response.json()).then((responseData) => {
                        this.setState({
                            tiempoProceso: responseData,
                            loading4:false
                        });
                        }).done();
                }).done()
               
            }
            
            }).done();
        }).done();
    }
    ajustes(tiempoTrasncurrido){
        var {ajustes}=this.state
        var tiempoAcum=0
        var nombre=''
        var cont=0
        if(this.state.loading2==false){
            ajustes.map((item,key) => {
                tiempoAcum=tiempoAcum+(item.ajuste*item.total)
                if(tiempoTrasncurrido<=tiempoAcum){
                    cont++
                    if(cont==1){
                        nombre = item.nombre_proceso
                    }
                }
            })
        }
        return nombre
    }
    ajustesId(tiempoTrasncurrido){
        var {ajustes}=this.state
        var tiempoAcum=0
        var nombre=''
        var cont=0
        if(this.state.loading2==false){
            ajustes.map((item,key) => {
                tiempoAcum=tiempoAcum+(item.ajuste*item.total)
                if(tiempoTrasncurrido<=tiempoAcum){
                    cont++
                    if(cont==1){
                        nombre = item.id_proceso
                    }
                }
            })
        }
        return nombre
    }
    timeStringToFloat(time) { 
        var b = time;
        var temp = new Array();
        temp = b.split('.');
  
        var minutes = 100 / temp[1];
        minutes = 60 / minutes;

        return temp[0] + ' : ' + minutes.toFixed(0); 
    } 
    render() {
        const { navigation } = this.props
        const itemId = navigation.getParam('produccion', 'NULL');
        const {cantidad_producir,costo_total,lotes,peso,nombre_producto,nombre_formula,dias} = itemId
        var tiempo=0
        var proceso=''
        var tiempoLote=0
        var tiempoProceso=0
        var lote=0
        var costoActual=0
        var costoEspera=0
        var costos=[]
        if(this.state.loading==false){
            tiempo=this.state.tiempo[0].tiempo
            proceso=this.ajustes(tiempo)
            
        }
        if(this.state.loading3==false){
            tiempoLote=this.state.tiempoLote[0].tiempo
           
        }
        if(this.state.loading4==false){
            tiempoProceso=this.state.tiempoProceso[0].tiempo
            var conta=0
            var acum=0
            var repetido=0
             lote=0
            while(conta<lotes){
                acum=acum+tiempoLote
                acum = acum +tiempoProceso
                if(tiempo<=acum){

                    repetido++
                    if(repetido==1){
                        lote=(conta+1)
                    }
                }
               
                conta++
            }

            costoActual=lote*costo_total/lotes
            costoEspera=(lotes-lote)*costo_total/lotes
            costos[0]=costoActual
            costos[1]=costoEspera

        }
        
        
        return (
            <ScrollView style={styles.principal} showsVerticalScrollIndicator={false}>
             

                <View style={{flex:1}}>
                    <ImageBackground source={require('../assets/fondo8.png')} style={{width: width, height: height/2.5,paddingTop:StatusBar.currentHeight}}>
                            <Text style={{     fontSize:24,  padding: 15,color:'white'}}>Monitoreo de producción</Text>
                            <Block center style={{justifyContent:'flex-end',marginBottom:50}}>
                                    <Text style={{letterSpacing:0.7,color:'white',fontSize:20,marginTop:10,fontWeight:'bold',backgroundColor:'black',opacity:0.6}}>{nombre_producto} - {nombre_formula} - {dias} dias</Text>
                            </Block>
                    </ImageBackground>
                    <View style={{borderTopRightRadius:25,borderTopLeftRadius:25,marginTop:-45,backgroundColor:'#F7F8FA',paddingTop:20}}>
                    <Text style={{ color:'#FF4957',fontWeight:'bold',fontSize:30,letterSpacing:1.7,textTransform:'uppercase', marginBottom:10,paddingLeft:20,opacity:0.7}}>{proceso}</Text>
                    <LinearGradient 
                        end={{x:1,y:0}}
                        colors={['#FF9A8B','#FF6A88']}
                        style={styles.cardInicio}
                        >

                            <Block >
                                <Block style={{flexDirection:'row',marginTop:10}}>
                                    <Block center>
                                        <Text style={{fontSize:14,color:'white',marginBottom:6}}> {this.timeStringToFloat((tiempo/60).toFixed(2).toString())}</Text>
                                        <Text style={{fontSize:12,color:'white',letterSpacing:0.7}}>Tiempo</Text>
                                        <Text style={{fontSize:12,color:'white',marginBottom:0.7}}>Trasncurrido</Text>
                                    </Block>
                                    <Block center>
                                        <Text style={{fontSize:14,color:'white',marginBottom:6}}>{lote}</Text>
                                        <Text style={{fontSize:12,color:'white',letterSpacing:0.7}}>Lote</Text>
                                        <Text style={{fontSize:12,color:'white',marginBottom:0.7}}>Actual</Text>
                                    </Block>
                                

                                    <Block center>
                                        
                                        <Text style={{fontSize:14,color:'white',marginBottom:6}}>{lote * peso / lotes} kg</Text>
                                        <Text style={{fontSize:12,color:'white',letterSpacing:0.7}}>Peso</Text>
                                        <Text style={{fontSize:12,color:'white',marginBottom:0.7}}>Total</Text>
                                    </Block>
                                </Block>
                            </Block>
                        </LinearGradient>
                        <Text style={{     fontWeight:'bold',   padding: 20,color:'gray'}}>Costos de inverson</Text>
                        { this.state.loading4==false
                            ? <BarChart
                            data={{
                                labels: [
                                'Costo actual',
                                'Costo en espera'
                                
                                ],
                                datasets: [
                                {
                                    data: costos,
                                },
                                ],
                            }}
                            width={Dimensions.get('window').width - 16}
                            height={220}
                            yAxisLabel={'$'}
                            chartConfig={{
                                backgroundColor: '#1cc910',
                                backgroundGradientFrom: '#eff3ff',
                                backgroundGradientTo: '#efefef',
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
                            : <Text> </Text>
                        }
                    </View>
                    
                    
                </View>
               
        
            </ScrollView>
        )
    }
}
const styles = StyleSheet.create({
    principal:{
        backgroundColor:'#F7F8FA',
        
    },
    cardInicio:{
        borderRadius: 15,
        marginBottom: 16,
        shadowColor:'#2F2F2F',
        shadowOpacity: 0.11,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 13,
        paddingVertical:10,
        elevation: 2,
        marginHorizontal:15
        
    },
})