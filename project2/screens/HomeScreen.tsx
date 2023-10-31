import React from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import ForYou from "../components/ForYou";

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      {/* <Text> Home Screen</Text> */}
      <ForYou />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // justifyContent: "center",
    alignItems: "center",
  },
});
