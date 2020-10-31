import React from 'react';
import Constants from 'expo-constants';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import LinearGradient from 'react-native-linear-gradient';

const Stack = createStackNavigator();

const AccountScreen = ({navigator}) => {
   return(
      <View style={styles.container}>
         <Text>Hello</Text>
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
});
 