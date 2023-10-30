import React from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";
import HomeScreen from "../screens/HomeScreen";
// ---------------
import { createStackNavigator } from "@react-navigation/stack";

import Testing from "../components/ZTemp";

const Stack = createStackNavigator();

function App() {
  const navigation = useNavigation();
  // Use the useNavigation hook to get the navigation object

  return (
    <View style={styles.container}>
      <Testing str="TIME => 2:25 PM"></Testing>

      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={() => <HomeScreen navigation={navigation} />}
          />
          {/* Define additional screens here */}
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
