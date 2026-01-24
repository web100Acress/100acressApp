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
      component={LoginScreen} />
      
      <Stack.Screen 
      name="Buying" 
      component={Buying} 
      options={{
        headerShown: true,
        title: "Buying Properties",
        headerStyle: { backgroundColor: "#cf4040" },
        headerTintColor: "#fff",
      }}/>

      <Stack.Screen 
      name="Rent" 
      component={Rent}
      options={{
        headerShown: true,
        title: "Rents",
        headerStyle: { backgroundColor: "#cf4040" },
        headerTintColor: "#fff",
      }} />

      <Stack.Screen 
      name="Insights" 
      component={Insights}
      options={{
        headerShown: true,
        title: "",
        headerStyle: { backgroundColor: "#cf4040" },
        headerTintColor: "#fff",
      }}/>
      
      <Stack.Screen 
      name="EmiCalculator" 
      component={EmiCalculator}
      options={{
        headerShown: true,
        title: "Calculate EMI",
        headerStyle: { backgroundColor: "#cf4040" },
        headerTintColor: "#fff",
      }}/>
      
      <Stack.Screen 
      name="BudgetCalculator" 
      component={BudgetCalculator}
      options={{
        headerShown: true,
        title: "Home Loan Guide",
        headerStyle: { backgroundColor: "#cf4040" },
        headerTintColor: "#fff",
      }}/>

      <Stack.Screen
        name="CreateNewAcc"
        component={CreateNewAcc}
      />

      <Stack.Screen
        name="OurActivity"
        component={OurActivity}
        options={{
        headerShown: true,
        title: "Home Loan Guide",
        headerStyle: { backgroundColor: "#cf4040" },
        headerTintColor: "#fff",
      }}
      />

    </Stack.Navigator>
  );
};

export default AppNavigator;
