import React, { FC } from "react";
import { StyleSheet, View, Text } from "react-native";

const TemplateScreen: FC<{}> = (props) => {
  return (
    <View style={styles.container}>
      <Text>
        {props.title} - {props.icon}
      </Text>
    </View>
  );
};

export default TemplateScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "green",
    borderWidth: 2,
  },
});
