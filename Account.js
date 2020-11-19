import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { useGlobalState} from './helpers/global.js';
import GradientBackground from './helpers/GradientBackground';
import { colors } from './helpers/config';
import { MaterialIcons } from '@expo/vector-icons'; 

const Stack = createStackNavigator();

const AccountScreen = () => {
   const [state, dispatch] = useGlobalState();
   
   return(
      <View style={styles.container}>
         <GradientBackground/>
         <MaterialIcons name="account-circle" size={150} color="black" style={styles.avatar}/>
         <Text style={styles.title}>{state.user}</Text>
         <TouchableOpacity onPress={() => dispatch({ user: "" })}>
            <Text style={styles.logoutText}>Logout</Text>
         </TouchableOpacity>
      </View>
   )
}

export default function Account(){
   return(
      <Stack.Navigator
         initialRouteName="LoginScreen"
         headerMode="screen"
         screenOptions={{
            headerStyle: {
               backgroundColor: colors.VTGREEN
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
 