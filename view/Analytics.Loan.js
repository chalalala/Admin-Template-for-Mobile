import React, { useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, ActivityIndicator } from 'react-native';
import { colors, chartConfig, screenWidth, containerWidth } from '../helpers/config';
import GradientBackground from '../helpers/GradientBackground';
import { DataTable, Searchbar } from 'react-native-paper';
import axios from 'axios'; 

import { LineChart } from "react-native-chart-kit";

const Table = () =>{
   const [query, setQuery] = React.useState("");
   const [page, setPage] = React.useState(0);
   const [display, setDisplay] = React.useState(data);
   const [data, setData] = React.useState([]);
   const itemsPerPage = 5;
   const [numberOfPages, setNoPages] = React.useState(0);
   const [loading, setLoading] = React.useState(true);
   
   const filterResult = () => {
      if (!query){
         getData();
      }
      else{
         setDisplay(display.filter(user => user.msisdn.includes(query)))
      }
   }

   const getData = () => {
      setLoading(true);
      axios.get('https://chalalala.github.io/The2000th-API/loan_info.json')
      .then(response => {
         setNoPages(Math.ceil(response.data.length / itemsPerPage));
         // console.log(response.data);
         setDisplay(response.data);
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
         <View style={[styles.container, {height:500}]}>
            <ActivityIndicator size="large" color={colors.VTBLUE}/>
         </View>
      )
   }
   else{
      return(
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
                  <DataTable.Title>Loan</DataTable.Title>
                  <DataTable.Title>Payback</DataTable.Title>
                  <DataTable.Title>Debt</DataTable.Title>
               </DataTable.Header>

               {
               display
               .slice(
                  page*itemsPerPage,
                  page*itemsPerPage + itemsPerPage
               )
               .map(user => (
                  <DataTable.Row key={user.msisdn}>
                     <DataTable.Cell>{user.msisdn}</DataTable.Cell>
                     <DataTable.Cell>{user.num_loan}</DataTable.Cell>
                     <DataTable.Cell>{user.num_repay}</DataTable.Cell>
                     <DataTable.Cell>{user.remaining_debt}</DataTable.Cell>
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

export const LoanAnalytics = () => {
   const paymentMethod = {
      labels: ["1","5","10","15","20","25","30"],
      datasets: [
        {
          data: [393963065.0, 473823089.0, 400662956.0, 409385746.0, 488283826.0, 661661200.0],
          color: (opacity = 1) => `rgb(73, 178, 123, ${opacity})`,
          strokeWidth: 2
        },
        {
         data: [1233460010.0, 1399020000.0, 1261570000.0, 1240690000.0, 1502730010.0, 1928710000.0],
         color: (opacity = 1) => `rgb(255, 199, 46, ${opacity})`,
         strokeWidth: 2
       },
      ],
      legend: ["Card", "Virtual"]
   };

   return(
      <ScrollView>
         <View style={styles.container}>
            <GradientBackground/>
            <View style={styles.card}>
               <Text style={styles.label}>Money flow</Text>
               <LineChart
                  data={paymentMethod}
                  width={screenWidth*0.8}
                  height={200}
                  chartConfig={chartConfig}
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