import React, { Component } from 'react'
import { Alert,Text, StyleSheet, Image,TouchableOpacity,TextInput,Dimensions,KeyboardAvoidingView,ImageBackground,View,ActivityIndicator } from 'react-native'
import AwesomeAlert from 'react-native-awesome-alerts';
 
import Block from '../componentes/Block'
const {width,height} = Dimensions.get('window')
import {AsyncStorage} from 'react-native';
import { networkIp } from '../direccionIp';

export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = ({
          loading: true,
          apodo:'',
          clave:'',
          dataSource:[],
          showAlert: false 
         });
       }
    componentDidMount(){
        
        fetch(networkIp.ipAddress+'/sesiones')
        .then(response => response.json())
        .then((responseJson)=> {
          this.setState({
           loading: false,
           dataSource: responseJson
          })
        })
        .catch(error=>console.log(error)) //to catch the errors if any
        }
    storeData = async (sesion) => {
        
        try {
            await AsyncStorage.setItem('@sesion', sesion.toString())
        } catch (e) {
            // saving error
        }
    }
 
    autenticar(navigation){
        var prueba = 0
        var permiso=""
        var sesionU=0
        if(this.state.loading==false){
            this.state.dataSource.map((item) =>{
                if(item.apodo==this.state.apodo&&item.clave==this.state.clave){
                    prueba=1
                    permiso=item.permiso
                    sesionU=item.id_sesion
                }
            })
            if(prueba==1){
                if(permiso==1){
               
                        this.storeData(sesionU)
                        navigation.navigate('Principal')
            
                 
                }else{
                    Alert.alert("Permiso insuficiente","No posee el permiso para utilizar la aplicacion")
                }
                
            }else{
                this.showAlert();
            }
        }
       
        
    }
    showAlert = () => {
        this.setState({
          showAlert: true
        });
      };
    
      hideAlert = () => {
        this.setState({
          showAlert: false
        });
      };
    render() {
       
        const {navigation}=this.props
        const {showAlert} = this.state;
        return (
            <ImageBackground source={require('../assets/fondo.png')} style={{width: '100%', height: '100%'}}>
                <KeyboardAvoidingView 
                style={{flex:1}} 
                behavior='padding' 
                enabled
                keyboardVerticalOffset={height*0.1}
                
                >
                    <Block center middle style={{marginTop:55}} >
                        <Block middle>
                            <Image source={require('../assets/images/logoF.png')}/>
                        </Block>
                        <Block style={{marginTop:50}} flex={2.5} center>
                            
                                
                            
                            
                            <Block style={{marginTop:25}}>
                                
                                    <TextInput  onChangeText={(text) => this.setState({apodo:text})} placeholderTextColor="#fff"  style={styles.input} placeholder="Usuario"/>
                                  
                                    <TextInput   onChangeText={(text) => this.setState({clave:text})}      placeholderTextColor="#fff" placeholder="Clave" autoCapitalize='none' autoCorrect={false} secureTextEntry={true} style={styles.input}/>
                                    <TouchableOpacity style={styles.button} onPress={()=>this.autenticar(navigation)}
                                    >
                                        <Text style={styles.textButton}>INICIAR SESIÓN</Text>
                                    </TouchableOpacity>
                                    <View style={{marginBottom:30,marginTop:20,flexDirection:'row', justifyContent:'space-between'}}>
                                        <View style={styles.buttonBot}>
                                            <Image style={{width:20,height:20}}source={require('../assets/icon1.png')}/>
                                        </View>
                                        <View style={styles.buttonBot}>
                                            <Image style={{width:20,height:20}} source={require('../assets/icon2.png')}/> 
                                        </View>
                                        <View style={styles.buttonBot}>
                                            <Image style={{width:20,height:20}} source={require('../assets/icon3.png')}/>
                                        </View>
                                    </View>
                                    <Text style={{color:'white',textAlign:'center'}}>Monitoreo gerencial de producciones</Text>

                                </Block>
                                
                        </Block>
                       
                    </Block>

                </KeyboardAvoidingView>
                <AwesomeAlert
                overlayStyle={{backgroundColor:'transparent'}}
                style={{height:'100%'}}
                show={showAlert}
                showProgress={false}
                title="Error de autenticación"
                message="Credenciales incorrectas"
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={false}
                showCancelButton={false}
                showConfirmButton={true}
                confirmText="Entendido"
                confirmButtonColor="#DD6B55"
                onCancelPressed={() => {
                    this.hideAlert();
                }}
                onConfirmPressed={() => {
                    this.hideAlert();
                }}
                />
            </ImageBackground>
       
           
        )
    }
}

const styles = StyleSheet.create({
    buttonBot:{
        borderColor:"#fff",
        borderRadius:20,
        borderWidth: 1.5,
        justifyContent:'center',
        alignItems:'center',
        width:96,
        height:41
    },
    login:{
        flex:1,
        justifyContent:'center'
    },
    titulo:{
        fontSize:28,
        color:"#fff",
        letterSpacing:0,
        lineHeight:32,
        alignItems:'center',
        fontWeight:'300',
        marginBottom:6
    },
    subTitulo:{
       
        color:"#fff",
        letterSpacing:0,
        lineHeight:22,
        alignItems:'center',
        fontWeight:'300'
    },
    input:{

        borderColor:"#EBE7FF",
        borderRadius:5,
        borderBottomWidth: 1,
        fontSize:15,
        color:'#fff',
        height:45,
        paddingVertical:11,
        paddingHorizontal:16,
        marginBottom:20,
        width:width-50
    },
    label:{
        fontSize:12,
        letterSpacing:1.12,
        color:'#D5DBF3',
        lineHeight:14,
        fontWeight:'bold',
        textTransform:'uppercase',
        marginBottom:8
        
    },
    textButton:{
        color:'white',
        lineHeight:21,
        letterSpacing:0,
        fontWeight:'bold'
    },
    button:{
        backgroundColor:'#FC3A72',
        //backgroundColor:'rgba(255,255,255,0.50)',
        borderRadius:30,
        color:'#2E384D',
        height:55,
        paddingVertical:11,
        alignItems:'center',
        width:width-50,
        justifyContent:'center',
        marginBottom:12,
        marginTop:50

        
    }
    

})

