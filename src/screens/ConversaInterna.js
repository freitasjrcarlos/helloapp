import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableHighlight, Image, BackHandler, FlatList, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { connect } from 'react-redux';
import { setActiveChat, sendMessage, monitorChat, monitorChatOff } from '../actions/ChatActions';
import MensagemItem from '../components/ConversaInterna/MensagemItem';

export class ConversaInterna extends Component {

  static navigationOptions = ({navigation})=> ({
    title:navigation.state.params.title,
    tabBarVisible: false,
    headerLeft:(

      <TouchableHighlight onPress={()=> {navigation.state.params.voltarFunction()}} underlayColor={false}>

        <Image source={require('../../node_modules/react-navigation-stack/src/views/assets/back-icon.png')} style={{width: 25, height:25, marginLeft: 20}}/>

      </TouchableHighlight>
    )
  })

  constructor(props){
    super(props);
    this.state = {
      inputText: ''
    };

    this.voltar = this.voltar.bind(this);
    this.sendMsg = this.sendMsg.bind(this);
  }

  componentDidMount(){
    //Voltando via screen
    this.props.navigation.setParams({voltarFunction:this.voltar});

    //Voltando via Hardware
    BackHandler.addEventListener('hardwareBackPress', this.voltar);

    //Carregando conversa
    this.props.monitorChat(this.props.activeChat);
  }

  //Saindo da tela
  componentWillUnmount(){
    BackHandler.removeEventListener('hardwareBackPress', this.voltar);

  }

  voltar() {
    //Saindo do Chat
    this.props.monitorChatOff(this.props.activeChat);

    //Setando String vazia
    this.props.setActiveChat('');

    //Voltando
    this.props.navigation.goBack();

    //Necessário de retorno para o componentWillUnmount
    return true;
  }

  sendMsg(){
    let txt = this.state.inputText;

    //Limpando state
    let state = this.state;
    state.inputText = '';
    this.setState(state);

    this.props.sendMessage(txt, this.props.uid, this.props.activeChat);
  }

  render() {
    //Variáveis para o KeyboardAvoidingView
    let areaBehavior = Platform.select({ios:'padding', android:null});
    let areaOffset = Platform.select({ios:64, android:null});

    return(
      <KeyboardAvoidingView style={styles.container} behavior={areaBehavior} keyboardVerticalOffset={areaOffset}>

        <FlatList 

          ref={(ref)=>{
            this.chatArea = ref
          }}
          onContentSizeChange={()=>{
            this.chatArea.scrollToEnd({animated:true})
          }}
          onLayout={()=>{
            this.chatArea.scrollToEnd({animated:true})
          }}

          style={styles.chatArea}
          data={this.props.activeChatMessages}
          renderItem={({item})=><MensagemItem data={item} me={this.props.uid} />}
        />

        <View style={styles.sendArea}>
          <TextInput style={styles.sendInput} value={this.state.inputText} onChangeText={(inputText)=>{
            this.setState({inputText})
          }} />
          <TouchableHighlight style={styles.sendButton} onPress={this.sendMsg}>
            <Image style={styles.sendImage} source={require('../assets/images/send-button.png')} />
          </TouchableHighlight>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  chatArea: {
    flex: 1,
    backgroundColor: "#cccccc"
  },
  sendArea: {
    height: 50,
    backgroundColor: "#eeeeee",
    flexDirection: 'row',
  },
  sendInput: {
    height: 50,
    flex: 1,
  },
  sendButton: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendImage: {
    width: 40,
    height: 40,
  }
});

const mapStateToProps = (state) => {
  return {
    status: state.auth.status,
    uid: state.auth.uid,
    activeChat: state.chat.activeChat,
    activeChatMessages: state.chat.activeChatMessages
  };
}

const ConversaInternaConnect = connect(mapStateToProps, { setActiveChat, sendMessage, monitorChat, monitorChatOff })(ConversaInterna);
export default ConversaInternaConnect;