import React, { FC } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { User } from "../../services/question-services";

interface Props {
  user: User;
}

const Testing: FC<Props> = ({ user }) => {
  const staticIcons = [
    { title: "heart", count: 87 },
    { title: "commenting", count: 2 },
    { title: "bookmark", count: 203 },
    { title: "share", count: 17 },
  ];

  return (
    <View style={styles.iconContainer}>
      <View style={styles.iconView}>
        <Image source={{ uri: user.avatar }} style={styles.avatarIcon} />
      </View>

      {staticIcons.map(({ title, count }) => (
        <View style={styles.iconView}>
          <Icon key={title} name={title} size={30} color="white"></Icon>

          <Text style={styles.iconText}>{count}</Text>
        </View>
      ))}
    </View>
  );
};

export default Testing;

const styles = StyleSheet.create({
  iconContainer: {
    // flexDirection: "column",
    width: "20%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  iconView: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginVertical: 10,
  },

  avatarIcon: {
    width: 50,
    height: 50,
    borderRadius: 100,
    borderColor: "white",
    borderWidth: 2,
  },

  iconText: {
    color: "white",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
  },
});
