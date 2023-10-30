import React, { FC, useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import QuestionView from "./QuestionView/QuestionView ";
import { getNextQuestion, Question } from "../services/question-services";

interface Props {
  // str: string;
}

const ForYou: FC<Props> = () => {
  const question1 = {
    type: "mcq",
    id: 5059,
    playlist: "Period 6: 1865-1898",
    description: "5.4 The Compromise of 1850 #apush",
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
  const [question, setQuestion] = useState({});

  useEffect(() => {
    getNextQuestion()
      .then((response) => {
        console.log("RESPONSE: ", response);
        console.log("DATA: ", response.data);
      })
      .catch((err) => {
        console.log("ERR: ", err);
      });
  });
  return (
    <View style={styles.container}>
      <Text>For You</Text>
      <QuestionView question={question} />
    </View>
  );
};

export default ForYou;

const styles = StyleSheet.create({
  container: {
    borderWidth: 3,
    borderColor: "red",
    borderRadius: 8,
  },
});
