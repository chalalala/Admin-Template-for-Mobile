import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import GradientBackground from '../helpers/GradientBackground';
import { colors, chartConfig, containerWidth, screenWidth } from '../helpers/config';

import { general_statistics as gs} from '../data/general_statistics';
import {
   LineChart,
   BarChart,
   PieChart,
   ProgressChart,
   ContributionGraph,
   StackedBarChart
} from "react-native-chart-kit";

const Stack = createStackNavigator();

const Card = (props) => {
   return(
      <View style={props.style ? props.style : styles.subcard}>
         <Text style={styles.label}>{props.label}</Text>
         <Text style={styles.value}>{props.value}</Text>
      </View>
   )
}

const DashboardScreen = ({navigation}) => {
   const money = {
      labels: ["1","5","10","15","20","25","30"],
      datasets: [
        {
          data: [1627423075.0, 1872843089.0, 1662232956.0, 1650075746.0, 1991013836.0, 2590371200.0],
          color: (opacity = 1) => `rgb(73, 178, 123, ${opacity})`,
          strokeWidth: 2
        },
        {
         data: [ -1519900000000.0, -1389200000000.0, -1433600000000.0, -1413800000000.0, -1725500000000.0, -1927700000000.0],
         color: (opacity = 1) => `rgb(255, 199, 46, ${opacity})`,
         strokeWidth: 2
       },
      //   {
      //    data: [1489,1598,3498, 2979, 1088, 421, 1399],
      //    color: (opacity = 1) => `rgb(232, 28, 21, ${opacity})`,
      //    strokeWidth: 2
      //  }
      ],
      legend: ["Recharge", "Loan"]
   }

   return(
      <ScrollView>
         <GradientBackground/>
         <View style={styles.container}>
            <View>
               {/* <ScrollView horizontal>
                  <View style={{width:containerWidth*gs.length, flexDirection:'row'}}>
                     <Card label='Active user' value='300/400' style={styles.paddingCard}/>
                     <Card label='Successful calls' value='946,348' style={styles.paddingCard}/>
                  </View>
               </ScrollView> */}
               <Card label='Active user' value='115,134' style={styles.paddingCard}/>
               <Card label='Successful calls' value='24,428,087' style={styles.paddingCard}/>
            </View>
            
            <View style={[styles.subcard,styles.card]}>
               <Text style={styles.label}>Money flow</Text>
               <LineChart
                  data={money}
                  width={screenWidth*0.8}
                  height={200}
                  chartConfig={chartConfig}
               />
            </View>
         </View>
      </ScrollView>
   )
}

export default function Dashboard(){
   return(
      <Stack.Navigator
         initialRouteName="Dashboard"
         headerMode="screen"
         screenOptions={{
            headerStyle: {
               backgroundColor: colors.VTGREEN
            },
            headerTintColor: 'white',
            headerTitleAlign: 'center'
         }}
      >
         <Stack.Screen name="Dashboard" component={DashboardScreen}/>
      </Stack.Navigator>
   )
} 

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
      width: containerWidth,
      marginHorizontal:30,
      marginBottom: 20,
      paddingVertical: 20,
      justifyContent: 'center',
   },
   subcard: {
      backgroundColor: 'white',
      width: containerWidth,
      alignItems: 'center',
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
   },
});
 