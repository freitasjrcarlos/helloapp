import firebase from '../FirebaseCon';


//Pegando lista de contatos
export const getContactList = () => {
  return (dispatch) => {
    firebase.database().ref('users').once('value').then((snapshot)=>{

      let users = [];
      snapshot.forEach((childItem)=>{
        users.push({
          key:childItem.key,
          name: childItem.val().name
        });
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



/*
export const signin = (email, password)=> {
  return(dispatch) => {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((user)=> {

        let uid = firebase.auth().currentUser.uid;

        dispatch({
          type: 'changeUid',
          payload: {
            uid: uid
          }
        });

      })

      //Erros
      .catch((error)=>{
        switch(error.code){

          case 'auth/invalid-email':
            alert("Email inválido");
          break;

          case 'auth/user-disabled':
            alert("Seu usuário está desativado");
          break;

          case 'auth/user-not-found':
            alert("Usuário não encontrado");
          break;

          case 'auth/wrong-password':
            alert("Senha incorreta");
          break;
        }
      });
  }
}
*/

/*
//Action senha
export const changePassword = (password) => {
  return {
    type: 'changePassword',
    payload: {
      password: password
    }
  };

  */
};