import React, {Component} from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from './components/HomeScreen/HomeScreen';
import PostScreen from './components/PostScreen/PostScreen';


const RootStack = createStackNavigator(
    {
        Home: HomeScreen,
        Post: PostScreen,
    },
    {
        initialRouteName: 'Home',
    }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends Component {
    render() {
        return <AppContainer />;
    }
}