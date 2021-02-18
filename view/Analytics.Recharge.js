import React, { useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, ActivityIndicator } from 'react-native';
import { colors, chartConfig, screenWidth, containerWidth } from '../helpers/config';
import GradientBackground from '../helpers/GradientBackground';
import readTextFile from '../actions/systemActions';
import { DataTable, Searchbar } from 'react-native-paper';
import { LineChart } from "react-native-chart-kit";
import axios from 'axios'; 

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
      axios.get('https://chalalala.github.io/The2000th-API/rechargeInfo.json')
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
                  <DataTable.Title>Recharge</DataTable.Title>
                  <DataTable.Title>Card payment</DataTable.Title>
                  <DataTable.Title>Virtual payment</DataTable.Title>
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
                     <DataTable.Cell>{user.sum_recharge}</DataTable.Cell>
                     <DataTable.Cell>{user.sum_C}</DataTable.Cell>
                     <DataTable.Cell>{user.sum_V}</DataTable.Cell>
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

export const RechargeAnalytics = () => {
   const money = {
      labels: ["1","5","10","15","20","25","30"],
      datasets: [
        {
          data: [1627423075.0, 1872843089.0, 1662232956.0, 1650075746.0, 1991013836.0, 2590371200.0
          ],
          color: (opacity = 1) => `rgb(73, 178, 123, ${opacity})`,
          strokeWidth: 2
        },
        {
         data: [ -1519900000000.0, -1389200000000.0, -1433600000000.0, -1413800000000.0, -1725500000000.0, -1927700000000.0],
         color: (opacity = 1) => `rgb(255, 199, 46, ${opacity})`,
         strokeWidth: 2
       },
      ],
      legend: ["Recharge", "Loan"]
   };

   return(
      <ScrollView>
         <View style={styles.container}>
            <GradientBackground/>      
            <View style={styles.card}>
               <Text style={styles.label}>Total recharged</Text>
               <LineChart
                  data={money}
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