import React, { useState } from "react";
import { View, Text, Image, StyleSheet, Dimensions } from "react-native";
import Options from "./QuestionViewComponents/Options";
import Icons from "./QuestionViewComponents/Icons";
import Icon from "react-native-vector-icons/FontAwesome";

import User from "./QuestionViewComponents/User";
import { QuestionWithTheCorrectAnswer } from "../services/question-services";
import { IN_TESTING_MODE } from "../testing/TestingModeVariables";

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
            {IN_TESTING_MODE && `${index + 1}.${id}- \n`}

            {question}
          </Text>
        </View>

        {/* Bottom (Option & User) */}
        <View style={styles.bottomContainer}>
          <View style={styles.optionsContainer}>
            {options.map((option, index) => (
              <Options
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
      <View style={styles.playlistViewMain}>
        <View style={styles.playlistView}>
          <Icon name="play-circle" size={25} color="white"></Icon>
          <Text style={styles.playlistText}>Playlist - Unit#: {playlist}</Text>
        </View>
        <Icon name="chevron-right" size={25} color="white"></Icon>
      </View>
      {/* End of Content Container */}
    </View>
  );
};
const testingModeStyle = IN_TESTING_MODE
  ? {
      borderColor: "red",
      borderWidth: 2,
    }
  : {};

const testingModeStyle2 = IN_TESTING_MODE
  ? {
      borderColor: "yellow",
      borderWidth: 2,
    }
  : {};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: Dimensions.get("window").height - (IN_TESTING_MODE ? 60 : 49),
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
    justifyContent: "space-between",
    paddingVertical: 15,
    paddingHorizontal: 15,
    ...testingModeStyle,
  },

  // Question
  questionContainer: {
    justifyContent: "center",
    flexGrow: 3,
    ...testingModeStyle2,
    width: "95%",
  },
  questionText: {
    lineHeight: 30,
    fontSize: 22,
    color: "white",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    padding: 12,
    borderRadius: 10,
    textAlign: "left",
    fontWeight: "500",
  },

  // Bottom
  bottomContainer: {
    flexDirection: "row",
    alignContent: "flex-end",
    alignItems: "flex-end",
    flexGrow: 1,
  },

  optionsContainer: {
    width: "85%",
    paddingRight: 5,
    rowGap: 10,
  },

  playlistViewMain: {
    paddingVertical: 10,
    backgroundColor: "rgba(22, 22, 22, 1)",
    paddingHorizontal: 10,
    alignSelf: "stretch",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  playlistView: {
    flexDirection: "row",
    columnGap: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  playlistText: {
    color: "white",
    fontSize: 14,
    fontWeight: "500",
    alignItems: "flex-start",
  },
} as const);

export default QuestionView;
