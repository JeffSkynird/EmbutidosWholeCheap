import React, { Component } from 'react'

import {createBottomTabNavigator} from 'react-navigation'

import PrincipalNavigator from './PrincipalNavigator'
import Producciones from '../screens/Produciones'
import Icon from 'react-native-vector-icons/FontAwesome';

export default createBottomTabNavigator({
    PrincipalNavigator:{
        screen:PrincipalNavigator,
        navigationOptions: {
            tabBarLabel:"Inicio",
            tabBarIcon: ({ tintColor }) => (
              <Icon name="home" color='gray' size={20}/>
            )
        }
    },
    Producciones:{
        screen:Producciones,
        navigationOptions: {
            tabBarLabel:"Producciones",
            tabBarIcon: ({ tintColor }) => (
               
              <Icon name="archive" color='gray' size={20}/>
            )
        }
    }
},{
    
    header:null,
})