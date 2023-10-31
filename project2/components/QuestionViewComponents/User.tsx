import React, { FC } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { User } from "../../services/question-services";

interface Props {
  user: User;
  description: string;
  playlist: string;
}
const Answer: FC<Props> = ({ user, description, playlist }) => {
  return (
    <View style={styles.userView}>
      <View style={styles.userInfoContainer}>
        <Text style={styles.userText}>{user.name}</Text>
      </View>
      <Text style={styles.descriptionText}>{description}</Text>
      <Text style={styles.playlistText}>Playlist - Unit - {playlist}</Text>
    </View>
  );
};

export default Answer;

const styles = StyleSheet.create({
  userView: {
    // flex: 1,
  },
  userInfoContainer: {
    // flex: 1,
    // flexDirection: "row",
    // alignItems: "center",
    // marginBottom: 8,
  },

  userText: {
    fontSize: 16,
    color: "white",
  },
  descriptionText: {
    color: "white",
    fontSize: 14,
  },
  playlistText: {
    color: "white",
    fontSize: 12,
  },
});
