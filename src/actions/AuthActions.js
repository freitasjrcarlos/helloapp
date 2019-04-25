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