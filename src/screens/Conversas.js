import React, { Component } from 'react';
import { createBottomTabNavigator, createAppContainer} from 'react-navigation';
//import { connect } from 'react-redux';

import ConversasStack from './ConversasStack';
import ContatoList from './ContatoList';
import Config from './Config';


const ConversasNavigator = createBottomTabNavigator({
  ConversasStack:{
    screen:ConversasStack,
    navigationOptions:{
      tabBarLabel:"Conversas",
      header:null,
    },
  },
  ContatoList:{
    screen:ContatoList,
    navigationOptions:{
      tabBarLabel:"Contatos",
    }
  },
  Config:{
    screen:Config,
    navigationOptions:{
      tabBarLabel:"Configurações",
    }
  },
},
{
  defaultNavigationOptions:{
    animationsEnabled:false,
    swipeEnabled:false,
  },
  tabBarOptions:{
    activeTintColor: '#993699',
    labelStyle: {
      fontSize: 12,
      padding: 10
    }
  }
  
});


//Ocultar tabbar
ConversasStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;

  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }
  return {
    tabBarVisible,
  };
};


const AppContainer = createAppContainer(ConversasNavigator);

export default AppContainer;
