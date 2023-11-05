import React, { FC } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import {} from "../../services/question-services";

interface Props {
  user: UserDetails;
  description: string;
}
const User: FC<Props> = ({ user, description }) => {
  return (
    <View style={styles.userView}>
      <View style={styles.userInfoContainer}>
        <Text style={styles.userText}>{user.name}</Text>
      </View>
      <Text style={styles.descriptionText}>{description}</Text>
    </View>
  );
};

export default User;

const styles = StyleSheet.create({
  userView: {
    // flex: 1,
  },
  userInfoContainer: {},

  userText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  descriptionText: {
    color: "white",
    fontSize: 14,
  },
} as const);
