import firebase from '../FirebaseCon';


//Listando os chats
export const getChatList = (userUid, callback) => {
  return (dispatch) => {
    firebase.database().ref('users').child(userUid).child('chats').on('value', (snapshot)=> {
      let chats = [];

      snapshot.forEach((childItem)=> {
        chats.push({
          key: childItem.key,
          title: childItem.val().title
        });
      });

      //Callback
      callback();

      dispatch({
        type: 'setChatList',
        payload: {
          chats: chats
        }
      });

    });
  }
}

//Pegando lista de contatos
export const getContactList = ( userUid, callback ) => {
  return (dispatch) => {
    firebase.database().ref('users').orderByChild('name').once('value').then((snapshot)=>{
      
      let users = [];
      snapshot.forEach((childItem)=>{

        if(childItem.key != userUid){
          users.push({
            key:childItem.key,
            name: childItem.val().name
          });
       }

      });

      //Callback
      callback();

      dispatch({
        type: 'setContactList',
        payload:{
          users:users
        }
      });

    });
  };
};

//Criando o chat
export const createChat = (userUid1, userUid2) => {
  return(dispatch) => {

    //Criando
    let newChat = firebase.database().ref('chats').push();
    newChat.child('members').child(userUid1).set({
      id: userUid1
    });
    newChat.child('members').child(userUid2).set({
      id: userUid2
    });

    //Associando
    let chatId = newChat.key;

    //Pegando nome do segundo usuário
    firebase.database().ref('users').child(userUid2).once('value').then((snapshot)=>{

      //Associando
      firebase.database().ref('users').child(userUid1).child('chats')
      .child(chatId).set({
        id:chatId,
        title:snapshot.val().name
      });

    });

    //Pegando nome do primeiro usuário
    firebase.database().ref('users').child(userUid1).once('value').then((snapshot)=>{

      //Associando
      firebase.database().ref('users').child(userUid2).child('chats')
      .child(chatId).set({
        id:chatId,
        title:snapshot.val().name
      }).then(()=>{
           dispatch({
             type:'setActiveChat',
             payload:{
             chatId:chatId
          }
        });
      });
      
    });
  }
};

//Ativando chat
export const setActiveChat = (chatId) => {
  return {
    type: 'setActiveChat',
    payload: {
      chatId: chatId
    }
  };
}

// Enviando mensagem
export const sendMessage = (msgType, msgContent, author, activeChat) => {
  return (dispatch)=> {

    let currentDate = '';
    let cDate = new Date();

    //Criando data
    currentDate = cDate.getFullYear()+'-'+(cDate.getMonth()+1)+'-'+cDate.getDate();    
    currentDate += ' ';
    currentDate += cDate.getHours()+':'+cDate.getMinutes()+':'+cDate.getSeconds();

    //Criando variável com o push
    let msgId = firebase.database().ref('chats').child(activeChat).child('messages').push();

    switch(msgType){
      case 'text':
          msgId.set({
            msgType: 'text',
            date: currentDate,
            m: msgContent,
            uid: author
          });
      break;

      case 'image':
          msgId.set({
            msgType: 'image',
            date: currentDate,
            imgSource: msgContent,
            uid: author
          });
      break;
    }
  };
};

//Monitor Chat
export const monitorChat = (activeChat)=> {
  return (dispatch) => {

    firebase.database().ref('chats').child(activeChat).child('messages').orderByChild('date').on('value', (snapshot)=>{
      let arrayMsg = [];

      snapshot.forEach((childItem)=>{

        switch(childItem.val().msgType){
          case 'text':
              arrayMsg.push({
                key: childItem.key,
                date: childItem.val().date,
                msgType: 'text',
                m: childItem.val().m,
                uid: childItem.val().uid
              });
          break;

          case 'image':
              arrayMsg.push({
                key: childItem.key,
                date: childItem.val().date,
                msgType: 'image',
                imgSource: childItem.val().imgSource,
                uid: childItem.val().uid
              });
          break;
        }

       
      });

      dispatch({
        type: 'setActiveChatMessage',
        payload: {
          "msgs": arrayMsg
        }
      });

    });

  };
};

export const monitorChatOff = (activeChat)=> {
  return (dispatch) => {

    firebase.database().ref('chats').child(activeChat).child('messages').off();

  };
};

