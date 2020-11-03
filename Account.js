import React, { useState } from 'react';
import Constants from 'expo-constants';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import LinearGradient from 'react-native-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { TouchableOpacity } from 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons'; 
 
const Stack = createStackNavigator();

const hidePwd = () => {
   this.value 
}

const AccountScreen = ({navigator}) => {
   const [uid,setUID] = useState("");
   const [pwd,setPwd] = useState("");
   const [secure,setSecure] = useState(true);

   return(
      <View style={styles.container}>
         {/* <MaterialIcons name="account-circle" size={150} color="black" style={styles.avatar}/> */}
         {/* <Text style={styles.title}>Sign In</Text> */}
         <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>User ID</Text>
            <TextInput style={styles.textContainer}
            />

            <Text style={styles.inputLabel}>Password</Text>
            
            <TextInput
               style={styles.textContainer}
               secureTextEntry={true}
               textContentType="password">
            </TextInput>
            {/* <MaterialCommunityIcons name={secure ? "eye-off" : "eye"} size={24} color="black" /> */}
         
            <TouchableOpacity style={styles.loginButtonContainer}>
               <Text style={styles.loginButtonText}>Sign In</Text>
            </TouchableOpacity>
         </View>
      </View>
   )
}

export default function Account({route}){
   return(
      <Stack.Navigator
         initialRouteName="Account"
         headerMode="screen"
         screenOptions={{
            // headerBackground: () => (
            //    <LinearGradient
            //       colors={['#21C99F','#298299']}
            //    />
            // ),
            headerStyle: {
               backgroundColor: '#298299'
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
      color: '#3aa2bd',
      fontSize: 30,
      fontWeight: 'bold',
      marginBottom: 50,
   },
   avatar: {
      color: '#bbbfca',
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
      color: '#bbbfca',
      alignSelf: 'flex-start',
   },
   textContainer: {
      borderBottomWidth: 0.5,
      borderColor: '#3aa2bd',
      color: '#3aa2bd',
      width: '100%',
      fontSize: 20,
      paddingVertical: 5,
   },
   loginButtonContainer: {
      backgroundColor: '#3aa2bd',
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
});
 