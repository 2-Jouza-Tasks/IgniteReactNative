import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

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
      <Text style={styles.playlistText}>{question.playlist}</Text>
      <Text style={styles.descriptionText}>{question.description}</Text>
      <Image source={{ uri: question.image }} style={styles.image} />
      <Text style={styles.questionText}>{question.question}</Text>
      <View style={styles.optionsContainer}>
        {question.options.map((option) => (
          <TouchableOpacity key={option.id} style={styles.option}>
            <Text style={styles.optionText}>{option.answer}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text style={styles.userText}>Question by: {question.user.name}</Text>
      <Image source={{ uri: question.user.avatar }} style={styles.avatar} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  playlistText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  descriptionText: {
    fontSize: 14,
    color: "gray",
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    marginBottom: 10,
  },
  questionText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  optionsContainer: {
    marginTop: 10,
  },
  option: {
    padding: 8,
    borderWidth: 1,
    borderColor: "lightgray",
    borderRadius: 8,
    marginBottom: 8,
  },
  optionText: {
    fontSize: 16,
  },
  userText: {
    marginTop: 20,
    fontSize: 14,
    color: "gray",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginTop: 10,
  },
});

export default QuestionView;
