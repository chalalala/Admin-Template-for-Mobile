import React, { useState } from 'react';
import { StyleSheet, Dimensions, TextInput, Text, TouchableOpacity, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { GlobalStateProvider, useGlobalState} from './helpers/global.js';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import GradientBackground from './helpers/GradientBackground';

import { colors } from './helpers/config';
import { accounts } from './data/accounts.js';

import Dashboard from './Dashboard';
import Analytics from './Analytics';
import Account from './Account';

const Tab = createBottomTabNavigator();

const routeIcons = {
  Dashboard: "view-dashboard",
  Analytics: "google-analytics",
  Account: "account"
};

const LoginScreen = () => {
  const [state, dispatch] = useGlobalState();
  const [account, setAccount] = useState("");
  const [pwd, setPwd] = useState("");
  const [message, setMsg] = useState("");

  const login = () => {
    let _acc = accounts.find(item => item.uid === account);
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
          <Text style={styles.inputLabel}>User ID</Text>
          <TextInput
            // label='User ID'
            // mode='outlined'
            selectionColor={colors.VTBLUE}
            style={styles.textContainer}
            onChangeText={text => setAccount(text)}
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
     color: colors.GREYCOLOR,
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
  }
});

