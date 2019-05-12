import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { getContactList } from '../actions/ChatActions';
import ContatoItem from '../components/ContatoList/ContatoItem';

export class ContatoList extends Component {

  static navigationOptions = {
    title: '',
    tabBarLabel: 'Contatos',
    header: null
  }
  constructor(props){
    super(props);
    this.state = {};

    this.props.getContactList();

    this.contatoclick = this.contatoClick.bind(this);

  }

  contatoClick(){

  }

  render() {
    return(
      <View style={StyleSheet.container}>
        <FlatList
          data={this.props.contacts}
          renderItem={({item})=><ContatoItem data={item} onPress={this.contatoClick} />}          
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

const ContatoListConnect = connect(mapStateToProps, { getContactList })(ContatoList);
export default ContatoListConnect;