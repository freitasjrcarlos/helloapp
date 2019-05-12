import React, { Component } from 'react';
import { createBottomTabNavigator, createAppContainer} from 'react-navigation';
//import { connect } from 'react-redux';

import ConversasList from './ConversasList';
import ContatoList from './ContatoList';
import Config from './Config';


const ConversasNavigator = createBottomTabNavigator({
  ConversasList: {
    screen: ConversasList,
    navigationOption: { header: null }
  },
  ContatoList: {
    screen: ContatoList,
    navigationOption: { header: null }
  },
  Config: {
    screen: Config,
    navigationOption: { header: null }
  },
});


const AppContainer = createAppContainer(ConversasNavigator);

export default AppContainer;