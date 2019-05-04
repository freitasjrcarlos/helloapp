import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { connect } from 'react-redux';

export class ContatoList extends Component {

  static navigationOptions = {
    title: '',
    tabBarLabel: 'Contatos',
    header: null
  }
  constructor(props){
    super(props);
    this.state = {};

  }

  render() {
    return(
      <View style={StyleSheet.container}>
        <FlatList
          data={this.props.contacts}
          renderItem={()=> {
            return <Text>...</Text>
          }}
        />
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
    uid: state.auth.uid,
    contacts: state.chat.contacts
  };
}

const ContatoListConnect = connect(mapStateToProps, {  })(ContatoList);
export default ContatoListConnect;