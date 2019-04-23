import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { checkLogin } from './actions/AuthActions';

export class Preload extends Component {

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
        <Tex>Carregando</Tex>
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

  };
}

const PreloadConnect = connect(mapStateToPros, { checkLogin })(Preload);
export default PreloadConnect;