import React from "react";
import { StyleSheet, Text, View } from "react-native";
import HomeScreen from "./screens/HomeScreen";
// ---------------

import Testing from "./components/ZTemp";

const App = () => {
  return (
    <View style={styles.container}>
      {/* <Testing str="TIME => 2:25 PM"></Testing> */}
      <HomeScreen></HomeScreen>
    </View>
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
