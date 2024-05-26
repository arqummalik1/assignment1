import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import HomeScreen from './src/screens/HomeScreen';
import PropertyDetailsScreen from './src/screens/PropertyDetailsScreen';
import BuildingScreen from './src/screens/BuildingsScreen';
import * as Icon from "react-native-feather";
import SubjectPropertyScreen from './src/screens/SubjectPropertyScreen';

const Stack = createNativeStackNavigator();
const Tab = createMaterialTopTabNavigator();

function PropertyDetailsTabs() {
  return (
    <Tab.Navigator
    screenOptions={{
      tabBarActiveTintColor: "white",
      tabBarInactiveTintColor: "grey",
      tabBarLabelStyle:{fontWeight:"400",fontSize:12},
      tabBarStyle:{height:80},
      headerTitleAlign: 'center',
      tabBarIndicatorStyle:{ backgroundColor: 'grey', height: '100%' },
      
      
    }}>
      <Tab.Screen name="Property Data" component={PropertyDetailsScreen} 
      options={{
        headerShown:false,
        tabBarLabel: 'Property Data',
        tabBarIcon: ({ color, size ,focused}) => (
          <Icon.Home  stroke={focused ? "white" : "grey"} width={20} height = {20} />
        ),
      }}/>
      <Tab.Screen name="Subject Property" component={SubjectPropertyScreen} 
      options={{
        headerShown:false,
        tabBarLabel: 'Subject Property',
        tabBarIcon: ({ color, size ,focused}) => (
          <Icon.File  stroke={focused ? "white" : "grey"} width={20} height = {20} />
        ),
      }}/> 
      <Tab.Screen name="Site Info" component={PropertyDetailsScreen} 
      options={{
        headerShown:false,
        tabBarLabel: 'Site Info',
        tabBarIcon: ({ color, size ,focused}) => (
          <Icon.Map  stroke={focused ? "white" : "grey"} width={20} height = {20} />
        ),
      }}/> 
      <Tab.Screen name="Buildings" component={BuildingScreen} 
      options={{
        headerShown:false,
        tabBarLabel: 'Buildings',
        tabBarIcon: ({ color, size ,focused}) => (
          <Icon.Server  stroke={focused ? "white" : "grey"} width={20} height = {20} />
        ),
      }}/> 
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} 
         options={{
          headerStyle: {
            backgroundColor: "#00314e", 
          },
          headerTintColor: "#04ced1", 
        }}/>
        <Stack.Screen name="Property Details" component={PropertyDetailsTabs} 
         options={{
          headerStyle: {
            backgroundColor: "#00314e", 
          },
          headerTintColor: "#04ced1", 
        }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
