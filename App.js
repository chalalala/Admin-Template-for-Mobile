import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

import Dashboard from './Dashboard';
import Analytics from './Analytics';
import Account from './Account';

const Tab = createBottomTabNavigator();

const routeIcons = {
  Dashboard: "view-dashboard",
  Analytics: "google-analytics",
  Account: "account"
};

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused}) => 
          (<MaterialCommunityIcons
              name={routeIcons[route.name]}
              size={24}
              color={focused ? "#3aa2bd" : "grey"}
          />)
        })}
  
        tabBarOptions={{
          activeTintColor: "#3aa2bd",
          inactiveTintColor: "grey"
        }}
      >
        <Tab.Screen name="Dashboard" component={Dashboard}/>
        <Tab.Screen name="Analytics" component={Analytics}/>
        <Tab.Screen name="Account" component={Account}/>
      </Tab.Navigator>
    </NavigationContainer>
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
