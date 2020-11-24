import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import { colors, chartConfig, screenWidth, containerWidth } from '../helpers/config';
import GradientBackground from '../helpers/GradientBackground';
import { DataTable, Searchbar } from 'react-native-paper';

import {
   LineChart,
   BarChart,
   PieChart,
   ProgressChart,
   ContributionGraph,
   StackedBarChart
} from "react-native-chart-kit";
import { totalCalls } from '../data/totalCalls';
import { dataUsed } from '../data/dataUsed';
import { list_user } from '../data/list_user';

export const UserAnalytics = ({navigation}) => {
   const filterResult = () => {
      if (!query){
         setDisplay(list_user);
      }
      else{
         setDisplay(list_user.filter(user => user.id === query))
      }
   }

   const [query, setQuery] = React.useState("");
   const [page, setPage] = React.useState(0);
   const [display, setDisplay] = React.useState(list_user);
   const itemsPerPage = 5;
   const numberOfPages = Math.ceil(list_user.length / itemsPerPage);

   return(
      <ScrollView>
         <GradientBackground/>
         <View style={styles.container}>
            <View style={styles.card}>
               <Text style={styles.label}>The total calls made</Text>
               <LineChart
                  data={totalCalls}
                  width={screenWidth*0.8}
                  height={220}
                  chartConfig={chartConfig}
                  withHorizontalLabels	
               />
            </View>

            <View style={styles.card}>
               <Text style={styles.label}>Data used</Text>
               <BarChart
               data={dataUsed}
               width={screenWidth*0.8}
               height={220}
               chartConfig={chartConfig}
               verticalLabelRotation={30}
               />
            </View>

            <View style={styles.paddingCard}>
               <ScrollView horizontal>
                  <DataTable style={{width:900}}>
                     <Searchbar
                        placeholder="Enter user ID"
                        style={styles.searchContainer}
                        inputStyle={{color:colors.BLACK}}
                        onChangeText={text => setQuery(text)}
                        onIconPress={filterResult}
                        // keyboardType='number-pad'   
                     />
                     <DataTable.Header>
                        <DataTable.Title>ID</DataTable.Title>
                        <DataTable.Title>Phone</DataTable.Title>
                        <DataTable.Title>No. of calls</DataTable.Title>
                        <DataTable.Title>Data used</DataTable.Title>
                        <DataTable.Title>Loan</DataTable.Title>
                        <DataTable.Title>Payback</DataTable.Title>
                        <DataTable.Title>Credit score</DataTable.Title>
                        <DataTable.Title>Label</DataTable.Title>
                     </DataTable.Header>

                     {
                     display
                     .slice(
                        page*itemsPerPage,
                        page*itemsPerPage + itemsPerPage
                     )
                     .map(user => (
                        <DataTable.Row key={user.id}>
                           <DataTable.Cell>{user.id}</DataTable.Cell>
                           <DataTable.Cell>{user.city}</DataTable.Cell>
                           <DataTable.Cell>{user.calls}</DataTable.Cell>
                           <DataTable.Cell>{user.data_used}</DataTable.Cell>
                           <DataTable.Cell>{user.loan}</DataTable.Cell>
                           <DataTable.Cell>{user.payback}</DataTable.Cell>
                           <DataTable.Cell>{user.creditscore}</DataTable.Cell>
                           <DataTable.Cell>{user.label}</DataTable.Cell>
                        </DataTable.Row>
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