import React, { FC } from "react";
import { StyleSheet, View, Text } from "react-native";
import ForYou from "../components/ForYou";

const HomeScreen: FC<{}> = () => {
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
}as const);
