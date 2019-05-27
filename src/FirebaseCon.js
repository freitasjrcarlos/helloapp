import firebase from 'firebase';

let config = {
  apiKey: "AIzaSyCjKbBal9FXWwkrWcNcVH69JTaMUAPjFbs",
  authDomain: "helloapp-1bfa6.firebaseapp.com",
  databaseURL: "https://helloapp-1bfa6.firebaseio.com",
  projectId: "helloapp-1bfa6",
  storageBucket: "helloapp-1bfa6.appspot.com",
  messagingSenderId: "708332835364"
};
firebase.initializeApp(config);

export default firebase;