import React, { FC } from "react";
import { StyleSheet, View, Text } from "react-native";

interface Props {
  // str: string;
}

const ForYou: FC<Props> = () => {
  return (
    <View>
      <Text style={styles.container}>FFF</Text>
    </View>
  );
};

export default ForYou;

const styles = StyleSheet.create({
  container: {
    fontWeight: "bold",
  },
});
