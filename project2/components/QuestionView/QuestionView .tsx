import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import Answer from "./Answer";
import Icons from "./Icons";
import User from "./User";
import { Question } from "../../services/question-services";

interface QuestionViewProps {
  question: Question;
}


const checkTheAnswer=()=>{
  console.log('pressed')
}
const QuestionView: React.FC<QuestionViewProps> = ({ question: Q }) => {
  const { question, options, user, playlist, description, image } = Q;
  return (
    <View style={styles.container}>
      <Image source={{ uri: image }} style={styles.backgroundImage} />

      <View style={styles.contentContainer}>
        {/* Question */}
        <View style={styles.questionContainer}>
          <Text style={styles.overlayText}>{question}</Text>
        </View>

        {/* Options */}
        <View style={styles.optionsContainer}>
          {options.map((option) => (
            <Answer onPress={checkTheAnswer} key={option.id} option={option} />
          ))}
        </View>

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
    backgroundColor: "white",
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
