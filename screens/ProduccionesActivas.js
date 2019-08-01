import React, { Component } from 'react'
 import {StyleSheet,View,TouchableOpacity,Text,FlatList,RefreshControl,StatusBar,TextInput} from 'react-native'
 import Block from '../componentes/Block'
 import rgba from 'hex-to-rgba'
 import Icon from 'react-native-vector-icons/FontAwesome';
 import { Button, Paragraph, Menu, Divider, Provider } from 'react-native-paper';
 import { networkIp } from '../direccionIp';

export default class ProduccionesActivas extends Component {
    constructor(props){
        super(props)
        this.state=({
            activas:[],
            visible: false,
            isFetching: false,
            backup: []

        })
    }

    static navigationOptions ={
        header:null
    }
    search = txt => {
        let text = txt.toLowerCase()
        let tracks = this.state.backup
        let filterTracks = tracks.filter(item => {
        if(item.nombre_producto.toLowerCase().match(text)) {
          return item
        }
      })
      this.setState({ activas: filterTracks })
    }
    onRefresh() {
        this.setState({ isFetching: true }, function() { this.getApi() });
     }
     getApi(){
        fetch(networkIp.ipAddress+'/produccionesActivas').then((response) => response.json()).then((responseData)  => {
            
            this.setState({
              activas: responseData,
              isFetching: false,
              backup:responseData

              });
            }).done()
     }
    componentDidMount(){
          fetch(networkIp.ipAddress+'/produccionesActivas').then((response) => response.json()).then((responseData)  => {
            
          this.setState({
            activas: responseData,
            backup:responseData
            });
            
        }).done()
   
    }
   
    _openMenu = () => this.setState({ visible: true });

    _closeMenu = () => this.setState({ visible: false });
    _renderItem = ({item}) => {
        return (
           <View  key={item.id} style={styles.cardInicio}  >
      
                    <Block style={{flexDirection:'row',justifyContent:'space-between',marginBottom:16}}>
                            <Text style={{letterSpacing:0.5,fontSize:12}}>{item.nombre_producto}</Text>
                            <Text style={{letterSpacing:0.5,fontSize:12,color:'#27A9FF',   fontWeight: "500",}}>{item.cantidad_producir}u</Text>
                            <Text style={{letterSpacing:0.5,fontSize:12}}>${item.costo_total}</Text>
                    </Block>
                    
              
                    <View  style={{flexDirection:'row',justifyContent:'space-between'}} >
                        <Block center style={{flexDirection:'row'}} >
                            <View style={{marginRight:8 ,justifyContent:'center',alignItems:'center',backgroundColor:rgba('#FF4957','0.2'),borderRadius:14,height:14,width:14}}>
                                <View style={{height:8,width:8,borderRadius:8,backgroundColor:'#FF4957'}}/>
                            </View>
                            <Text style={{letterSpacing:0.5,fontSize:12,color:'#BDBFC7'}}>{item.fecha_ini_produccion} - {item.fecha_fin_produccion}</Text>
                        </Block>

                        <Block style={{flexDirection:'row',paddingVertical:4}} center>
                            <View  style={{backgroundColor:'#D8D8D8',height:4, width:4,borderRadius:4,marginLeft:2.5}} />
                        </Block>

                        <Block center style={{flexDirection:'row'}} >
                            <View style={{justifyContent:'center',alignItems:'center',backgroundColor:rgba('#27A9FF','0.2'),borderRadius:14,height:14,width:14}}>
                                <View style={{height:8,width:8,borderRadius:8,backgroundColor:'#27A9FF'}}/>
                            </View>
                            <Text style={{letterSpacing:0.5,fontSize:12,color:'#BDBFC7',paddingLeft:5}}>{item.lotes} lotes con un peso de {item.peso}kg</Text>
                        </Block>
                        <Block style={{alignItems:'flex-end'}}>
                            <TouchableOpacity onPress={()=>this.props.navigation.navigate('MonitoreoProduccion', {
                                produccion:item
                            })}>
                                <Icon
                                    name="eye"
                                    color="#BDBFC7"
                                    size={30}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>this.props.navigation.navigate('PrincipalInfo', {
                                produccion:item
                            })}>
                                <Icon
                                    name="archive"
                                    color="#BDBFC7"
                                    size={30}
                                />
                            </TouchableOpacity>
                       
                        </Block>
                       
                    </View>
                        
    
               
           
            </View>
           
        )
   }
    render() {
        return (
            <View style={{paddingTop:StatusBar.currentHeight}}>
                 <Text style={{     fontSize:24,  padding: 20,marginBottom:5}}>En produccion</Text>
                 <View style={{paddingLeft:15,marginHorizontal:10,height: 45,borderRadius:13, backgroundColor:'#efefef',flexDirection:'row',alignItems:'center'}}
>
                    <Icon
                        name="search"
                        color="gray"
                        size={19}
                        style={{opacity:0.5,marginRight:10}}
                        />
                    <TextInput
                        placeholder='Filtrar por nombre'
                        onChangeText={text => this.search(text)}
                        style={{ color:'gray'}}
                        />
                 </View>
                 
                <FlatList
                    data={this.state.activas}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={this._renderItem}
                    onRefresh={() => this.onRefresh()}
                    refreshing={this.state.isFetching}
                />  
            </View>
           
        )
    }
}
const styles =StyleSheet.create({
 
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
})