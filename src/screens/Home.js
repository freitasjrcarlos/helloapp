import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import { checkLogin } from '../actions/AuthActions';

export class Home extends Component {

  static navigationOptions = {
    title: '',
    header: null
  }
  constructor(props){
    super(props);
    this.state = {};

    this.signinButton = this.signinButton.bind(this);
    this.signupButton = this.signupButton.bind(this);
  }

  signinButton(){
    this.props.navigation.navigate('SignIn');
  }

  signupButton() {
    this.props.navigation.navigate('SignUp');
  }

  render() {
    return(
      <View style={styles.container}>
        <Text style={styles.h1}>HelloApp</Text>
        <View style={styles.buttonArea}> 
          <TouchableHighlight style={styles.btn} onPress={this.signinButton}>
            <Text style={styles.btnTxt}> Entrar </Text>
          </TouchableHighlight>

          <TouchableHighlight style={styles.btn} onPress={this.signupButton}>
            <Text style={styles.btnTxt}> Cadastrar </Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#993399',
  },
  h1: {
    fontSize: 30,
    marginBottom: 50,
    color: '#ffffff'
  },
  buttonArea: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
  },
  btn: {
    width: 100,
    height: 40,
    backgroundColor: '#ffffff',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
  },
  btnTxt: {
    color: '#993399',
    fontSize: 15,
  }
});

const mapStateToProps = (state) => {
  return {
    status: state.auth.status
  };
}

const HomeConnect = connect(mapStateToProps, { checkLogin })(Home);
export default HomeConnect;