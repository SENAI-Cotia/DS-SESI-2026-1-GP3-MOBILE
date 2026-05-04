import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabLayout() {
    return (  
        <Tabs screenOptions={{
            headerShown: false,
            tabBarLabelStyle: {
                fontSize: 11,
                fontWeight: '700'
            },
            tabBarActiveTintColor: "#0400ff",
            tabBarInactiveTintColor: "#ffffff",
            tabBarStyle: {
                backgroundColor: "#2683ee",
                borderTopColor: "#00ff15",
                height: 70,
                paddingTop: 8,
                paddingBottom: 10
            }
        }}>
            <Tabs.Screen name="inicial" options={{title: "Inicial", tabBarIcon: ({color, size}) => (<Ionicons name="home" size={size} color={color}/>)}}/>
         
        </Tabs>
    )
}