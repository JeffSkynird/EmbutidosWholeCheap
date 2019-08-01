import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'

export default class Block extends Component {
    
    render() {
        const {flex,center,middle,style,children,...props} = this.props;
        const blockStyle = [
            styles.block,
            flex && {flex},
            center && styles.center,
            middle && styles.middle,
            style
        ]
        return (
            <View style={blockStyle} {...props}>
                {children}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    block:{
        flex:1
    },
    center:{
        alignItems:'center'
    },
    middle:{
        justifyContent:'center'
    }

})
