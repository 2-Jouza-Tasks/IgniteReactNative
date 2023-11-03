import React, { FC } from "react";
import { StyleSheet, View, Text } from "react-native";
import ForYou from "../components/ForYou";
import { IN_TESTING_MODE } from "../services/TestingModeVariables";

const HomeScreen: FC<> = () => {
  return (
    <View style={styles.container}>
      <ForYou />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
