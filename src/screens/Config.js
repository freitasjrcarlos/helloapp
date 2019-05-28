import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { signOut } from '../actions/AuthActions';

export class Config extends Component {

  static navigationOptions = {
    title: '',
    tabBarLabel: 'Config',
    header: null
  }
  constructor(props){
    super(props);
    this.state = {};
    
    this.sair = this.sair.bind(this);

  }

  sair(){
    this.props.signOut();

    //Direcionando para Home
    window.globalNavigator.navigate('Home');

    /*
    this.props.navigation.dispatch(StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({routeName:'Home'})
      ]
    }));
    */

  }




  render() {
    return(
      <View style={styles.container}>
        <Text style={styles.txt}>HelloApp V.1.0</Text>
        <TouchableHighlight style={styles.btn} onPress={this.sair}>
          <Text style={styles.btnTxt}> Sair </Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#993699',
    alignItems: 'center',
    justifyContent: 'center'
  },
  txt: {
    fontSize: 20,
    color: '#ffffff',
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

const mapStateToProps = (state) => {
  return {
    status: state.auth.status,
    uid: state.auth.uid
  };
}

const ConfigConnect = connect(mapStateToProps, { signOut })(Config);
export default ConfigConnect;