import React, { FC, useEffect } from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import { Option } from "../../services/question-services";

interface Props {
  option: Option;
  onPress: (id: string) => void;
  styleStatus: {
    didTheUserPressed: boolean;
    itIsTheCorrectAnswer: boolean;
    itIsWhatTheUserSelected: boolean;
  };
}

const Answer: FC<Props> = ({ option, onPress, styleStatus }) => {
  const { id, answer } = option;
  const { didTheUserPressed, itIsTheCorrectAnswer, itIsWhatTheUserSelected } =
    styleStatus;
  return (
    <TouchableOpacity
      onPress={() => {
        // !didTheUserPressed && onPress(id);
        onPress(id);
      }}
      key={id}
      style={[
        styles.option,
        didTheUserPressed && styles.pressed,

        didTheUserPressed && itIsTheCorrectAnswer && styles.correct,

        itIsWhatTheUserSelected &&
          (itIsTheCorrectAnswer ? styles.correct : styles.wrong),
      ]}
    >
      <Text id={id} style={styles.optionText}>
        {id}. {answer}
      </Text>
    </TouchableOpacity>
  );
};

export default Answer;

const styles = StyleSheet.create({
  option: {
    padding: 8,
    borderWidth: 1,
    borderColor: "rgba(255,255,255, 0)",
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

  pressed: {
    underlayColor: "white",
  },
  correct: {
    backgroundColor: "green",
  },
  wrong: {
    backgroundColor: "red",
  },
});
