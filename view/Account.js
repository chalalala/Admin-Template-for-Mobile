import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { useGlobalState} from '../helpers/global.js';
import GradientBackground from '../helpers/GradientBackground';
import { colors } from '../helpers/config';
import { MaterialIcons } from '@expo/vector-icons'; 
import axios from 'axios';

const Stack = createStackNavigator();

export const LoginScreen = () => {
   const [state, dispatch] = useGlobalState();
   const [userList, setList] = useState([]);
   const [email, setEmail] = useState("");
   const [pwd, setPwd] = useState("");
   const [message, setMsg] = useState("");
 
   const fetchUserAccount = () => {
     axios.get('http://192.168.1.3:5000/getUserAccount')
     .then(response => {
         console.log(response.data);
         setList(response.data);
     })
     .catch(function (error) {
         console.log(error);
     })
   }
 
   useEffect(() => {
     fetchUserAccount();
   },[]);
 
   const login = () => {
     let _acc = userList.find(item => item.email === email);
     if (_acc){
       if (_acc.password === pwd){
         dispatch({ user: _acc.name });
         setMsg("");
       }
       else{
         setMsg("Password does not correct.")
       }
     }
     else{
       setMsg("User ID does not exist.");
     }
   };
 
   return(
      <View style={styles.container}>
         <GradientBackground/>
         <View style={styles.inputContainer}>
           <Text style={styles.inputLabel}>Email</Text>
           <TextInput
             selectionColor={colors.VTBLUE}
             style={styles.textContainer}
             onChangeText={text => setEmail(text)}
           />
 
           <Text style={styles.inputLabel}>Password</Text>
           <TextInput
             style={styles.textContainer}
             secureTextEntry={true}
             textContentType="password"
             onChangeText={text => setPwd(text)}
           />
         
           <TouchableOpacity style={styles.loginButtonContainer}
             onPress={login}
           >
             <Text style={styles.loginButtonText}>Sign In</Text>
           </TouchableOpacity>
 
           <Text style={styles.message}>{message}</Text>
         </View>
      </View>
   )
}

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
   inputContainer: {
      width: '70%',
      alignItems: 'center',
   },
   inputLabel: {
      width:100,
      fontSize: 16,
      fontWeight: 'bold',
      marginTop: 10,
      color: 'white',
      opacity: 0.8,
      alignSelf: 'flex-start',
   },
   textContainer: {
      borderBottomWidth: 0.5,
      borderColor: 'white',
      backgroundColor: 'transparent',
      color: 'white',
      width: '100%',
      fontSize: 20,
      paddingVertical: 5,
   },
   loginButtonContainer: {
      backgroundColor: 'white',
      borderRadius: 5,
      width: 250,
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 40,
   },
   loginButtonText: {
      color: colors.VTBLUE,
      fontSize: 18,
      fontWeight: '700',
   },
   message: {
     color: 'red',
     marginTop: 10,
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
   },
});
 