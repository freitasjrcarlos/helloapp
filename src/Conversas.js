import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { checkLogin } from './actions/AuthActions';

export class Conversas extends Component {

  static navigationOptions = {
    title: '',
    header: null
  }
  constructor(props){
    super(props);
    this.state = {};

  }

  render() {
    return(
      <View style={StyleSheet.container}>
        <Text>Página Conversas{this.props.status}</Text>
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
    status: state.auth.status
  };
}

const ConversasConnect = connect(mapStateToProps, { checkLogin })(Conversas);
export default ConversasConnect;