import React, { Component } from 'react'
import { Text, StyleSheet } from 'react-native'

export default class Typography extends Component {
    
    render() {
        const {center,color,size,style,children,...props} = this.props;
        const textStyles = [
            styles.text,
            color && {color},
            size && {size},
            center && styles.center,
            style,
            
        ]
        return (
            <Text style={textStyles} {...props}>
                {children}
            </Text>
        )
    }
}

const styles = StyleSheet.create({
    text:{
        fontSize:14
    },
    center:{
        alignItems:'center'
    } 

})
