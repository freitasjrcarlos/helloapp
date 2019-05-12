import React, {Component} from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';

import Reducers from './src/Reducers';

import Preload from './src/screens/Preload';
import Home from './src/screens/Home';
import Conversas from './src/screens/Conversas';
import SignUp from './src/screens/SignUp';
import SignIn from './src/screens/SignIn';

let store = createStore(Reducers, applyMiddleware(ReduxThunk));

const Navegador = createStackNavigator({
  Preload: {
    screen: Preload,
    navigationOption: { header: null }
  },
  Home: {
    screen: Home,
    navigationOption: { header: null }
  },
  Conversas: {
    screen: Conversas,
    navigationOption: { header: null }
  },
  SignUp: {
    screen: SignUp,
    navigationOption: { header: null }
  },
  SignIn: {
    screen: SignIn,
    navigationOption: { header: null }
  }
});

const AppContainer = createAppContainer(Navegador);

export default class App extends Component {
  render(){
    return(
      <Provider store={store} >
        <AppContainer />
      </Provider>
    );
  }
}


//Remover para habilitar warnings
console.disableYellowBox = true;