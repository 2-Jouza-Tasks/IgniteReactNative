import React, { FC } from "react";
import { StyleSheet, View, Text } from "react-native";

interface Props {
  title: string;
  icon: string;
}

const TemplateScreen: FC<Props> = ({ title, icon }) => {
  return (
    <View style={styles.container}>
      <Text>
        {title} - {icon}
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
    // borderColor: "green",
    // borderWidth: 2,
  },
});
