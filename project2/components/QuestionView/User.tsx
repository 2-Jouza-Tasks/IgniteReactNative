import React, { FC } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";

interface Props {
  user: {
    name: string;
    avatar: string;
  };
  details: {
    description: string;
    playlist: string;
  };
}
const Answer: FC<Props> = ({ user, details: question }) => {
  return (
    <View style={styles.userDescriptionContainer}>
      <View style={styles.userInfoContainer}>
        <Text style={styles.userText}>{user.name}</Text>
      </View>
      <Text style={styles.descriptionText}>{question.description}</Text>
      <Text style={styles.playlistText}>
        Playlist - Unit - {question.playlist}
      </Text>
    </View>
  );
};

export default Answer;

const styles = StyleSheet.create({
  userDescriptionContainer: {},
  userInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
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
