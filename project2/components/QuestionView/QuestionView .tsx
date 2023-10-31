import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import Answer from "./Answer";
import Icons from "./Icons";
import User from "./User";
import { Question, getQuestionAnswer } from "../../services/question-services";
import Icon from "react-native-vector-icons/FontAwesome";
import TimeTrackingApp from "./TimeTracking";
import { IN_TESTING_MODE } from "../../services/TestingModeVariables";

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

  useEffect(() => {
    setIsLoading(true);

    getQuestionAnswer(id)
      .then((answer) => {
        console.log("ANSWER: ", answer);
        setCorrectOption(answer.correct_options[0].id);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log("ERR: ", err);
        setIsLoading(false);
      });
  }, []);

  const handlePress = (optionId: string) => {
    const userPressedOnTheCorrectOption = optionId == correctOption;

    setUserPressed(true);
    setUserAnswer(optionId);
    console.log("pressed", optionId, correctOption);
    // console.log("pressed", userPressedOnTheCorrectOption);
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: image }} style={styles.backgroundImage} />

      {IN_TESTING_MODE && (
        <Text>
          {id} - {index + 1}
        </Text>
      )}

      <View style={styles.contentContainer}>
        <View style={styles.header}>
          {/* <TimeTrackingApp /> */}

          <Icon name="search" size={24} color="white" />
        </View>

        {/* Question */}
        <View style={styles.questionContainer}>
          <Text style={styles.overlayText}>{question}</Text>
        </View>

        {/* Options */}
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
          </View>
        )}

        {/* User Details */}
        <User user={user} playlist={playlist} description={description}></User>
      </View>

      {/* Icons */}
      <Icons user={user}></Icons>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // borderBottomWidth: 1,
    // borderColor: "lightgray",
    // margin:5,
    // padding: 16,
    borderColor: "blue",
    borderWidth: 2,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  backgroundImage: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    resizeMode: "cover",
  },
  contentContainer: {
    flex: 1,
    padding: 16,
    justifyContent: "space-between",
  },
  overlayText: {
    position: "absolute",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    color: "white",
    padding: 8,
    fontSize: 16,
    fontWeight: "bold",
  },
  questionContainer: {
    marginBottom: 16,
  },
  questionText: {
    fontSize: 20,
    fontWeight: "bold",
  },

  optionsContainer: {
    marginBottom: 16,
  },
});

export default QuestionView;
