import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text, Linking, Alert, Pressable } from "react-native";

import HomeScreen from "../component/screens/homeScreen/HomeScreen";
import ProfileScreen from "../component/profile/LogOutProfilePage";
import OurActivity from "../component/ourActivity/OurActivity";
import YoutubeVideo from "../component/videos/YoutubeVideo";
import { Image } from "react-native";
import PostProperty from "../postproperty/PostProperty";

const Tab = createBottomTabNavigator();

// const handleCall = () => {
//   const phoneNumber = "tel:+918500900100"; 

//   Linking.openURL(phoneNumber).catch(() => {
//     Alert.alert("Error", "Unable to open dialer");
//   });
// };

const BottomTabs = ({}) => {
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
          tabBarIcon: () => (
        <Image
          source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/b/b6/Home_icon_red-1.png" }}
          style={{ width: 26, height: 26 }}
          resizeMode="contain"
        />
      ),
        }}
      />

      <Tab.Screen
        name="YouTubeVideo"
        component={YoutubeVideo}
        options={{
          tabBarIcon: ({ color }) => (
            <Text style={{ color, fontSize: 22 }}>📷</Text>
          ),
        }}
      />

      {/* CENTER CALL BUTTON */}
      <Tab.Screen
  name="PostProperty"
  component={PostProperty}
  options={({ navigation }) => ({
    tabBarButton: () => (
      <Pressable
        onPress={() => navigation.navigate("PostProperty")}
        style={{
          width: 70,
          height: 70,
          borderRadius: 35,
          backgroundColor: "#cf4040",
          justifyContent: "center",
          alignItems: "center",
          marginTop: -30,
          borderWidth: 5,
          borderColor: "#fff",
        }}
      >
        <Text style={{ fontSize: 44, marginTop: -4, color: "#fff" }}>
          +
        </Text>
      </Pressable>
    ),
  })}
/>


      <Tab.Screen
        name="OurActivity"
        component={OurActivity}
        options={{
          tabBarIcon: ({ color }) => (
            <Text style={{ color, fontSize: 22 }}>💡</Text>
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
