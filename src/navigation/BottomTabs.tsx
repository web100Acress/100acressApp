import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text, Linking, Alert, Pressable } from "react-native";

import HomeScreen from "../component/screens/homeScreen/HomeScreen";
import DashBoard from "../dashBoard/DashBoard";
import OurActivity from "../component/ourActivity/OurActivity";
import YoutubeVideo from "../component/videos/YouTubeVideo";
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
          source={require("../public/assets/icon/HomeIcon.png")}
          style={{ width: 35, height: 35 }}
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
            <Image
            source={require("../public/assets/icon/PlayIcon.png")}
            style={{width: 35, height: 35,}}
            />
          ),
        }}
      />

      {/* CENTER CALL BUTTON */}
      <Tab.Screen
      name="PostProperty"
      component={PostProperty}
      options={({ navigation }) => ({
        headerShown: true,
          title: "Post Property",
          headerStyle: { backgroundColor: "#fb8e8e" },
          headerTintColor: "#fff",
          headerBackButtonDisplayMode: "minimal",
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
            <Image
            source={require("../public/assets/icon/BuildingIcon.png")}
            style={{width: 35, height: 35}}
            />
          ),
          headerShown: true,
        title: "Our Activity",
        headerStyle: { backgroundColor: "#cf4040" },
        headerTintColor: "#fff",
        }}
      />

        <Tab.Screen
        name="DashBoard"
        component={DashBoard}
        options={{
          tabBarIcon: ({ color }) => (
            <Image
            source={require("../public/assets/icon/ProfileIcon.png")}
            style={{width: 35, height: 35}}/>
          ),
        }}
      />


    </Tab.Navigator>
  );
};

export default BottomTabs;
