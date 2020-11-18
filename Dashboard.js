import React from 'react';
import Constants from 'expo-constants';
import { StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { LinearGradient } from 'expo-linear-gradient';
import colors from './colors';

import { DataTable, Searchbar } from 'react-native-paper';
import { list_user } from './data/list_user';
import { general_statistics as gs} from './data/general_statistics';

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

const Card = (props) => {
   return(
      <View style={styles.subcard}>
         <Text style={styles.label}>{props.label}</Text>
         <Text style={styles.value}>{props.value}</Text>
      </View>
   )
}
const DashboardScreen = ({navigator}) => {
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
         setDisplay(list_user.filter(user => removeSpace(user.tel) === removeSpace(query)))
      }
   }

   return(
      <ScrollView>
         {/* <LinearGradient colors={[VTBLUE,VTGREEN]}/> */}
         <View style={styles.container}>
            <View style={styles.card}>
               <ScrollView horizontal>
                  <View style={{width:screenWidth*0.9*gs.length, flexDirection:'row'}}>
                  {
                     gs.map(item => (
                        <Card label={item.label} value={item.value} key={item.label}/>
                     ))
                  }
                  </View>
               </ScrollView>
            </View>
            
            <View style={styles.paddingCard}>
               <ScrollView horizontal>
                  <DataTable style={{width:900}}>
                     <Searchbar
                        placeholder="Enter phone number"
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
                        <DataTable.Title>Calls length</DataTable.Title>
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
                        <DataTable.Row key={user.id}>
                           <DataTable.Cell>{user.id}</DataTable.Cell>
                           <DataTable.Cell>{user.calls}</DataTable.Cell>
                           <DataTable.Cell>{user.success_calls}</DataTable.Cell>
                           <DataTable.Cell>{user.data_used}</DataTable.Cell>
                           <DataTable.Cell>{user.call_lengths}</DataTable.Cell>
                           <DataTable.Cell>{user.spent}</DataTable.Cell>
                           <DataTable.Cell>{user.recharge}</DataTable.Cell>
                           <DataTable.Cell>{user.loan}</DataTable.Cell>
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

export default function Dashboard({route}){
   return(
      <Stack.Navigator
         initialRouteName="Dashboard"
         headerMode="screen"
         screenOptions={{
            // headerBackground: () => (
            //    <LinearGradient
            //       colors={['#21C99F','#298299']}
            //       style={{
            //          position: 'absolute',
            //          left: 0,
            //          right: 0,
            //          top: 0,
            //       }}
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
      width: screenWidth*0.9,
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
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
   chartContainer: {
      backgroundColor: 'white',
      width: '90%',
      marginTop: 20,
      paddingVertical: 20,
      alignItems: 'center',
      justifyContent: 'center',
   },
   searchContainer: {
      elevation: 0,
      borderBottomWidth: 1,
      borderBottomColor: 'lightgrey'
   }
});
 