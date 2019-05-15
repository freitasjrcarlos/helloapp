import firebase from '../FirebaseCon';


//Listando os chats
export const getChatList = (userUid) => {
  return (dispatch) => {
    firebase.database().ref('users').child(userUid).child('chats').on('value', (snapshot)=> {
      let chats = [];

      snapshot.forEach((childItem)=> {
        chats.push({
          key: childItem.key,
          title: childItem.val().title
        });
      });

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
export const getContactList = ( userUid ) => {
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
      });
      
    });   
   

    dispatch({
      type:'setActiveChat',
      payload:{
        chatId:chatId
      }
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

