import React, { FC } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { User } from "../../services/question-services";

interface Props {
  user: User;
}

const Icons: FC<Props> = ({ user }) => {
  const staticIcons = [
    { title: "heart", count: 87 },
    { title: "commenting", count: 2 },
    { title: "bookmark", count: 203 },
    { title: "share", count: 17 },
  ];

  return (
    <View style={styles.iconContainer}>
      <View style={styles.iconView}>
        <Image source={{ uri: user.avatar }} style={styles.avatarIcon}></Image>

        <Icon
          style={styles.plusIcon}
          name="plus-circle"
          size={25}
          color="rgba(40, 177, 143, 1)"
        ></Icon>
      </View>

      {staticIcons.map(({ title, count }, index) => (
        <View style={styles.iconView}>
          <Icon
            key={`${index}.${title}`}
            name={title}
            size={30}
            color="white"
          />

          <Text style={styles.iconText}>{count}</Text>
        </View>
      ))}
    </View>
  );
};

export default Icons;

const styles = StyleSheet.create({
  iconContainer: {
    // flexDirection: "column",
    width: "10%",
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
  plusIcon: {
    top: 30,
    position: "absolute",
  },

  iconText: {
    color: "white",
  },
});
