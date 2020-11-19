import React from 'react';
import Constants from 'expo-constants';
import { StyleSheet, Text, TouchableOpacity, View, ScrollView, Dimensions } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { LinearGradient } from 'expo-linear-gradient';
import colors from './colors';

import { DataTable, Searchbar } from 'react-native-paper';
import { list_user } from './data/list_user';
import { general_statistics as gs} from './data/general_statistics';
import {
   LineChart,
   BarChart,
   PieChart,
   ProgressChart,
   ContributionGraph,
   StackedBarChart
} from "react-native-chart-kit";

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

const Card = (props) => {
   return(
      <View style={props.style ? props.style : styles.subcard}>
         <Text style={styles.label}>{props.label}</Text>
         <Text style={styles.value}>{props.value}</Text>
      </View>
   )
}

const SingleInfo = ({route}) => {
   let user = route.params;
   const data = [{
      name: "Success",
      percentage: Math.round(user.success_calls/user.calls*100),
      color: "#28abb9",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
   },
   {
      name: "Unsuccess",
      percentage: 100-Math.round(user.success_calls/user.calls*100),
      color: "#2d6187",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
   },
   ]

   const history_calls = {
      labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
      datasets: [
        {
          data: user.call_lengths,
          color: (opacity = 1) => `rgb(73, 178, 123, ${opacity})`,
          strokeWidth: 2
        }
      ],
      legend: ["Lengths of calls"]
    }; 
   
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
            <Card label='Number of Calls' value={user.calls} style={styles.paddingCard}/>

            <View style={[styles.subcard, styles.card]}>
               <Text style={styles.label}>Percentage of successful calls</Text>
               <PieChart
                  data={data}
                  width={screenWidth*0.8}
                  height={120}
                  chartConfig={chartConfig}
                  accessor="percentage"
                  backgroundColor="transparent"
                  paddingLeft="0"
               />
            </View>

            <View style={[styles.subcard,{marginBottom:20}]}>
               <LineChart
                  data={history_calls}
                  width={screenWidth*0.8}
                  height={200}
                  chartConfig={chartConfig}
               />
            </View>
         
         </View>
      </ScrollView>
   )
}

const DashboardScreen = ({navigation}) => {
   const [query, setQuery] = React.useState("");
   const [page, setPage] = React.useState(0);
   const [display, setDisplay] = React.useState(list_user);
   const itemsPerPage = 5;
   const numberOfPages = Math.ceil(list_user.length / itemsPerPage);
   
   const filterResult = () => {
      if (!query){
         setDisplay(list_user);
      }
      else{
         setDisplay(list_user.filter(user => removeSpace(user.id) === removeSpace(query)))
      }
   }

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
            <View>
               {/* <ScrollView horizontal>
                  <View style={{width:screenWidth*0.9*gs.length, flexDirection:'row'}}>
                  {
                     gs.map(item => (
                        <Card label={item.label} value={item.value} key={item.label}/>
                     ))
                  }
                  </View>
               </ScrollView> */}

               <Card label='Active user' value='300/400' style={styles.paddingCard}/>
               <Card label='Successful calls' value='946,348' style={styles.paddingCard}/>
            </View>
            
            <View style={styles.paddingCard}>
               <ScrollView horizontal>
                  <DataTable style={{width:900}}>
                     <Searchbar
                        placeholder="Enter user ID"
                        style={styles.searchContainer}
                        inputStyle={{color:colors("BLACK")}}
                        onChangeText={text => setQuery(text)}
                        onIconPress={filterResult}
                        // keyboardType='number-pad'   
                     />
                     <DataTable.Header>
                        <DataTable.Title>ID</DataTable.Title>
                        <DataTable.Title>No. of calls</DataTable.Title>
                        <DataTable.Title>Success calls</DataTable.Title>
                        <DataTable.Title>Data used</DataTable.Title>
                        {/* <DataTable.Title>Calls length</DataTable.Title> */}
                        <DataTable.Title>Spent</DataTable.Title>
                        <DataTable.Title>Recharge</DataTable.Title>
                        <DataTable.Title>Loan</DataTable.Title>
                        <DataTable.Title>Label</DataTable.Title>
                     </DataTable.Header>

                     {
                     display
                     .slice(
                        page*itemsPerPage,
                        page*itemsPerPage + itemsPerPage
                     )
                     .map(user => (
                        <TouchableOpacity key={user.id}
                           onPress={()=>navigation.navigate('SingleInfo', user)}>
                           <DataTable.Row key={user.id}>
                              <DataTable.Cell>{user.id}</DataTable.Cell>
                              <DataTable.Cell>{user.calls}</DataTable.Cell>
                              <DataTable.Cell>{user.success_calls}</DataTable.Cell>
                              <DataTable.Cell>{user.data_used}</DataTable.Cell>
                              {/* <DataTable.Cell>{user.call_lengths}</DataTable.Cell> */}
                              <DataTable.Cell>{user.spent}</DataTable.Cell>
                              <DataTable.Cell>{user.recharge}</DataTable.Cell>
                              <DataTable.Cell>{user.loan}</DataTable.Cell>
                              <DataTable.Cell>{user.label}</DataTable.Cell>
                           </DataTable.Row>
                        </TouchableOpacity>
                     ))
                     }
                  <Text style={{marginTop:20, marginLeft: 10, color:'grey'}}>&lt;&lt; Swipe left to see more</Text>
                  <Text></Text>
                  <DataTable.Pagination
                     page={page}
                     numberOfPages={numberOfPages}
                     onPageChange={page => setPage(page)}
                     label={`${page+1} of ${numberOfPages}`}
                     // style={{justifyContent: 'flex-start'}}
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
            headerStyle: {
               backgroundColor: colors("VTGREEN")
            },
            headerTintColor: 'white',
            headerTitleAlign: 'center'
         }}
      >
         <Stack.Screen name="Dashboard" component={DashboardScreen}/>
         <Stack.Screen name="SingleInfo" component={SingleInfo} options={{title:'Details'}}/>
      </Stack.Navigator>
   )
} 

const removeSpace = text => (text.replace(/\s/g, ''));

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
 