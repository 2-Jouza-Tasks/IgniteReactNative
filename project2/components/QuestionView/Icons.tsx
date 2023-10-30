import React, { FC } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { User } from "../../services/question-services";

interface Props {
  user: User
}

const Testing: FC<Props> = ({ user }) => {
  return (
    <View style={styles.iconContainer}>
      <View style={styles.iconGroup}>
        <View style={styles.avatarIconContainer}>
          <Image source={{ uri: user.avatar }} style={styles.avatarIcon} />
        </View>
        <Icon name="heart" size={24} color="white" style={styles.icon} />
        <Icon name="commenting" size={24} color="white" style={styles.icon} />
        <Icon name="bookmark" size={24} color="white" style={styles.icon} />
        <Icon name="share" size={24} color="white" style={styles.icon} />
      </View>
    </View>
  );
};

export default Testing;

const styles = StyleSheet.create({
  iconContainer: {
    position: "absolute",
    bottom: 16,
    right: 16,
    flexDirection: "column",
  },
  avatarIconContainer: {
    alignItems: "center",
    marginBottom: 8,
  },
  avatarIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  iconGroup: {
    alignItems: "center",
  },
  icon: {
    marginVertical: 8,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
  },
});
