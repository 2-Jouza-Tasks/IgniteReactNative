import React, { FC } from "react";
import { StyleSheet, View, Text } from "react-native";
import ForYou from "../components/ForYou";
import ForYou2 from "../components/ForYou2";
import { IN_TESTING_MODE } from "../services/TestingModeVariables";

const HomeScreen: FC = () => {
  return (
    <View style={styles.container}>
      {/* {IN_TESTING_MODE && <Text> Home Screen</Text>} */}
      {/* <ForYou /> */}
      <ForYou2 />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
  },
});
