import React, { FC } from "react";
import { StyleSheet, View, Text } from "react-native";


const Testing: FC = () => {
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

