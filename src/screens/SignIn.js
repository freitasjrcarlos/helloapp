import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, TextInput, Keyboard, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import LoadingItem from '../components/LoadingItem';
import { checkLogin, changeEmail, changePassword, signin } from '../actions/AuthActions';

export class SignIn extends Component {

  static navigationOptions = {
    title: 'Login'
  }
  constructor(props){
    super(props);
    this.state = {
      loading: false
    };
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

        <Text style={styles.label}>Email:</Text>
        <TextInput style={styles.input} value={this.props.email} onChangeText={this.props.changeEmail} />

        <Text style={styles.label}>Senha:</Text>
        <TextInput style={styles.input} value={this.props.password} onChangeText={this.props.changePassword} secureTextEntry={true} />


        <TouchableHighlight style={styles.btn} onPress={()=> {
          this.setState({loading:true});
          this.props.signin(this.props.email, this.props.password, ()=> {
            this.setState({loading:false});
          });
        }} >
          <Text style={styles.btnTxt}> Entrar </Text>
        </TouchableHighlight>


        <LoadingItem visible={this.state.loading} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#993699',
  },
  label: {
    margin: 10,
    color: '#ffffff',
  },
  input: {
    width: '80%',
    height: 40,
    backgroundColor: '#ffffff',
    borderRadius: 2,
  },
  btn: {
    width: 100,
    height: 40,
    backgroundColor: '#ffffff',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
    marginTop: 30,
  },
  btnTxt: {
    color: '#993399',
    fontSize: 15,
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