import React, { FC } from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";

interface Props {
  option: {
    id: string;
    answer: string;
  };
}

const Answer: FC<Props> = ({ option }) => {
  return (
    <TouchableOpacity key={option.id} style={styles.option}>
      <Text id={option.id} style={styles.optionText}>
        {option.id}. {option.answer}
      </Text>
    </TouchableOpacity>
  );
};

export default Answer;

const styles = StyleSheet.create({
  option: {
    padding: 8,
    borderWidth: 1,
    borderColor: "rgba(255,255,255, 0.5)",
    borderRadius: 8,
    marginBottom: 8,
    position: "relative",
    backgroundColor: "rgba(255,255,255, 0.5)",
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  optionText: {
    fontSize: 16,
  },
});
