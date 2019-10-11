import * as React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';


import Headlines from './Headlines';
import Details from './Details';
import Source from './Source';

const stack = createStackNavigator(
  {
    headlines: {
      screen: Headlines,
    },
   
    details: {
      screen: Details,
    },
    source: {
      screen: Source,
    },
  },
  {
    initialRouteName: 'headlines',
  }
);

export default createAppContainer(stack);
