import { StatusBar } from 'expo-status-bar';
import React, {useState , useEffect} from 'react';
import {TouchableOpacity, FlatList, StyleSheet, Text, View, Platform } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BuildingCard from './components/BuildingCard';
import BuildingDetails from './components/BuildingDetails';

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <NavigationContainer >
      <View style={styles.safeArea} />
      <Stack.Navigator
        screenOptions={{headerShown:false,
          animationEnabled:true,
          presentation:"card",
          gestureEnabled:true,
          gestureDirection:"horizontal"}} 
        initialRoute="Home"
        >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen  name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function HomeScreen({navigation}){
  const [data,setData] = useState([]);
  const loadData = async() =>{
      const response = await fetch("https://s3.amazonaws.com/decom_uploads/external/sites.json")
      .then((response)=>response.json())
      .then((data)=>{
        setData(data.sites)
        //navigation.push('Details',{item:data.sites[0]})
      })
  }

  useEffect(()=>{
    loadData();
  },[]);

  return (
    <View style={styles.containerHome}>
      <FlatList
        data = {data}
        keyExtractor = {({id},index)=>id}
        renderItem = {({item})=>(
          <TouchableOpacity onPress={() => navigation.push('Details',{item:item})}  >
            <BuildingCard item={item} />
          </TouchableOpacity>
        )}
      ></FlatList>
    </View>
  );
}

function DetailsScreen({ route, navigation }){
  const { item } = route.params;
  return (
    <View style={styles.containerDetails}>
      <BuildingDetails item={item}/>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    height:(Platform.OS==="ios" || Platform.OS==="android") ? 50 : 0,
  },
  containerHome: {
    flex:1,
  },
  containerDetails: {
    flex:1,
  },
});
