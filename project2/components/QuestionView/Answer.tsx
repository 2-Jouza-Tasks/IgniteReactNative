import React, { FC, useEffect } from "react";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";
import { Option } from "../../services/question-services";
import Icon from "react-native-vector-icons/FontAwesome";
import * as Animatable from "react-native-animatable";
import App from "../../App";

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

        itIsWhatTheUserSelected && !itIsTheCorrectAnswer && styles.wrong,
      ]}
    >
      {/* <FontAwesomeIcon icon="fa-duotone fa-thumbs-up" bounce /> */}

      <Text id={id} style={styles.optionText}>
        {id}. {answer}
      </Text>

      {didTheUserPressed && itIsWhatTheUserSelected && (
        <Animatable.View
          animation={itIsTheCorrectAnswer ? "flash" : "swing"}
          iterationCount="infinite"
          duration={1500}
          // direction="reverse"
          style={styles.animationContainer}
        >
          <Icon
            name={itIsTheCorrectAnswer ? "thumbs-up" : "thumbs-down"}
            size={24}
            color="white"
            style={styles.icon}
          />
        </Animatable.View>
      )}
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
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  optionText: {
    fontSize: 16,
  },
  animationContainer: {
    // backgroundColor: "lightgray",
    // width: 50,
    // borderRadius: 10,
    // padding: 10,
    // display: "inline",
  },
  icon: {
    paddingLeft: 50,
  },
  pressed: {
    // underlayColor: "white",
  },
  correct: {
    backgroundColor: "background: rgba(40, 177, 143, 0.7)",
  },
  wrong: {
    backgroundColor: "rgba(220, 95, 95, 0.7)",
  },

  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  primaryIcon: {
    position: "absolute",
  },
  secondaryIcon: {
    position: "absolute",
  },
});
