import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import Answer from "./Answer";
import Icons from "./Icons";
import User from "./User";

interface Question {
  type: string;
  id: number;
  playlist: string;
  description: string;
  image: string;
  question: string;
  options: Option[];
  user: User;
}

interface Option {
  id: string;
  answer: string;
}

interface User {
  name: string;
  avatar: string;
}

interface QuestionViewProps {
  question: Question;
}

const QuestionView: React.FC<QuestionViewProps> = ({ question }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: question.image }} style={styles.backgroundImage} />
      <View style={styles.contentContainer}>
        <View style={styles.questionContainer}>
          <Text style={styles.overlayText}>{question.question}</Text>
        </View>

        <View style={styles.optionsContainer}>
          {question.options.map((option) => (
            <Answer key={option.id} option={option} />
          ))}
        </View>

        <User
          user={question.user}
          details={{
            playlist: question.playlist,
            description: question.description,
          }}
        ></User>
      </View>

      <Icons user={question.user}></Icons>
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
