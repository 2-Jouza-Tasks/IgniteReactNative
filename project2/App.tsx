import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/FontAwesome5";

import HomeScreen from "./screens/HomeScreen";
import TemplateScreen from "./screens/TemplateScreen";
import { CURRENT_TIME, IN_TESTING_MODE } from "./services/TestingModeVariables";
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
      {/* {IN_TESTING_MODE && <Text>{CURRENT_TIME}</Text>} */}
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={ForYou}
          options={{
            tabBarIcon: () => <Icon name="home" color={"gray"} size={30} />,
          }}
        />

        {staticScreens.map(({ title, icon }) => (
          <Tab.Screen
            name={title}
            key={title}
            options={{
              tabBarIcon: () => <Icon name={icon} color={"gray"} size={30} />,
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
