import * as React from 'react';
//import React
import { Text, View, StyleSheet, TextInput, ScrollView,StatusBar,FlatList,TouchableOpacity,Button} from 'react-native';
//import Basic React Native Components
import Block from '../componentes/Block'
import rgba from 'hex-to-rgba'
import Dates from 'react-native-dates';
import moment from 'moment';
import SwipeablePanel from 'rn-swipeable-panel';
import { networkIp } from '../direccionIp';

import Icon from 'react-native-vector-icons/FontAwesome';

 
export default class App extends React.Component {
  constructor(props){
    super(props)
    this.state=({
        producciones:[],
        backup: [],
        date: null,
        focus: 'startDate',
        startDate: null,
        endDate: null,
        mostrarDate: false
    })
}
  componentDidMount(){
      fetch(networkIp.ipAddress+'/producciones').then((response) => response.json()).then((responseData)  => {
      this.setState({
          producciones: responseData,
          backup: responseData
        });
    }).done()

}
search = txt => {
  let text = txt.toLowerCase()
  let tracks = this.state.backup
  let filterTracks = tracks.filter(item => {
  if(item.nombre_producto.toLowerCase().match(text)) {
    return item
  }
})
this.setState({ producciones: filterTracks })
}
openPanel = () => {
  this.setState({ mostrarDate: true });
};
quitarFiltro=()=>{
    let tracks = this.state.backup
    this.setState({
      producciones: tracks,
      mostrarDate: false,
      
      startDate:null,
      endDate:null
      }); 
}
closePanel = () => {
 
  var start =  moment(this.state.startDate).format("DD/MM/YYYY")

  var end = moment(this.state.endDate).format("DD/MM/YYYY")
 
  //item=>new Date(item.fecha_ini_produccion).getTime() >= start &&new Date(item.fecha_fin_produccion).getTime() <= end.getTime()
    let tracks = this.state.backup
    let filter = tracks.filter(item => {
 
      if(moment(item.fecha_ini_produccion,"DD/MM/YYYY").isBetween(moment(start,"DD/MM/YYYY"),moment(end,"DD/MM/YYYY"))) {
        return item
      }
    })
    this.setState({
      producciones: filter,
      mostrarDate: false
      }); 
 
 
 
};
_renderItem = ({item}) => {
  return (
      
     <TouchableOpacity activeOpacity={0.8} key={item.id} style={styles.cardInicio} onPress={()=>this.props.navigation.navigate('PrincipalInfo', {
         produccion:item
       })}>
         <Block style={{flexDirection:'row',justifyContent:'space-between',marginBottom:16}}>
             <Text style={{letterSpacing:0.5,fontSize:12}}>{item.nombre_producto}</Text>
             <Text style={{letterSpacing:0.5,fontSize:12,color:'#27A9FF',   fontWeight: "500",}}>{item.cantidad_producir}u</Text>
             <Text style={{letterSpacing:0.5,fontSize:12}}>${item.costo_total}</Text>
         </Block>
         <Block center style={{flexDirection:'row'}} >
             <View style={{marginRight:8 ,justifyContent:'center',alignItems:'center',backgroundColor:rgba('#FF4957','0.2'),borderRadius:14,height:14,width:14}}>
                 <View style={{height:8,width:8,borderRadius:8,backgroundColor:'#FF4957'}}/>
             </View>
             <Text style={{letterSpacing:0.5,fontSize:12,color:'#BDBFC7'}}>{item.fecha_ini_produccion} - {item.fecha_fin_produccion}</Text>
         </Block>

         <Block style={{flexDirection:'row',paddingVertical:4}} center>
             <View  style={{backgroundColor:'#D8D8D8',height:4, width:4,borderRadius:4,marginLeft:4.5}} />
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
  render() {
    const isDateBlocked = (date) =>
      date.isBefore('', 'day');

    const onDatesChange = ({ startDate, endDate, focusedInput }) =>
      this.setState({ ...this.state, focus: focusedInput }, () =>
        this.setState({ ...this.state, startDate, endDate })
      );

    const onDateChange = ({ date }) =>
      this.setState({ ...this.state, date });

    return (
      <ScrollView>
        <View style={styles.container}>
        <Text style={{     fontSize:24,  padding: 20,marginBottom:5}}>Producciones</Text>
      

      <View style={{paddingLeft:15,marginHorizontal:10,height: 45,borderRadius:13, backgroundColor:'#efefef',flexDirection:'row',alignItems:'center'}}>
        <Icon
            name="search"
            color="gray"
            size={19}
            style={{opacity:0.5,marginRight:10}}
            />
        <TextInput
            placeholder='Filtrar por nombre'
            style={{paddingLeft:10,marginHorizontal:10,height: 45, color:'gray',borderRadius:13, backgroundColor:'#efefef'}}
            onChangeText={text => this.search(text)}
            />
        </View>
        <TouchableOpacity   onPress={this.openPanel} style={{marginTop:10,marginLeft:5,backgroundColor:'#F7F8FA',borderRadius:13,padding:10,width:120,height:40}}>
          <Text style={{color:'black'}}>Filtrar por fecha</Text>
        </TouchableOpacity>
        { this.state.mostrarDate==true
          ? 
          <View style={{borderColor:'#F7F8FA',borderWidth:2,borderRadius:13,padding:5,marginBottom:5,marginTop:5}}>
            <View style={{alignSelf:'flex-end',flexDirection:'row'}}>
              <TouchableOpacity   onPress={this.quitarFiltro} style={{marginRight:5,backgroundColor:'#F7F8FA',borderRadius:13,padding:10,width:90,height:40}}>
                <Text style={{color:'red'}}>Quitar filtro</Text>
              </TouchableOpacity>
              <TouchableOpacity   onPress={this.closePanel} style={{backgroundColor:'#F7F8FA',borderRadius:13,padding:10,width:90,height:40}}>
                <Text style={{color:'black'}}>Confirmar</Text>
              </TouchableOpacity>

            </View>
          
            <Dates
            onDatesChange={onDatesChange}
            isDateBlocked={isDateBlocked}
            startDate={this.state.startDate}
            endDate={this.state.endDate}
            focusedInput={this.state.focus}
            focusedMonth={ moment('05/09/2030','DD/MM/YYYY')}
            range
            />
            {this.state.date && <Text style={styles.date}>{this.state.date && this.state.date.format('LL')}</Text>}
            <View style={{flexDirection:'row',justifyContent:'space-between',width:'100%'}}>
            <Text style={[styles.date, this.state.focus === 'startDate' && styles.focused]}>{this.state.startDate && this.state.startDate.format('LL')}</Text>
            <Text style={[styles.date, this.state.focus === 'endDate' && styles.focused]}>{this.state.endDate && this.state.endDate.format('LL')}</Text>
            </View>
        </View>
          : <Text> </Text>
        }
        <FlatList
          data={this.state.producciones}
          keyExtractor={(item, index) => index.toString()}
            renderItem={this._renderItem}
          />
        </View>
         
       
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 8,
    paddingTop: StatusBar.currentHeight,
     
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
date: {
  fontWeight:'bold',   padding: 20,color:'gray'
},
focused: {
  color: 'blue'
}
});