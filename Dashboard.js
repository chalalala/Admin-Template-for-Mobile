import React from 'react';
import Constants from 'expo-constants';
import { StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import LinearGradient from 'expo-linear-gradient';
import colors from './colors';

import { DataTable, Searchbar } from 'react-native-paper';
import { list_user } from './data/list_user';

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
   const itemsPerPage = 5;
   const [page, setPage] = React.useState(0);
   const from = page * itemsPerPage;
   const to = (page + 1) * itemsPerPage;

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
                  <DataTable style={{width:700}}>
                     <Searchbar
                        placeholder="Enter ID"
                        style={styles.searchContainer}
                        inputStyle={{color:colors("VTGREEN")}}   
                     />
                     <DataTable.Header>
                        <DataTable.Title>ID</DataTable.Title>
                        <DataTable.Title>Tel</DataTable.Title>
                        <DataTable.Title>City</DataTable.Title>
                        <DataTable.Title>Birth</DataTable.Title>
                        <DataTable.Title>Label</DataTable.Title>
                     </DataTable.Header>

                     {
                     list_user.map(user => (
                        <DataTable.Row key={user.id}>
                           <DataTable.Cell>{user.id}</DataTable.Cell>
                           <DataTable.Cell>{user.tel}</DataTable.Cell>
                           <DataTable.Cell>{user.city}</DataTable.Cell>
                           <DataTable.Cell>{user.birth}</DataTable.Cell>
                           <DataTable.Cell>{user.label}</DataTable.Cell>
                        </DataTable.Row>
                     ))
                     }
                  <Text style={{marginTop:20, marginLeft: 10, color:'grey'}}>Swipe right >> </Text>
                  <DataTable.Pagination
                     page={page}
                     numberOfPages={Math.floor(list_user.length / itemsPerPage)}
                     onPageChange={page => setPage(page)}
                     label={`${from + 1}-${to} of ${list_user.length}`}
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

// const VTBLUE = "#007DDD";
// const VTGREEN = "#17ADB0";
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
   },
   searchContainer: {
      elevation: 0,
      borderBottomWidth: 1,
      borderBottomColor: 'lightgrey'
   }
});
 