import React, { Component } from 'react'
import {Text,View,Image,StyleSheet,TouchableOpacity,ScrollView,FlatList,Dimensions,ImageBackground} from 'react-native'
import {LinearGradient} from 'expo-linear-gradient'
import Block from '../componentes/Block'
import rgba from 'hex-to-rgba'
import Icon from 'react-native-vector-icons/FontAwesome';
const{width,height}=Dimensions.get('window')
const axios = require('axios');
import { networkIp } from '../direccionIp';

export default class Principal extends Component {
  
    constructor(props) {
        super(props);
        this.state=({
            data:[
                {
                    id: 1,
                    date: 'Yesterday',
                    score: 7.2,
                    distance: '45.6 mi',
                    from: 'Midtown, San Jose, CA',
                    to: 'Downtown, San Francisco, CA',
                },
                {
                    id: 2,
                    date: 'Oct 12',
                    score: 8.3,
                    distance: '837.9 mi',
                    from: 'Burbank Avenue, San Martin, CA',
                    to: 'Llagas Avenue, Los Angeles, CA',
                },
                {
                    id: 3,
                    date: 'Oct 12',
                    score: 8.3,
                    distance: '837.9 mi',
                    from: 'Burbank Avenue, San Martin, CA',
                    to: 'Llagas Avenue, Los Angeles, CA',
                }
            ],
            resumenProductos:[],
             
            ultimasProducciones:[],
            loading:true

        })

        
     
       }
   

    static navigationOptions =({ navigation }) =>({
        header:null,
        /* headerTitle:<Text style={{fontSize:24}}>Bienvenido</Text>,
        headerRight: (
                <Block flex={false}>
                    <TouchableOpacity onPress={()=>navigation.openDrawer()}>
                    <Image source={require('../assets/Menu.png')} style={{width:24,height:24}}/>
                    </TouchableOpacity>
                </Block>
        ) */
        })
    
   
    
    /* renderCardInicio(){
        const {navigation}=this.props
        var costo=0
        var cantidad=0
        var lotes=0
        if(this.state.loading==false){
            costo=this.state.totales[0].costoTotal
            cantidad=this.state.totales[0].CantidadTotal
            lotes=this.state.totales[0].lotesTotales

        }
        return(
            <TouchableOpacity activeOpacity={0.8} onPress={()=> this.props.navigation.navigate('Producciones')}>
                <View style={styles.cardInicio}>
                    <Image resizeMode='contain' source={require('../assets/More.png')} style={styles.moreIcon}/>
                    <Block>
                        <Block center>
                            <Text style={{color:'#27A9FF',fontSize:39,letterSpacing:1.7}}>{cantidad}u</Text>
                            <Text style={{letterSpacing:0.7}}>Total de embutidos del ultimo mes</Text>
                        </Block>
                        <Block style={styles.hLine}/>
                        <Block style={{flexDirection:'row'}}>
                            <Block center>
                                <Text style={{fontSize:20,color:'#27A9FF',marginBottom:6}}>${costo}</Text>
                                <Text style={{fontSize:12,letterSpacing:0.7}}>Costo</Text>
                                <Text style={{fontSize:12,marginBottom:0.7}}>Total</Text>
                            </Block>
                            <Block   style={styles.vLine}/>

                            <Block center>
                                <Text style={{fontSize:20,color:'#27A9FF',marginBottom:6}}>{lotes}</Text>
                                <Text style={{fontSize:12,letterSpacing:0.7}}>Lotes</Text>
                                <Text style={{fontSize:12,marginBottom:0.7}}>Totales</Text>
                            </Block>
                        </Block>
                    </Block>
                </View>

            </TouchableOpacity>
            
        )
    } */
    renderActivos(){
        return(
            <TouchableOpacity    activeOpacity={0.8} onPress={()=> this.props.navigation.navigate('ProduccionesActivas')}>
                <LinearGradient 
                end={{x:1,y:0}}
                colors={['#FF4957','#FF988A']}
                style={styles.activos}
                >

                        <Block middle flex={0.4}>
                            <View  style={{justifyContent:'center',alignItems:'center' ,height: 74,width: 74,borderRadius:74,backgroundColor:rgba('#FFFFFF','0.2')}}>
                            
                                <View  style={{ justifyContent:'center',alignItems:'center' ,height: 52,width: 52,borderRadius:52,backgroundColor:rgba('#FFFFFF','0.2')}}>
                                    <Icon
                                        name="fire"
                                        color="white"
                                        size={29}
                                    />
                                </View>
                        
                                
                            </View>
                        </Block>

                    <Block middle >
                        <Text style={{color:'white',fontSize:16,fontWeight: "500",letterSpacing:0.4}}>  Produciones</Text>
                        <Text style={{color:'white',fontSize:16,fontWeight: "500",letterSpacing:0.4}}>  En estado activo </Text>
                        
                    </Block>
                </LinearGradient>
            </TouchableOpacity>

        )
    }
    
     _renderItem = ({item}) => {
         return (
             
            <TouchableOpacity activeOpacity={0.8} key={item.id} style={styles.cardInicio} onPress={()=>this.props.navigation.navigate('PrincipalInfo', {
                produccion:item
              })}>
                <Block style={{flexDirection:'row',justifyContent:'space-between',marginBottom:16}}>
                    <Text style={{letterSpacing:0.5,fontSize:12,color:'gray'}}>{item.nombre_producto}</Text>
                    <Text style={{letterSpacing:0.5,fontSize:12,color:'#27A9FF',   fontWeight: "500",}}>{item.cantidad_producir}u</Text>
                    <Text style={{letterSpacing:0.5,fontSize:12,backgroundColor:'#3498db',borderRadius:13,padding:5, color:'white'}}>${item.costo_total}</Text>
                </Block>
                <Block center style={{flexDirection:'row'}} >
                    <View style={{marginRight:8 ,justifyContent:'center',alignItems:'center',backgroundColor:rgba('#FF4957','0.2'),borderRadius:14,height:14,width:14}}>
                        <View style={{height:8,width:8,borderRadius:8,backgroundColor:'#FF4957'}}/>
                    </View>
                    <Text style={{letterSpacing:0.5,fontSize:12,color:'#BDBFC7'}}>{item.fecha_ini_produccion} - {item.fecha_fin_produccion}</Text>
                </Block>

               

                <Block center style={{flexDirection:'row'}} >
                    <View style={{justifyContent:'center',alignItems:'center',backgroundColor:rgba('#27A9FF','0.2'),borderRadius:14,height:14,width:14}}>
                        <View style={{height:8,width:8,borderRadius:8,backgroundColor:'#27A9FF'}}/>
                    </View>
                    <Text style={{letterSpacing:0.5,fontSize:12,color:'#BDBFC7'}}> Con {item.lotes} lotes con un peso de {item.lotes}kg</Text>

                </Block>
            
            </TouchableOpacity>

         )
    }
    renderProducciones(){
        return(
            <React.Fragment>
                <Block style={{marginBottom:16,flexDirection:'row', justifyContent:'space-between'}}>
                    <Text style={{color:'gray', letterSpacing:0.3,textTransform:'uppercase'}}>
                        Producciones recientes
                    </Text>
                    <Text style={{color:'gray',letterSpacing:0.3,textTransform:'uppercase'}}>
                        Ver todos
                    </Text>
                </Block>
                    <FlatList
                    data={this.state.ultimasProducciones}
                    keyExtractor={(item, index) => index.toString()}
                     renderItem={this._renderItem}
                    />

            </React.Fragment>
        
        )
    }
    componentDidMount(){
        fetch(networkIp.ipAddress+'/ultimasproducciones').then((response) => response.json()).then((responseData)  => {
            this.setState({
                ultimasProducciones: responseData
            });
        }).then(()=>{
            fetch(networkIp.ipAddress+'/resumenProductos').then((response) => response.json()).then((responseData) => {
             this.setState({
                resumenProductos: responseData,
                loading:false
             });
         }).done();
        }).done();
    }
    
    renderButton(){
        return(
            <Block center middle style={styles.start}>
                <View  style={{justifyContent:'center',alignItems:'center',backgroundColor:rgba('#27A9FF','0.1'),height:130,width:130,borderRadius:130}}>
                    <TouchableOpacity activeOpacity={0.8} onPress={()=>this.props.navigation.navigate('Dashboard')}>
                        <View style={{justifyContent:'center',alignItems:'center',backgroundColor:'#27A9FF',height:62,width:62,borderRadius:62}}>
                            <Icon
                                name="signal"
                                color="white"
                                size={62/2}
                            />
                        </View>
                    </TouchableOpacity>
                </View>
            </Block>
        )
    }
    renderListaH(){
       return( 
            <View style={{height:'55%'}}>
                <Text style={{letterSpacing:0.3,paddingLeft:15,color:'white',marginBottom:5,fontWeight:'bold'}}>
                        Productos producidos
                    </Text>
                <FlatList
                showsHorizontalScrollIndicator={false}

                    horizontal={true}
                    data={this.state.resumenProductos}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={this._renderItemH}
                    />
            </View>
            
          
                 
            )
    }
    _renderItemH = ({item}) => {
        return (
            
           <TouchableOpacity activeOpacity={0.8} key={item.id_producto} style={styles.cantidadProducida}>
               <Block style={{width:width/3,marginBottom:16}}>
                   <Text style={{letterSpacing:0.5,fontSize:16,color:'gray',fontWeight:'bold',marginBottom:5}}>{item.Nombre}</Text>
                   <Text style={{letterSpacing:0.5,fontSize:16,color:'#27A9FF',   fontWeight: "500",marginBottom:5}}>{item.Cantidad}u</Text>
                   <Text style={{letterSpacing:0.5,fontSize:14,backgroundColor:'#efefef',borderRadius:13,padding:5, textAlign:'center',color:'gray'}}>${item.Costo}</Text>
               </Block>
           </TouchableOpacity>

        )
   }
    
    render() {

        return (
            <React.Fragment>
                
                <ScrollView style={styles.principal} showsVerticalScrollIndicator={false}>
                    <LinearGradient 
                    end={{x:1,y:0}}
                    colors={['#784BA0','#2B86C5']}
                    style={{height:height/2.2}}
                    >
                        <View style={{padding:24,marginTop:24, flexDirection:'row',width:'100%',justifyContent:'space-between'}}>
                            <Text style={{fontSize:24,color:'white'}}>Bienvenido</Text>
                        
                                <TouchableOpacity  onPress={()=>this.props.navigation.navigate('Perfil')} style={{borderRadius:30,width:30,height:30,borderWidth:2,borderColor:'white',justifyContent:'center',alignItems:'center'}}>
                                <Icon
                                    name="user"
                                    color="white"
                                    size={24}
                                />
                                </TouchableOpacity>
                        
                        </View>
                        {this.renderListaH()}
                    </LinearGradient>
                        
                   
                    <View style={{ backgroundColor:'#F7F8FA',paddingHorizontal:25,paddingVertical:25,borderTopRightRadius:25,borderTopLeftRadius:25,marginTop:-35,}}>
                        {this.renderActivos()}
                        {this.renderProducciones()}
                    </View>
                            
                     
                    <View style={{height:100}}/>

                </ScrollView>
               
                {this.renderButton()}

            </React.Fragment>
            
        )
    }
}
const styles =StyleSheet.create({
    principal:{

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

    },
    cantidadProducida:{
        backgroundColor:'#FFFFFF',
        borderRadius: 15,
        padding: 20,
        marginBottom: 16,
        marginLeft:10,
        shadowColor:'#2F2F2F',
        shadowOpacity: 0.11,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 13,
        paddingVertical:25,
        elevation: 2, 
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
    moreIcon:{
        width:16,
        height:17,
        position:'absolute',
        right:16,
        top:16
    },
    activos:{
        padding:16,
        marginBottom:25,
        borderRadius: 15,
        padding: 20,
        marginBottom: 16,
        flexDirection:'row'
    },
    badge:{
        height: 74,
        width: 74,
        borderRadius:74,
        
    },
    start:{
        position:'absolute',
        bottom:0,
        left:(width-144)/2
    }

})
  