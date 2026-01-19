import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text, Linking, Alert, Pressable } from "react-native";

import HomeScreen from "../component/screens/homeScreen/HomeScreen";
import ProfileScreen from "../dashBoard/DashBoard";
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
          source={{ uri: "data:image/jpeg;base64,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" }}
          style={{ width: 30, height: 26 }}
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
            source={{uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtFWN3L-D3mp7ZCiKcSjb3eCiedbqeBpkjzQ&s"}}
            style={{width: 26, height: 26,}}
            />
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
            <Image
            source={require("../public/assets/icon/image.png")}
            style={{width: 40, height: 40}}
            />
          ),
        }}
      />

        <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Image
            source={{uri: "https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA0L3BmLWljb240LWppcjIwNjQtcG9yLWwtam9iNzg4LnBuZw.png"}}
            style={{width: 26, height: 26}}/>
          ),
        }}
      />


    </Tab.Navigator>
  );
};

export default BottomTabs;
