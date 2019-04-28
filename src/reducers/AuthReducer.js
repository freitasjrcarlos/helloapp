const initialState = {
  name: '',
  email:'',
  password:'',
  uid: '',
  status: 0
};

const AuthReducer = (state = initialState, action) => {

  if(action.type == 'changeStatus'){
    return {...state, status:action.payload.status};
  }

   //Action name
   if(action.type == 'changeName'){
    return {...state, name:action.payload.name};
  }

  //Action alterar email
  if(action.type == 'changeEmail'){
    return {...state, email:action.payload.email};
  }

  //Action senha
  if(action.type == 'changePassword'){
    return {...state, password:action.payload.password};
  }

  //Action Uid
  if(action.type == 'changeUid'){
    return {...state, uid:action.payload.uid};
  }

  return state;
};

export default AuthReducer;