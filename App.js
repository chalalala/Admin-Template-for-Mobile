import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import colors from './colors';
import { GlobalStateProvider, useGlobalState} from './global.js';

import Dashboard from './Dashboard';
import Analytics from './Analytics';
import Account from './Account';
// import LoginScreen from './LoginScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const routeIcons = {
  Dashboard: "view-dashboard",
  Analytics: "google-analytics",
  Account: "account"
};

const LoginScreen = ({navigation}) => {
  const [state, dispatch] = useGlobalState();
  // const [uid,setUID] = useState("");
  // const [pwd,setPwd] = useState("");
  // const [secure,setSecure] = useState(true);

  return(
     <View style={styles.container}>
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
          <Text>State: {state.loggedin ? "True" : "False"}</Text>
        
          <TouchableOpacity style={styles.loginButtonContainer}
            onPress={() => dispatch({ loggedin: true })}
          >
            <Text style={styles.loginButtonText}>Sign In</Text>
          </TouchableOpacity>
        </View>
     </View>
  )
}

const InAppScreen = ({navigator}) => {
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
          activeTintColor: colors("BGREEN"),
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
    state.loggedin ? <InAppScreen/> : <LoginScreen/>
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
     color: colors("GREYCOLOR"),
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
});

