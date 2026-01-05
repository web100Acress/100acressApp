import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import LoginScreen from "./src/component/screens/loginScreen/LoginScreen";
import HomeScreen from "./src/component/screens/homeScreen/HomeScreen";

const App: React.FC = () => {
  return (
    <SafeAreaProvider>
      {/* <LoginScreen /> */}
      <HomeScreen />
    </SafeAreaProvider>
  );
};

export default App;



