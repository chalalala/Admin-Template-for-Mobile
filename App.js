import { StatusBar } from 'expo-status-bar';
import React from 'react';
import Constants from 'expo-constants';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import { MaterialCommunityIcons } from '@expo/vector-icons'; 

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const Dashboard = ({route}) => {
  return(
    <View style={styles.container}>
      <Text>{route.name}</Text>
    </View>
  )
}

const Analytics = ({route}) => {
  return(
    <View style={styles.container}>
      <Text>{route.name}</Text>
    </View>
  )
}

const Account = ({route}) => {
  return(
    <View style={styles.container}>
      <Text>{route.name}</Text>
    </View>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused}) => {
            if (route.name === "Dashboard"){
              return <MaterialCommunityIcons name={"view-dashboard"} size={24} color={focused ? "blue" : "grey"} />;
            }
            else if (route.name === "Analytics"){
              return <MaterialCommunityIcons name="google-analytics" size={24} color={focused ? "blue" : "grey"} />;
            }
            else if (route.name === "Account"){
              return <MaterialCommunityIcons name="account" size={24} color={focused ? "blue" : "grey"} />;
            }
          }
        })}
  
        tabBarOptions={{
          activeTintColor: "blue",
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
