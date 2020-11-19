import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import GradientBackground from './helpers/GradientBackground';
import { colors, chartConfig, screenWidth, containerWidth } from './helpers/config';

import { FontAwesome5 } from '@expo/vector-icons'; 
import {
   LineChart,
   BarChart,
   PieChart,
   ProgressChart,
   ContributionGraph,
   StackedBarChart
} from "react-native-chart-kit";
import { history_calls } from './data/history_calls';
import { distribution } from './data/distribution.js';

const Stack = createStackNavigator();

const UserAnalytics = ({navigation}) => {
   return(
      <ScrollView>
         <GradientBackground/>
         <View style={styles.container}>
            <View style={[styles.card, styles.subcard]}>
               <LineChart
                  data={history_calls}
                  width={containerWidth}
                  height={220}
                  chartConfig={chartConfig}
               />
            </View>

            <View style={[styles.card, styles.subcard]}>
               <Text style={styles.label}>Distribution of users</Text>
               <PieChart
                  data={distribution}
                  width={screenWidth*0.8}
                  height={170}
                  chartConfig={chartConfig}
                  accessor="percentage"
                  backgroundColor="transparent"
                  paddingLeft="0"
               />
            </View>
         </View>
      </ScrollView>
   )
}

const AnalyticsScreen = ({navigation}) => {
   return(
      <View style={styles.container}>
         <GradientBackground/>
         <TouchableOpacity onPress={() => navigation.navigate("UserAnalytics")}>
            <View style={[styles.card, styles.subcard]}>
               <FontAwesome5 name="user-friends" size={24} color="black" />
               <Text>User analytics</Text>
            </View>
         </TouchableOpacity>

         <View style={[styles.card, styles.subcard]}>
            <FontAwesome5 name="user-friends" size={24} color="black" />
            <Text>User analytics</Text>
         </View>
         
         <View style={[styles.card, styles.subcard]}>
            <FontAwesome5 name="user-friends" size={24} color="black" />
            <Text>User analytics</Text>
         </View>

         <View style={[styles.card, styles.subcard]}>
            <FontAwesome5 name="user-friends" size={24} color="black" />
            <Text>User analytics</Text>
         </View>
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
         <Stack.Screen name="UserAnalytics" component={UserAnalytics}/>
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

 