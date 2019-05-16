import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class MensagemItem extends Component {

  constructor(props){
    super(props);

    //Background e align
    let bgColor = '#eeeeee';
    let align = 'flex-start';

    if(this.props.data.uid == this.props.me){
      bgColor = '#9999ff',
      align = 'flex-end'
    }

    this.state = {
      bgColor: bgColor,
      align:align
    };
  }
  render(){
   return(
     <View style={[MensagemItemStyles.area, {alignSelf:this.state.align,backgroundColor:this.state.bgColor}]}>
      <Text>{this.props.data.m}</Text>
     </View>
   );
  }
}

//Estilos
const MensagemItemStyles = StyleSheet.create({
  area: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 5,
    marginBottom: 5,
    padding: 10,
    maxWidth: '80%',
    borderRadius: 5,
  }
});