import React from "react";
import { View, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FA5 from "react-native-vector-icons/FontAwesome5";
import HomeScreen from "./screens/HomeScreen";
import TemplateScreen from "./screens/TemplateScreen";

const Tab = createBottomTabNavigator();

const App = () => {
  const staticScreens = [
    { title: "Home", icon: "compass", component: HomeScreen },
    { title: "Discover", icon: "compass", component: TemplateScreen },
    { title: "Activity", icon: "stopwatch", component: TemplateScreen },
    { title: "Bookmarks", icon: "bookmark", component: TemplateScreen },
    { title: "Profile", icon: "user", component: TemplateScreen },
  ];

  const tabBarIconFunc = (
    focused: boolean,
    color: string,
    name: string,
    icon: string,
    size: number = 30
  ) => <FA5 name={icon} color={focused ? "white" : "gray"} size={size} />;

  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarActiveTintColor: "white",
            tabBarInactiveTintColor: "red",
          })}
        >
          <Tab.Screen
            name="Home"
            component={ForYou}
            options={{
              tabBarIcon: (focused) => tabBarIconFunc(),
            }}
          />
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
});
/*

   {staticScreens.map(({ title, icon }, index) => (
            <Tab.Screen
              name={title}
              key={`${index}.${title}`}
              options={{
                tabBarIcon: () => <FA5 name={icon} color={"red"} size={30} />,
                headerShown: false,
                tabBarActiveBackgroundColor: "black",
                tabBarActiveTintColor: "black",
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

          */
