import React from 'react';
import Constants from 'expo-constants';
import { StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import LinearGradient from 'expo-linear-gradient';
import colors from './colors';

import { DataTable } from 'react-native-paper';

const Stack = createStackNavigator();
const screenWidth = Dimensions.get("window").width;

const chartConfig = {
   backgroundGradientFrom: "#1E2923",
   backgroundGradientFromOpacity: 0,
   backgroundGradientTo: "#08130D",
   backgroundGradientToOpacity: 0.5,
   color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
   strokeWidth: 2,
   barPercentage: 0.5,
   useShadowColorFromDataset: false
};

const DashboardScreen = ({navigator}) => {
   return(
      <ScrollView>
         {/* <LinearGradient colors={[VTBLUE,VTGREEN]}/> */}
         <View style={styles.container}>
            <View style={styles.card}>
               <View>
                  <Text style={styles.label}>Active user</Text>
                  <Text style={styles.value}>300/400</Text>
               </View>
            </View>
            
            <View style={styles.card}>
               <Text style={styles.label}>Total call</Text>
               <Text style={styles.value}>10.000.000</Text>
            </View>

            <View style={styles.card}>
               <ScrollView horizontal>
                  <DataTable style={{width:500}}>
                     <DataTable.Header>
                        <DataTable.Title>ID</DataTable.Title>
                        <DataTable.Title>Tel</DataTable.Title>
                        <DataTable.Title>City</DataTable.Title>
                        <DataTable.Title>Birth</DataTable.Title>
                        <DataTable.Title>Label</DataTable.Title>
                     </DataTable.Header>

                     <DataTable.Row>
                        <DataTable.Cell>001</DataTable.Cell>
                        <DataTable.Cell>0948949848</DataTable.Cell>
                        <DataTable.Cell>Hanoi</DataTable.Cell>
                        <DataTable.Cell>2000</DataTable.Cell>
                        <DataTable.Cell>Good</DataTable.Cell>
                     </DataTable.Row>

                     <DataTable.Row>
                        <DataTable.Cell>002</DataTable.Cell>
                        <DataTable.Cell>04892651462</DataTable.Cell>
                        <DataTable.Cell>Hanoi</DataTable.Cell>
                        <DataTable.Cell>2000</DataTable.Cell>
                        <DataTable.Cell>Good</DataTable.Cell>
                     </DataTable.Row>

                     <DataTable.Pagination
                        page={1}
                        numberOfPages={3}
                        onPageChange={page => {
                        console.log(page);
                        }}
                        label="1-2 of 6"
                     />
                  </DataTable>
               </ScrollView>
            </View>
         </View>
      </ScrollView>
   )
}

export default function Dashboard({route}){
   return(
      <Stack.Navigator
         initialRouteName="Dashboard"
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
         <Stack.Screen name="Dashboard" component={DashboardScreen}/>
      </Stack.Navigator>
   )
} 

const VTBLUE = "#007DDD";
const VTGREEN = "#17ADB0";
// const DGREEN = "#319772";

const styles = StyleSheet.create({
   container: {
     flex: 1,
     alignItems: 'center',
   },
   content: {
      width:'100%',
      justifyContent:'center',
   },
   row: {
      flexDirection: 'row',
   },
   card: {
      backgroundColor: 'white',
      width: '90%',
      // height: 100,
      marginTop: 20,
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
   chartContainer: {
      backgroundColor: 'white',
      width: '90%',
      marginTop: 20,
      paddingVertical: 20,
      alignItems: 'center',
      justifyContent: 'center',
   }
});
 