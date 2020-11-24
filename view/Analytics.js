import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { colors, screenWidth, containerWidth } from '../helpers/config';

import { FontAwesome5 } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons'; 
import { Entypo } from '@expo/vector-icons'; 

import GradientBackground from '../helpers/GradientBackground';

import { RegionAnalytics } from './Analytics.Region';
import { RechargeAnalytics } from './Analytics.Recharge';
import { UserAnalytics, SingleInfo } from './Analytics.User';
import { LoanAnalytics } from './Analytics.Loan';

const Stack = createStackNavigator();

const AnalyticsScreen = ({navigation}) => {
   return(
      <View style={styles.container}>
         <GradientBackground/>
         <TouchableOpacity onPress={() => navigation.navigate("UserAnalytics")}>
            <View style={styles.card}>
               <FontAwesome5 name="user-friends" size={24} color="black" />
               <Text>User Analytics</Text>
            </View>
         </TouchableOpacity>

         <TouchableOpacity onPress={() => navigation.navigate("LoanAnalytics")}>
            <View style={styles.card}>
               <FontAwesome name="bank" size={24} color="black" />
               <Text>Loan Analytics</Text>
            </View>
         </TouchableOpacity>
         
         <TouchableOpacity onPress={() => navigation.navigate("RechargeAnalytics")}>
            <View style={styles.card}>
               <FontAwesome5 name="money-bill-alt" size={24} color="black" />
               <Text>Recharge Analytics</Text>
            </View>
         </TouchableOpacity>

         <TouchableOpacity onPress={() => navigation.navigate("RegionAnalytics")}>
            <View style={styles.card}>
               <Entypo name="location-pin" size={24} color="black" />
               <Text>Region Analytics</Text>
            </View>
         </TouchableOpacity>
      </View>
   )
}

export default function Analytics(){
   return(
      <Stack.Navigator
         initialRouteName="Analytics"
         headerMode="screen"
         screenOptions={{
            headerStyle: {
               backgroundColor: colors.VTGREEN
            },
            headerTintColor: 'white',
            headerTitleAlign: 'center'
         }}
      >
         <Stack.Screen name="Analytics" component={AnalyticsScreen}/>
         <Stack.Screen name="UserAnalytics" component={UserAnalytics} options={{title:'User Analytics'}}/>
         <Stack.Screen name="LoanAnalytics" component={LoanAnalytics} options={{title:'Loan Analytics'}}/>
         <Stack.Screen name="RechargeAnalytics" component={RechargeAnalytics} options={{title:'Recharge Analytics'}}/>
         <Stack.Screen name="RegionAnalytics" component={RegionAnalytics} options={{title:'Region Analytics'}}/>
      </Stack.Navigator>
   )
} 

const VTGREEN = "#17ADB0";

const styles = StyleSheet.create({
   container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 20,
   },
   row: {
      flexDirection: 'row',
   },
   card: {
      backgroundColor: 'white',
      // borderRadius: 5,
      width: containerWidth,
      marginHorizontal:30,
      marginBottom: 20,
      paddingVertical: 20,
      justifyContent: 'center',
      alignItems: 'center',
      
      shadowColor: "#000",
      shadowOffset: {
         width: 0,
         height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,

      elevation: 5,
   },
   subcard: {
      backgroundColor: 'white',
      width: containerWidth,
      alignItems: 'center',
      justifyContent: 'center',
   },
   paddingCard: {
      backgroundColor: 'white',
      width: containerWidth,
      marginHorizontal:30,
      marginBottom: 20,
      paddingVertical: 20,
      paddingHorizontal: 30,
      justifyContent: 'center',
   },
   label: {
      color: 'grey',
      fontSize: 20,
      fontWeight: '600',
      marginBottom: 10,
      marginRight: 5,
      textAlign: 'center'
   },
   value: {
      fontSize: 30,
      color: colors.VTGREEN,
      // textAlign: 'center',
   },
   searchContainer: {
      elevation: 0,
      borderBottomWidth: 1,
      borderBottomColor: 'lightgrey'
   }
});