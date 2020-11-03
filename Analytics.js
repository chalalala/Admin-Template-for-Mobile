import React from 'react';
import Constants from 'expo-constants';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import LinearGradient from 'react-native-linear-gradient';
import {
   LineChart,
   BarChart,
   PieChart,
   ProgressChart,
   ContributionGraph,
   StackedBarChart
} from "react-native-chart-kit";
import { history_calls } from './data/history_calls';
 
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
      <View style={styles.container}>
         <LineChart
            data={history_calls}
            width={screenWidth}
            height={220}
            chartConfig={chartConfig}
         />
      </View>
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
               backgroundColor: '#298299'
            },
            headerTintColor: 'white',
            headerTitleAlign: 'center'
         }}
      >
         <Stack.Screen name="Analytics" component={AnalyticsScreen}/>
      </Stack.Navigator>
   )
} 

const styles = StyleSheet.create({
   container: {
     flex: 1,
     backgroundColor: '#fff',
     alignItems: 'center',
   //   justifyContent: 'center',
   },
   chartContainer: {
      backgroundColor: 'white',
      width: '90%',
      marginTop: 20,
      paddingVertical: 20,
      alignItems: 'center',
      justifyContent: 'center',
   },
});
 