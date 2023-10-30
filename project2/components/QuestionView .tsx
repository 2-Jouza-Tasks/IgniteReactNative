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
      <Image source={{ uri: question.image }} style={styles.backgroundImage} />
      <View style={styles.contentContainer}>
        <View style={styles.questionContainer}>
          <Text style={styles.questionText}>{question.question}</Text>
        </View>
        <View style={styles.optionsContainer}>
          {question.options.map((option) => (
            <TouchableOpacity key={option.id} style={styles.option}>
              <Text style={styles.optionText}>{option.answer}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.userDescriptionContainer}>
          <View style={styles.userInfoContainer}>
            <Image source={{ uri: question.user.avatar }} style={styles.avatar} />
            <Text style={styles.userText}>{question.user.name}</Text>
          </View>
          <Text style={styles.descriptionText}>{question.description}</Text>
          <Text style={styles.playlistText}>{question.playlist}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    resizeMode: 'cover',
  },
  contentContainer: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
  },
  questionContainer: {
    marginBottom: 16,
  },
  questionText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  optionsContainer: {
    marginBottom: 16,
  },
  option: {
    padding: 8,
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 8,
    marginBottom: 8,
  },
  optionText: {
    fontSize: 16,
  },
  userDescriptionContainer: {},
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
  },
  userText: {
    fontSize: 14,
    color: 'gray',
  },
  descriptionText: {
    fontSize: 14,
    color: 'gray',
  },
  playlistText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default QuestionView;