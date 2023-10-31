import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import Answer from "./QuestionViewComponents/Answer";
import Icons from "./QuestionViewComponents/Icons";
import User from "./QuestionViewComponents/User";
import { Question, getQuestionAnswer } from "../services/question-services";
import { IN_TESTING_MODE } from "../services/TestingModeVariables";

interface QuestionViewProps {
  index: number;
  question: Question;
}

const QuestionView: React.FC<QuestionViewProps> = ({ question: Q, index }) => {
  const { id, question, options, user, playlist, description, image } = Q;

  const [correctOption, setCorrectOption] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userPressed, setUserPressed] = useState<boolean>(false);
  const [userAnswer, setUserAnswer] = useState<string>("");

  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    setIsLoading(true);

    getQuestionAnswer(id)
      .then((answer) => {
        setCorrectOption(answer.correct_options[0].id);
      })
      .catch((err) => {
        setErrorMessage(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const handlePress = (optionId: string) => {
    setUserPressed(true);
    setUserAnswer(optionId);
  };

  return (
    <View style={styles.container}>
      {errorMessage ? (
        <Text>{errorMessage}</Text>
      ) : (
        <View>
          <Image source={{ uri: image }} style={styles.backgroundImage} />

          {IN_TESTING_MODE && (
            <Text>
              {id} - {index + 1}
            </Text>
          )}

          <View style={styles.contentContainer}>
            {/* Question */}
            <View style={styles.questionContainer}>
              <Text style={styles.questionText}>{question}</Text>
            </View>

            {/* Options */}

            <View style={styles.bottomContainer}>
              {isLoading ? (
                <Text>Loading ...</Text>
              ) : (
                <View style={styles.optionsContainer}>
                  {options.map((option) => (
                    <Answer
                      onPress={handlePress}
                      key={option.id}
                      option={option}
                      styleStatus={{
                        didTheUserPressed: userPressed,
                        // try to move it to handle press function
                        itIsTheCorrectAnswer: option.id == correctOption,
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
              )}

              {/* Icons */}
              <Icons user={user}></Icons>
            </View>

            {/* User Details */}
          </View>
        </View>
      )}
    </View>
  );
};
const testingModeStyle = IN_TESTING_MODE
  ? {
      borderColor: "blue",
      borderWidth: 2,
    }
  : {};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",

    ...testingModeStyle,
  },
  backgroundImage: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    resizeMode: "cover",
  },
  // Content
  contentContainer: {
    flex: 1,
    padding: 16,

    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },

  // Question
  questionContainer: {
    // marginBottom: 16,
    height: "50%",
    alignContent: "center",
    justifyContent: "center",
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
    height: "50%",
    alignContent: "center",
    justifyContent: "space-between",
    display: "flex",
    flexDirection: "row",
  },

  optionsContainer: {
    // marginBottom: 16,
    width: "75%",
  },

  overlayText: {
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    fontWeight: "bold",

    // position: "absolute",
    // backgroundColor: "rgba(0, 0, 0, 0.5)",
    // padding: 8,
    // fontSize: 16,
  },
});

export default QuestionView;
