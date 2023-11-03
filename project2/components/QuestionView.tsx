import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import Answer from "./QuestionViewComponents/Answer";
import Icons from "./QuestionViewComponents/Icons";
import User from "./QuestionViewComponents/User";
import {
  QuestionWithTheCorrectAnswer,
  getQuestionAnswer,
} from "../services/question-services";
import { IN_TESTING_MODE } from "../services/TestingModeVariables";

interface QuestionViewProps {
  index: number;
  question: QuestionWithTheCorrectAnswer;
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
        <View style={styles.contentView}>
          <Image source={{ uri: image }} style={styles.backgroundImage} />

          <View style={styles.contentContainer}>
            {/* Question */}
            <View style={styles.questionContainer}>
              <Text style={styles.questionText}>
                {IN_TESTING_MODE && `${id} - ${index + 1}. `}

                {question}
              </Text>
            </View>

            {/* Bottom (Option & User) */}
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

                  {/* User Details */}
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
          </View>
        </View>
      )}
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
    // height: "100%",

    ...testingModeStyle,
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
    resizeMode: "cover",
  },
  // Content
  contentContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 15,
  },

  // Question
  questionContainer: {
    // height: "100%",
    // flex: 1,

    alignContent: "center",
    justifyContent: "center",
    // marginBottom: 120,
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
    // height: "50%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },

  optionsContainer: {
    width: "85%",

    // marginBottom: 16,
    // height: "75%",
    // flex: 1,
  },
});

export default QuestionView;
