import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../component/screens/loginScreen/LoginScreen';
import BottomTabs from './ButtomTabs';
import Buying from '../component/screens/Properties/Buying';
import Rent from '../component/screens/Properties/Rent';
import Insights from '../component/screens/Properties/Insights';

export type RootStackParamList = {
  Login: undefined;
  BottomTabs: undefined;
  Buying: undefined;
  Rent: undefined;
  Insights: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen 
      name="Login" 
      component={LoginScreen} />
      <Stack.Screen
      name="BottomTabs" 
      component={BottomTabs} />
      <Stack.Screen 
      name="Buying" 
      component={Buying} 
      options={{
        headerShown: true,
        title: "",
        headerStyle: { backgroundColor: "#cf4040" },
        headerTintColor: "#fff",
      }}/>
      <Stack.Screen 
      name="Rent" 
      component={Rent}
      options={{
        headerShown: true,
        title: "",
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

    </Stack.Navigator>
  );
};

export default AppNavigator;
