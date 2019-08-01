import React, { Component } from 'react'

import {createDrawerNavigator, createStackNavigator} from 'react-navigation'

import Principal from '../screens/Principal'
import PrincipalInfo from '../screens/ProduccionInfo'
import ProduccionesActivas from '../screens/ProduccionesActivas'
import MonitoreoProduccion from '../screens/MonitoreoProduccion'
import Perfil from '../screens/Perfil'
import Dashboard from '../screens/Dashboard'

export default createStackNavigator({
    Principal,
    PrincipalInfo,
    ProduccionesActivas,
    MonitoreoProduccion,
    Perfil,
    Dashboard

},{
    defaultNavigationOptions:{
        headerStyle:{
            height:60,
            borderBottomColor:'transparent',
            backgroundColor:'#F7F8FA',
            elevation: 0, // remove shadow on Android
            shadowOpacity: 0, // remove shadow on iOS
        },
        headerTitleContainerStyle:{
            alignItems:'flex-end',
            paddingLeft:25
        },
        headerRightContainerStyle:{
            alignItems:'flex-end',
            marginRight:25,
        },
        
    },
    
})