import React, { FC, useEffect } from "react";
import { StyleSheet, Pressable, Text, View } from "react-native";
import { Option } from "../../services/question-services";
import Icon from "react-native-vector-icons/FontAwesome";
import * as Animatable from "react-native-animatable";
import { IN_TESTING_MODE } from "../../testing/TestingModeVariables";

interface StyleStatus {
  didTheUserPressed: boolean;
  itIsTheCorrectAnswer: boolean;
  itIsWhatTheUserSelected: boolean;
}
interface Props {
  option: Option;
  onPress: (id: string) => void;
  styleStatus: StyleStatus;
}

const Options: FC<Props> = ({ option, onPress, styleStatus }) => {
  const { id, answer } = option;
  const { didTheUserPressed, itIsTheCorrectAnswer, itIsWhatTheUserSelected } =
    styleStatus;

  return (
    <Pressable
      onPress={() => {
        onPress(id);
      }}
      style={[
        styles.option,
        didTheUserPressed && itIsTheCorrectAnswer && styles.correct,
        itIsWhatTheUserSelected && !itIsTheCorrectAnswer && styles.wrong,
      ]}
    >
      <Text id={id} style={styles.optionText}>
        {IN_TESTING_MODE && id + ". "}
        {answer}
      </Text>

      <Text>
        <Animatable.View
          animation={itIsTheCorrectAnswer ? "flash" : "swing"}
          iterationCount="infinite"
          duration={1000}
        >
          {didTheUserPressed && itIsWhatTheUserSelected && (
            <Icon
              name={itIsTheCorrectAnswer ? "thumbs-up" : "thumbs-down"}
              size={30}
              color="white"
              style={styles.icon}
            />
          )}
        </Animatable.View>
      </Text>
    </Pressable>
  );
};

export default Options;

const styles = StyleSheet.create({
  option: {
    // width: "100%",
    // padding: 8,
    borderRadius: 10,
    backgroundColor: "rgba(255,255,255, 0.5)",

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  correct: {
    backgroundColor: "rgba(40, 177, 143, 0.7)",
    borderColor: "rgba(40, 177, 143, 0.7)",
  },

  wrong: {
    backgroundColor: "rgba(220, 95, 95, 0.7)",
    borderColor: "rgba(220, 95, 95, 0.7)",
  },

  optionText: {
    fontSize: 17,
    lineHeight: 21,
    fontWeight: "500",
    width: "85%",
    color: "black",
    paddingVertical: 4,

    // textShadowColor: "black",
    // textShadowOffset: { width: 2, height: 1 },
  },
  icon: {},
} as const);
