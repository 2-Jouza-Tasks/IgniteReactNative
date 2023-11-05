import React, { FC, useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import QuestionView from "./QuestionView2";
import {
  getTheNextQuestion,
  QuestionWithTheCorrectAnswer,
} from "../../services/question-services";

interface Props {
  // str: string;
}

const ForYou1: FC<Props> = () => {
  const question1 = {
    type: "mcq",
    id: 5059,
    playlist: "Period 6: 1865-1898",
    description: "5.4 The Compromise of 1850",
    image:
      "https://cross-platform-rwa.rp.devfactory.com/images/5059%20-%20Free%20Soil%20Party.png",
    question: "How did the Free Soil Party differ from abolitionists?",
    options: [
      {
        id: "A",
        answer:
          "They wanted to stop the spread of slavery, not end it entirely",
      },
      {
        id: "B",
        answer: "They wanted all free Black Americans to move west",
      },
      {
        id: "C",
        answer:
          'They wanted the western states to secede and form a "free" nation',
      },
    ],
    user: {
      name: "AP US History",
      avatar: "https://cross-platform-rwa.rp.devfactory.com/avatars/apush.png",
    },
  };

  const [question, setQuestion] = useState<QuestionWithTheCorrectAnswer>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    theNextQuestion();
  }, []);

  const theNextQuestion = () => {
    getTheNextQuestion()
      .then((question) => {
        // console.log("question: ", question);
        setQuestion(question);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log("ERR: ", err);
        setIsLoading(false);
      });
  };
  return (
    <View style={styles.container}>
      {isLoading || !question ? (
        <Text>Loading ...</Text>
      ) : (
        <QuestionView question={question} />
      )}

      <Text onPress={theNextQuestion}>Reload</Text>
    </View>
  );
};

export default ForYou1;

const styles = StyleSheet.create({
  container: {
    borderWidth: 3,
    borderColor: "red",
    borderRadius: 8,
  },
});
