import React, { useState } from 'react';
import Constants from 'expo-constants';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import LinearGradient from 'react-native-linear-gradient';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons'; 
import colors from './colors';

const Stack = createStackNavigator();

const AccountScreen = () => {
   return(
      <View style={styles.container}>
         <MaterialIcons name="account-circle" size={150} color="black" style={styles.avatar}/>
         <Text style={styles.title}>Misora Doan</Text>
         <TouchableOpacity>
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
      color: colors("BGREEN"),
      fontSize: 30,
      fontWeight: 'bold',
      marginBottom: 50,
   },
   avatar: {
      color: colors("GREY"),
      marginBottom: 10,
   },
   inputContainer: {
      width: '70%',
      alignItems: 'center',
   },
   inputLabel: {
      width:100,
      fontSize: 16,
      fontWeight: 'bold',
      marginTop: 10,
      color: colors("GREY"),
      alignSelf: 'flex-start',
   },
   textContainer: {
      borderBottomWidth: 0.5,
      borderColor: colors("VTGREEN"),
      color: colors("VTGREEN"),
      width: '100%',
      fontSize: 20,
      paddingVertical: 5,
   },
   loginButtonContainer: {
      backgroundColor: colors("VTGREEN"),
      borderRadius: 10,
      width: 250,
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 40,
   },
   loginButtonText: {
      color: 'white',
      fontSize: 18,
      fontWeight: '700',
   },
   logoutText: {
      fontSize: 18,
      color: 'grey',
   }
});
 