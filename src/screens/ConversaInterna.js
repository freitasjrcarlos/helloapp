import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

export class ConversaInterna extends Component {

  static navigationOptions = {
    title: 'Conversa Interna'
  }
  constructor(props){
    super(props);
    this.state = {};

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

const ConversaInternaConnect = connect(mapStateToProps, {  })(ConversaInterna);
export default ConversaInternaConnect;