import React, { FC } from "react";
import { StyleSheet, Text } from "react-native";

interface Props {
  str: string;
}

const Testing: FC<Props> = ({ str }) => {
  return <Text style={styles.container}>TESTING: {str}!</Text>;
};

export default Testing;

const styles = StyleSheet.create({
  container: {
    fontWeight: "bold",
  },
});
