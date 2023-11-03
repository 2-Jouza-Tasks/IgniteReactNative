import React, { useState } from "react";
import { View, Text, Image, StyleSheet, Dimensions } from "react-native";
import Answer from "./QuestionViewComponents/Answer";
import Icons from "./QuestionViewComponents/Icons";
import User from "./QuestionViewComponents/User";
import { QuestionWithTheCorrectAnswer } from "../services/question-services";
import { IN_TESTING_MODE } from "../services/TestingModeVariables";

interface QuestionViewProps {
  index: number;
  question: QuestionWithTheCorrectAnswer;
}

const QuestionView: React.FC<QuestionViewProps> = ({ question: Q, index }) => {
  const {
    id,
    question,
    options,
    user,
    playlist,
    description,
    image,
    correct_option_id,
  } = Q;

  const [userPressed, setUserPressed] = useState<boolean>(false);
  const [userAnswer, setUserAnswer] = useState<string>("");

  const handlePress = (optionId: string) => {
    setUserPressed(true);
    setUserAnswer(optionId);
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentView}>
        <Image
          resizeMode="cover"
          source={{ uri: image }}
          style={styles.backgroundImage}
        />

        {/* Stat of Content Container */}
        <View style={styles.contentContainer}>
          {/* Question */}
          <View style={styles.questionContainer}>
            <Text style={styles.questionText}>
              {IN_TESTING_MODE && `${index}.${id}-`}

              {question}
            </Text>
          </View>

          {/* Bottom (Option & User) */}
          <View style={styles.bottomContainer}>
            <View style={styles.optionsContainer}>
              {options.map((option, index) => (
                <Answer
                  onPress={handlePress}
                  key={`${index}.${id}`}
                  option={option}
                  styleStatus={{
                    didTheUserPressed: userPressed,
                    itIsTheCorrectAnswer: option.id == correct_option_id,
                    itIsWhatTheUserSelected: option.id == userAnswer,
                  }}
                />
              ))}

              <User
                user={user}
                playlist={playlist}
                description={description}
              ></User>
            </View>
            {/* User Details */}

            {/* Icons */}
            <Icons user={user}></Icons>
          </View>
        </View>
        {/* End of Content Container */}
      </View>
    </View>
  );
};
const testingModeStyle = IN_TESTING_MODE
  ? {
      borderColor: "red",
      borderWidth: 2,
    }
  : {};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: Dimensions.get("window").height, // Full screen height
    // height: "100%",
  },

  contentView: {
    flex: 1,
  },
  backgroundImage: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  // Content
  contentContainer: {
    flex: 1,
    display: "flex",
    justifyContent: "space-between",
    paddingVertical: 15,
    ...testingModeStyle,
  },

  // Question
  questionContainer: {
    // flex: 1,
    // marginBottom: 120,
    justifyContent: "flex-start",
    paddingHorizontal: 15,
  },
  questionText: {
    lineHeight: 26,
    fontSize: 22,
    color: "white",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    padding: 12,
    borderRadius: 10,
    textAlign: "left",
    fontWeight: "bold",
  },

  // Bottom
  bottomContainer: {
    display: "flex",
    flexDirection: "row",
    // justifyContent: "space-between",
    alignContent: "flex-end",
    alignItems: "flex-end",
    // alignSelf: "flex-end",
    // justifyContent: "flex-end",
  },

  optionsContainer: {
    width: "85%",
    paddingLeft: 15,
    paddingRight: 5,
  },
});

export default QuestionView;
