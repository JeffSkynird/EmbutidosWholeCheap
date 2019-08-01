import React, { Component } from 'react'
import {Text,View,ImageBackground,Dimensions,StatusBar,Image,TouchableOpacity} from 'react-native'
import Block from '../componentes/Block'
const{width,height}=Dimensions.get('window')
import {AsyncStorage} from 'react-native';
import { networkIp } from '../direccionIp';

export default class Perfil extends Component {
    static navigationOptions =({ navigation }) =>({
        header:null,
    })  
    constructor(props){
        super(props)
        this.state=({
            sesion:0,
            datos:[],
            loading:true
        })
    }
    getData = async () => {
        try {
          const value = await AsyncStorage.getItem('@sesion')
          if(value !== null) {
            this.setState({sesion:value})
            fetch(networkIp.ipAddress+'/datosUsuario/'+this.state.sesion).then((response) => response.json()).then((responseData)  => {
                this.setState({
                    datos: responseData,
                    loading: false
                  });
              }).done()
          }
        } catch(e) {
          // error reading value
        }
      }
    
    componentDidMount(){
        this.getData()
       
  
    }
    render() {
        var nombre_usuario=""
        var cedula=""
        var nombre_rol=""
        var email=""
        var telefono=""

        if(this.state.loading==false){
            this.state.datos.map((item,key) => {
                nombre_usuario=item.nombre_usuario
                cedula=item.cedula
                nombre_rol=item.nombre_rol
                email=item.email
                telefono=item.telefono
            })
        }
 
        return (
            <React.Fragment>
                <ImageBackground 
            resizeMode= 'cover'  
            source={require('../assets/profile.png')} style={{height:height/1.8,width:width,paddingTop:StatusBar.currentHeight     }}>
                <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                    <Text style={{fontSize:24,letterSpacing:0.3,color:'white',marginBottom:5,fontWeight:'bold'}}>
                        Mi perfil
                    </Text>  
                    <Image source={require('../assets/butcher.png')} style={{width:width/2,height:width/2,borderRadius:width/2,borderWidth:5,borderColor:'white'}}/>
                   <Text style={{marginTop:5,fontSize:24,letterSpacing:0.3,color:'white',marginBottom:5,fontWeight:'bold'}}>
                        {nombre_usuario}
                    </Text>  
                </View>
            </ImageBackground>
               <View style={{marginTop:15, justifyContent:'center',alignItems:'center'}}>
               <Text style={{  fontWeight:'bold',   padding: 20,color:'gray',fontSize:20}}>Datos</Text>
                    <View style={{marginBottom:5,padding:20,height:70, width:width-20,borderBottomColor:'#efefef',borderBottomWidth:1}}>
                        <Text style={{color:'gray'}}><Text style={{fontWeight:'bold',color:'black'}}>Rol: </Text>{nombre_rol}</Text>
                        <Text style={{color:'gray'}}><Text style={{fontWeight:'bold',color:'black'}}>Cédula: </Text>{cedula}</Text>
                       
                    </View>
                    <View style={{padding:20,height:40, width:width-20,}}>
                     
                        <Text style={{color:'gray'}}><Text style={{fontWeight:'bold',color:'black'}}>Email:</Text> {email}</Text>
                        <Text style={{color:'gray'}}><Text style={{fontWeight:'bold',color:'black'}}>Teléfono:</Text> {telefono}</Text>
                    </View>
                    
                </View>
            </React.Fragment>
            
        )
    }
}
