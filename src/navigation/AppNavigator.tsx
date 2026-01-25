import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../dashBoard/LoginScreen';
import BottomTabs from './BottomTabs';
import Buying from '../component/screens/Properties/Buying';
import Rent from '../component/screens/Properties/Rent';
import Insights from '../component/screens/Properties/Insights';
import EmiCalculator from '../component/screens/BudgetScreen/EmiCalculator';
import BudgetCalculator from '../component/screens/BudgetScreen/BudgetCalculator';
import CreateNewAcc from '../dashBoard/CreateNewAcc'
import OurActivity from '../component/ourActivity/OurActivity';
import DashBoad from '../dashBoard/DashBoard';
import PropðertyDetails from '../postproperty/PropertyDetails';
import UploadImage from '../postproperty/UploadImage';

export type RootStackParamList = {
  Login: undefined;
  BottomTabs: undefined;
  Buying: undefined;
  Rent: undefined;
  Insights: undefined;
  EmiCalculator: undefined;
  BudgetCalculator: undefined;
  CreateNewAcc: undefined
  OurActivity: undefined;
  DashBoard: undefined;
  PropertyDetails: undefined;
  UploadImage: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <Stack.Navigator
    >
      <Stack.Screen
      name="BottomTabs" 
      component={BottomTabs}
      options={{headerShown: false}} />

       <Stack.Screen 
      name="Login" 
      component={LoginScreen} 
       options={{headerShown: false}} />

      <Stack.Screen 
      name="DashBoard" 
      component={DashBoad} 
       options={{headerShown: false}} />
      
      <Stack.Screen 
      name="Buying" 
      component={Buying} 
      options={{
        headerShown: true,
        title: "Buying Properties",
        headerStyle: { backgroundColor: "#fb8e8e" },
        headerTintColor: "#fff",
        headerBackButtonDisplayMode: "generic",
        // headerBackTitle: ""
      }}/>

      <Stack.Screen 
      name="Rent" 
      component={Rent}
      options={{
        headerShown: true,
        title: "Rent Properties",
        headerStyle: { backgroundColor: "#fb8e8e" },
        headerTintColor: "#fff",
        headerBackButtonDisplayMode: "minimal",
      }}/>

      <Stack.Screen 
      name="Insights" 
      component={Insights}
      options={{headerShown: false}} />
      
      <Stack.Screen 
      name="EmiCalculator" 
      component={EmiCalculator}
      options={{headerShown: false}} />
      
      <Stack.Screen 
      name="BudgetCalculator" 
      component={BudgetCalculator}
      options={{headerShown: false}} />

      <Stack.Screen
        name="CreateNewAcc"
        component={CreateNewAcc}
      options={{headerShown: false}} />

      <Stack.Screen
        name="OurActivity"
        component={OurActivity}
        options={{headerShown: false}} />

      <Stack.Screen
        name="PropertyDetails"
        component={PropðertyDetails}
        options={{
          headerShown: true,
          title: "Property Details",
          headerStyle: { backgroundColor: "#fb8e8e" },
          headerTintColor: "#fff",
          headerBackButtonDisplayMode: "minimal",
          }} />

      <Stack.Screen
        name="UploadImage"
        component={UploadImage}
        options={{
          headerShown: true,
          title: "Upload Images",
          headerStyle: { backgroundColor: "#fb8e8e" },
          headerTintColor: "#fff",
          headerBackButtonDisplayMode: "minimal",
          }} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
