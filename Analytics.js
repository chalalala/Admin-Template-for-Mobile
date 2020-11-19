import React from 'react';
import Constants from 'expo-constants';
import { StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { LinearGradient } from 'expo-linear-gradient';
import colors from './colors';

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
const screenWidth = Dimensions.get("window").width;

const chartConfig = {
   backgroundGradientFrom: "#fff",
   backgroundGradientTo: "#fff",
   fillShadowGradient: 'rgba(22, 165, 150)',
   fillShadowGradientOpacity: 0.3,
   color: (opacity = 1) => `rgba(50, 50, 50, ${opacity})`,
   strokeWidth: 2,
   barPercentage: 0.5,
   useShadowColorFromDataset: false
 };

const AnalyticsScreen = ({navigator}) => {
   return(
      <ScrollView>
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
         <View style={styles.container}>
            <View style={[styles.card, styles.subcard]}>
               <LineChart
                  data={history_calls}
                  width={screenWidth*0.9}
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

export default function Analytics({route}){
   return(
      <Stack.Navigator
         initialRouteName="Analytics"
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
         <Stack.Screen name="Analytics" component={AnalyticsScreen}/>
      </Stack.Navigator>
   )
} 

const VTGREEN = "#17ADB0";

const styles = StyleSheet.create({
   container: {
      flex: 1,
      alignItems: 'center',
      paddingTop: 20,
   },
   row: {
      flexDirection: 'row',
   },
   card: {
      backgroundColor: 'white',
      width: screenWidth*0.9,
      marginHorizontal:30,
      marginBottom: 20,
      paddingVertical: 20,
      justifyContent: 'center',
   },
   subcard: {
      backgroundColor: 'white',
      width: screenWidth*0.9,
      alignItems: 'center',
      justifyContent: 'center',
   },
   paddingCard: {
      backgroundColor: 'white',
      width: screenWidth*0.9,
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
      color: colors("VTGREEN"),
      // textAlign: 'center',
   },
   searchContainer: {
      elevation: 0,
      borderBottomWidth: 1,
      borderBottomColor: 'lightgrey'
   }
});

 