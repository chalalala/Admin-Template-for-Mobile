import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { colors, chartConfig, screenWidth, containerWidth } from '../helpers/config';
import GradientBackground from '../helpers/GradientBackground';

import {
   BarChart,
   PieChart} from "react-native-chart-kit";
import { rateUser } from '../data/rateUser.js';
import { history_calls } from '../data/history_calls';

export const RegionAnalytics = () => {
   return(
      <ScrollView>
         <GradientBackground/>
         <View style={styles.container}>
            <View style={styles.card}>
               <Text style={styles.label}>Rate of users per region</Text>
               <PieChart
                  data={rateUser}
                  width={screenWidth*0.8}
                  height={170}
                  chartConfig={chartConfig}
                  accessor="percentage"
                  backgroundColor="transparent"
                  paddingLeft="0"
               />
            </View>

            <View style={styles.card}>
               <Text style={styles.label}>Total call times by Region</Text>
               <BarChart
               data={history_calls}
               width={screenWidth*0.8}
               height={220}
               chartConfig={chartConfig}
               verticalLabelRotation={30}
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