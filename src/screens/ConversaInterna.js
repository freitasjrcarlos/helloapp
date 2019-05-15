import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableHighlight, Image, BackHandler } from 'react-native';
import { connect } from 'react-redux';
import { setActiveChat } from '../actions/ChatActions';

export class ConversaInterna extends Component {

  static navigationOptions = ({navigation})=> ({
    title:navigation.state.params.title,
    headerLeft:(

      <TouchableHighlight onPress={()=> {navigation.state.params.voltarFunction()}} underlayColor={false}>

        <Image source={require('../../node_modules/react-navigation-stack/src/views/assets/back-icon.png')} style={{width: 25, height:25, marginLeft: 20}}/>

      </TouchableHighlight>
    )
  })

  constructor(props){
    super(props);
    this.state = {};

    this.voltar = this.voltar.bind(this);
  }

  componentDidMount(){
    //Voltando via screen
    this.props.navigation.setParams({voltarFunction:this.voltar});

    //Voltando via Hardware
    BackHandler.addEventListener('hardwareBackPress', this.voltar);
  }

  //Saindo da tela
  componentWillUnmount(){
    BackHandler.removeEventListener('hardwareBackPress', this.voltar);
  }

  voltar() {
    //Setando String vazia
    this.props.setActiveChat('');

    //Voltando
    this.props.navigation.goBack();

    //Necessário de retorno para o componentWillUnmount
    return true;
  }

  render() {
    return(
      <View style={StyleSheet.container}>
        <Text>Página Conversa interna{this.props.status} - {this.props.uid}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10
  }
});

const mapStateToProps = (state) => {
  return {
    status: state.auth.status,
    uid: state.auth.uid
  };
}

const ConversaInternaConnect = connect(mapStateToProps, { setActiveChat })(ConversaInterna);
export default ConversaInternaConnect;