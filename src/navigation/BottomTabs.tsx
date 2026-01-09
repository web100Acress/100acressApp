import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text, Linking, Alert } from "react-native";

import HomeScreen from "../component/screens/homeScreen/HomeScreen";
import ProfileScreen from "../component/profile/LogOutProfilePage";
import PlusButton from "./PlusButton";

const Tab = createBottomTabNavigator();

const handleCall = () => {
  const phoneNumber = "tel:+91 8500900100"; 

  Linking.openURL(phoneNumber).catch(() => {
    Alert.alert("Error", "Unable to open dialer");
  });
};

const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 65,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Text style={{ color, fontSize: 22 }}>🏠</Text>
          ),
        }}
      />

      {/* CENTER PLUS BUTTON */}
      <Tab.Screen
        name="Call"
        component={HomeScreen} // dummy, won’t be used
        options={{
          tabBarIcon: () => (
            <Text style={{ fontSize: 20 }}>📞</Text>
          ),
          tabBarButton: (props) => (
            <PlusButton
              {...props}
              onPress={handleCall}
            />
          ),
        }}
      />


      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Text style={{ color, fontSize: 22 }}>👤</Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabs;
