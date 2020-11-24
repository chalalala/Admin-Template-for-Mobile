import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import { colors, chartConfig, screenWidth, containerWidth } from './helpers/config';
import GradientBackground from './helpers/GradientBackground';
import { DataTable, Searchbar } from 'react-native-paper';
import {
   LineChart,
   BarChart,
   PieChart,
   ProgressChart,
   ContributionGraph,
   StackedBarChart
} from "react-native-chart-kit";

export const LoanAnalytics = () => {
   const paymentMethod = {
      labels: ["1","5","10","15","20","25","30"],
      datasets: [
        {
          data: [489,598,498, 979, 1038, 421, 399],
          color: (opacity = 1) => `rgb(73, 178, 123, ${opacity})`,
          strokeWidth: 2
        },
        {
         data: [289,798,198, 879, 1038, 321, 599],
         color: (opacity = 1) => `rgb(255, 199, 46, ${opacity})`,
         strokeWidth: 2
       },
      ],
      legend: ["Card", "Virtual"]
   };

   return(
      <ScrollView>
         <GradientBackground/>
         <View style={styles.container}>
            <View style={styles.card}>
               <Text style={styles.label}>Total amount spent, deposited, borrowed</Text>
               <LineChart
                  data={paymentMethod}
                  width={screenWidth*0.8}
                  height={200}
                  chartConfig={chartConfig}
               />
            </View>
         </View>
      </ScrollView>
   )
}

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