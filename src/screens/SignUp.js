import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, TextInput, Keyboard } from 'react-native';
import { connect } from 'react-redux';
import { checkLogin, changeName, changeEmail, changePassword, signup } from '../actions/AuthActions';

export class SignUp extends Component {

  static navigationOptions = {
    title: 'Cadastrar'
  }
  constructor(props){
    super(props);
    this.state = {};
  }

 //Direcionar para screen Conversas
 componentDidUpdate() {
  if(this.props.status == 1){
    Keyboard.dismiss();
    this.props.navigation.navigate('Conversas');
  }
}

  render() {
    return(
      <View style={styles.container}>

        <Text style={styles.label}>Nome</Text>
        <TextInput style={styles.input} value={this.props.name} onChangeText={this.props.changeName} />

        <Text style={styles.label}>Email:</Text>
        <TextInput style={styles.input} value={this.props.email} onChangeText={this.props.changeEmail} />

        <Text style={styles.label}>Senha:</Text>
        <TextInput style={styles.input} value={this.props.password} onChangeText={this.props.changePassword} secureTextEntry={true} />

        <Button title="Cadastrar" onPress={()=> {
          this.props.signup(this.props.name, this.props.email, this.props.password);
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
    name: state.auth.name,
    email: state.auth.email,
    password: state.auth.password,
    status: state.auth.status
  };
}

const SignUpConnect = connect(mapStateToProps, { checkLogin, changeName, changeEmail, changePassword, signup })(SignUp);
export default SignUpConnect;