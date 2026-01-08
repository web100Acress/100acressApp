import React from 'react';
import { ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
// import MainTabs from './src/navigation/BottomTabs';
// import LogOutProfilePage from './src/component/profile/LogOutProfilePage';


export default function App() {
  return (
    <NavigationContainer>

      <AppNavigator />
    </NavigationContainer>
    // <ScrollView>

    //   <LogOutProfilePage />
    // </ScrollView>
  );
}
