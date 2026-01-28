import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DashBoad from "../dashBoard/DashBoard";
import CreateNewAcc from "../dashBoard/CreateNewAcc";

export type DashboardStackParamList = {
  DashBoard: undefined;
  CreateNewAcc: undefined;
};
const Stack = createNativeStackNavigator<DashboardStackParamList>();

export default function DashboardStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen 
            name="DashBoard" 
            component={DashBoad} 
            options={{headerShown: false}} />
            
            <Stack.Screen 
            name="CreateNewAcc" 
            component={CreateNewAcc} 
            options={{headerShown: false}} />
        </Stack.Navigator>
    )
}
