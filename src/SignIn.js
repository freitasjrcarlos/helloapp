import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { checkLogin, changeEmail, changePassword, signin } from './actions/AuthActions';

export class SignIn extends Component {

  static navigationOptions = {
    title: 'Login'
  }
  constructor(props){
    super(props);
    this.state = {};
  }

  //Direcionar para screen Conversas
  componentDidUpdate() {
    if(this.props.status == 1){
      this.props.navigation.navigate('Conversas');
    }
  }

  render() {
    return(
      <View style={styles.container}>

        <Text style={styles.label}>Email:</Text>
        <TextInput style={styles.input} value={this.props.email} onChangeText={this.props.changeEmail} />

        <Text style={styles.label}>Senha:</Text>
        <TextInput style={styles.input} value={this.props.password} onChangeText={this.props.changePassword} secureTextEntry={true} />

        <Button title="Entrar" onPress={()=> {
          this.props.signin(this.props.email, this.props.password);
        }} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    margin: 10,
  },
  input: {
    width: '80%',
    height: 40,
    backgroundColor: '#dddddd',
  }
});

//Puxando do AuthReducer
const mapStateToProps = (state) => {
  return {
    uid: state.auth.uid,
    email: state.auth.email,
    password: state.auth.password,
    status: state.auth.status
  };
}

const SignInConnect = connect(mapStateToProps, { checkLogin, changeEmail, changePassword, signin})(SignIn);
export default SignInConnect;