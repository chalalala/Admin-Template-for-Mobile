import React, { useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, ActivityIndicator } from 'react-native';
import { colors, chartConfig, screenWidth, containerWidth } from '../helpers/config';
import GradientBackground from '../helpers/GradientBackground';
import { DataTable, Searchbar } from 'react-native-paper';
import axios from 'axios'; 

import {
   LineChart,
   BarChart
} from "react-native-chart-kit";
import { totalCalls } from '../data/totalCalls';
import { dataUsed } from '../data/dataUsed';

const Table = () =>{
   const [query, setQuery] = React.useState("");
   const [page, setPage] = React.useState(0);
   const [data, setData] = React.useState([]);
   const itemsPerPage = 5;
   const [numberOfPages, setNoPages] = React.useState(0);
   const [loading, setLoading] = React.useState(true);
   
   const filterResult = (user) => {
      if (user.msisdn.includes(query)){
         return true;
      }
   }

   const getData = () => {
      setLoading(true);
      axios.get('https://chalalala.github.io/The2000th-API/userInfo.json')
      .then(response => {
         setNoPages(Math.ceil(response.data.length / itemsPerPage));
         // console.log(response.data);
         setData(response.data);
         setLoading(false);
      })
      .catch(function (error) {
          console.log(error);
      })
   }

   useEffect(() => {
      getData();
   },[])  

   if (loading){
      return(            
         <View style={[styles.container, {height:400}]}>
            <ActivityIndicator size="large" color={colors.VTBLUE}/>
         </View>
      )
   }
   else{
      return(
         <ScrollView horizontal>
            <DataTable style={{width:800}}>
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
                  <DataTable.Title>Age</DataTable.Title>
                  <DataTable.Title>City</DataTable.Title>
                  <DataTable.Title>Label</DataTable.Title>
               </DataTable.Header>

               {
               data
               .filter(item => filterResult(item))
               .slice(
                  page*itemsPerPage,
                  page*itemsPerPage + itemsPerPage
               )
               .map(user => (
                  <DataTable.Row key={user.msisdn}>
                     <DataTable.Cell>{user.msisdn}</DataTable.Cell>
                     <DataTable.Cell>{user.Age}</DataTable.Cell>
                     <DataTable.Cell>{user.City}</DataTable.Cell>
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
      )
   }
}

export const UserAnalytics = ({navigation}) => {
   return(
      <ScrollView>
         <View style={styles.container}>
            <GradientBackground/>
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
               <Table/>
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