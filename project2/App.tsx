import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/FontAwesome5";

import HomeScreen from "./screens/HomeScreen";
import TemplateScreen from "./screens/TemplateScreen";

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
      <View style={styles.container}>
        {/* <Testing str="TIME => 2:25 PM"></Testing> */}
        <Tab.Navigator>
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{
              tabBarIcon: () => <Icon name="home" color={"gray"} size={30} />,
            }}
          />
          {staticScreens.map(({ title, icon }) => (
            <Tab.Screen
              name={title}
              component={() => <TemplateScreen title={title} icon={icon} />}
              options={{
                tabBarIcon: () => (
                  <Icon name={icon} color={"black"} size={30} />
                ),
              }}
            />
          ))}
        </Tab.Navigator>
      </View>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
  },
});
