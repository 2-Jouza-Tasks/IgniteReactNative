import React, { FC } from "react";
import { StyleSheet, View, Text } from "react-native";

interface Props {
  str: string;
}

const Testing: FC<Props> = ({ str }) => {
  return (
    <View>
      <Text style={styles.container}>TESTING: {str}!</Text>
    </View>
  );
};

export default Testing;

const styles = StyleSheet.create({
  container: {
    fontWeight: "bold",
  },
});

