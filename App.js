import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { GlobalStateProvider, useGlobalState} from './helpers/global.js';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import GradientBackground from './helpers/GradientBackground';
import { colors } from './helpers/config';

import Dashboard from './view/Dashboard';
import Analytics from './view/Analytics';
import Account, { LoginScreen } from './view/Account';

const Tab = createBottomTabNavigator();

const routeIcons = {
  Dashboard: "view-dashboard",
  Analytics: "google-analytics",
  Account: "account"
};

const InAppScreen = () => {
  return(
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Account"
        screenOptions={({route}) => ({
          tabBarIcon: ({focused}) => 
          (<MaterialCommunityIcons
              name={routeIcons[route.name]}
              size={24}
              color={focused ? "#3aa2bd" : "grey"}
          />)
        })}

        tabBarOptions={{
          activeTintColor: colors.BGREEN,
          inactiveTintColor: "grey"
        }}
      >
        <Tab.Screen name="Dashboard" component={Dashboard}/>
        <Tab.Screen name="Analytics" component={Analytics}/>
        <Tab.Screen name="Account" component={Account}/>
      </Tab.Navigator>
    </NavigationContainer>
  )
}

const MainScreen = () => {
  const [state, dispatch] = useGlobalState();
  
  return(
    state.user ? <InAppScreen/> : <LoginScreen/>
  )
};

export default function App() {
  return (
    <GlobalStateProvider>
      <MainScreen/>
    </GlobalStateProvider>  
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

