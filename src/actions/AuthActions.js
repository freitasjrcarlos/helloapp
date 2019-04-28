import firebase from '../FirebaseCon';

export const checkLogin = ()=>{
  return (dispatch)=> {
    let user = firebase.auth().currentUser;

    if(user){
      dispatch({
        type: 'changeStatus',
        payload: {
          status: 1
        }
      });
    }else {
      dispatch({
        type: 'changeStatus',
        payload: {
          status: 2
        }
      });
    }
  }
};

//Cadastrar
export const signup = (name, email, password) => {
  return (dispatch) => {
      firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((user)=> {

          let uid = firebase.auth().currentUser.uid;

          firebase.database().ref('users').child(uid).set({
            name: name
          });

          dispatch({
            type: 'changeUid',
            payload: {
              uid: uid
            }
          });

        })

        .catch((error)=>{
          switch(error.code){
            case 'auth/email-already-in-use':
            alert("Email já cadastrado");
            break;

            case 'auth/invalid-email':
            alert("Email inválido");
            break;

            case 'auth/operation-not-allowed':
            alert("Tente novamente mais tarde");
            break;

            case 'auth/weak-password':
            alert("Senha muito fraca, favor inserir caracteres especiais");
            break;
          }
        });
  };
};


//Logar
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


//Action name
export const changeName = (name) => {
  return {
    type: 'changeName',
    payload: {
      name: name
    }
  };
};


//Action alterar email
export const changeEmail = (email) => {
  return {
    type: 'changeEmail',
    payload: {
      email: email
    }
  };
};

//Action senha
export const changePassword = (password) => {
  return {
    type: 'changePassword',
    payload: {
      password: password
    }
  };
};