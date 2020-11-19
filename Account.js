import React, { useState } from 'react';
import Constants from 'expo-constants';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { useGlobalState} from './global.js';
import { MaterialIcons } from '@expo/vector-icons'; 
import colors from './colors';
import { LinearGradient } from 'expo-linear-gradient';

const Stack = createStackNavigator();

const AccountScreen = () => {
   const [state, dispatch] = useGlobalState();
   
   return(
      <View style={styles.container}>
         <LinearGradient
          // Background Linear Gradient
          colors={["#19adb1", "#0a6dc3"]}
          style={[{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            
          },StyleSheet.absoluteFill]}
          // start={[0, 0]} end={[1, 0]}
         />
         <MaterialIcons name="account-circle" size={150} color="black" style={styles.avatar}/>
         <Text style={styles.title}>{state.user}</Text>
         <TouchableOpacity onPress={() => dispatch({ user: "" })}>
            <Text style={styles.logoutText}>Logout</Text>
         </TouchableOpacity>
      </View>
   )
}

export default function Account({route}){
   return(
      <Stack.Navigator
         initialRouteName="LoginScreen"
         headerMode="screen"
         screenOptions={{
            // headerBackground: () => (
            //    <LinearGradient
            //       colors={['#21C99F','#298299']}
            //    />
            // ),
            headerStyle: {
               backgroundColor: colors("VTGREEN")
            },
            headerTintColor: 'white',
            headerTitleAlign: 'center'
         }}
      >
         <Stack.Screen name="Account" component={AccountScreen}/>
      </Stack.Navigator>
   )
} 

const styles = StyleSheet.create({
   container: {
     flex: 1,
     backgroundColor: '#fff',
     alignItems: 'center',
     justifyContent: 'center',
   },
   row: {
      flexDirection: 'row',
   },
   title: {
      color: 'white',
      fontSize: 30,
      fontWeight: 'bold',
      marginBottom: 50,
   },
   avatar: {
      color: 'white',
      marginBottom: 10,
   },
   logoutText: {
      fontSize: 18,
      color: 'white',
      opacity: 0.8
   }
});
 