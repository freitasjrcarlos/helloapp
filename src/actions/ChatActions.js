import firebase from '../FirebaseCon';


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

