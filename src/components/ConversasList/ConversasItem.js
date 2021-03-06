import React, { Component } from 'react';
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native';

export default class ConversasItem extends Component {

  constructor(props){
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  onClick(){
    this.props.onPress(this.props.data);
  }

  render(){
   return(
     <TouchableHighlight underlayColor="#dddddd" style={ConversasItemStyles.buttonArea} onPress={this.onClick}>
      <Text style={ConversasItemStyles.txtTitle}>{this.props.data.title}</Text>
     </TouchableHighlight>
   );
  }
}

//Estilos
const ConversasItemStyles = StyleSheet.create({
  buttonArea:{
    height:40,
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ffffff'
  },
  txtTitle: {
    color: '#ffffff',
  }
});