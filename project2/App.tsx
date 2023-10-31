import React from "react";
import { StyleSheet, Text, View } from "react-native";
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

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={ForYou}
          options={{
            tabBarIcon: () => <FA5 name="home" color={"gray"} size={30} />,
          }}
        />

        {staticScreens.map(({ title, icon }) => (
          <Tab.Screen
            name={title}
            key={title}
            options={{
              tabBarIcon: () => <FA5 name={icon} color={"gray"} size={30} />,
            }}
          >
            {() => <TemplateScreen title={title} icon={icon} />}
          </Tab.Screen>
        ))}
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
