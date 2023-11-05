import React from "react";
import { View, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FA5 from "react-native-vector-icons/FontAwesome5";

import TemplateScreen from "./screens/TemplateScreen";
import ForYou from "./components/ForYou";

const Tab = createBottomTabNavigator();

const App = () => {
  const staticScreens = [
    { title: "Discover", icon: "compass" },
    { title: "Activity", icon: "stopwatch" },
    { title: "Bookmarks", icon: "bookmark" },
    { title: "Profile", icon: "user" },
  ];

  const createTabIcon = (focused: boolean, icon: string) => (
    <FA5 name={icon} color={focused ? "white" : "gray"} size={30} />
  );

  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarActiveBackgroundColor: "black",
            tabBarInactiveBackgroundColor: "black",
            tabBarActiveTintColor: "white",
            tabBarInactiveTintColor: "gray",
          })}
        >
          <Tab.Screen
            name="Home"
            component={ForYou}
            options={{
              tabBarIcon: ({ focused }) => createTabIcon(focused, "home"),
            }}
          />

          {staticScreens.map(({ title, icon }, index) => (
            <Tab.Screen
              name={title}
              key={`${index}.${title}`}
              options={{
                tabBarIcon: ({ focused }) => createTabIcon(focused, icon),
              }}
            >
              {() => (
                <TemplateScreen
                  key={`${index}.${title}`}
                  title={title}
                  icon={icon}
                />
              )}
            </Tab.Screen>
          ))}
        </Tab.Navigator>
      </NavigationContainer>
    </View>
  );
};

export default App;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
} as const);
