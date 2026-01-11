import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text, Linking, Alert, Pressable } from "react-native";

import HomeScreen from "../component/screens/homeScreen/HomeScreen";
import ProfileScreen from "../component/profile/LogOutProfilePage";

const Tab = createBottomTabNavigator();

const handleCall = () => {
  const phoneNumber = "tel:+918500900100"; // ✅ no spaces

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

      {/* CENTER CALL BUTTON */}
      <Tab.Screen
        name="Call"
        component={HomeScreen} 
        options={{
          tabBarButton: () => (
            <Pressable
              onPress={handleCall}
              style={{
                width: 65,
                height: 65,
                borderRadius: 50,
                backgroundColor: "#cf4040",
                justifyContent: "center",
                alignItems: "center",
                marginTop: -30,
                right: -30
              }}
            >
              <Text style={{ fontSize: 24, color: "#fff" }}>📞</Text>
            </Pressable>
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
