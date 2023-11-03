import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import Answer from "../../components/QuestionViewComponents/Answer";
import Icons from "../../components/QuestionViewComponents/Icons";
import User from "../../components/QuestionViewComponents/User";
import {
  QuestionWithTheCorrectAnswer,
  getQuestionAnswer,
} from "../../services/question-services";
import Icon from "react-native-vector-icons/FontAwesome";
import TimeTrackingApp from "../../components/QuestionViewComponents/TimeTracking";
import { IN_TESTING_MODE } from "../../services/TestingModeVariables";

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

  const item = {
    id: "1",
    user: "user1",
    videoUrl: "https://www.example.com/video1.mp4",
    caption: "Awesome video!",
    likes: 1000,
    comments: 50,
  };
  return (
    <View style={styles.videoCard}>
      {/* Video Player */}
      <Image source={{ uri: image }} style={styles.backgroundImage} />

      {/* User Profile Information */}
      <View style={styles.userInfo}>
        <Image
          source={{ uri: "user_profile_image_url" }}
          style={styles.userAvatar}
        />
        <Text style={styles.username}>{item.user}</Text>
      </View>

      {/* Engagement Icons (Likes, Comments, Share) */}
      <View style={styles.engagementIcons}>
        <TouchableOpacity style={styles.icon}>
          {/* Heart icon for liking */}
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon}>
          {/* Comment icon for commenting */}
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon}>
          {/* Share icon for sharing */}
        </TouchableOpacity>
      </View>

      {/* Video Caption */}
      <Text style={styles.caption}>{item.caption}</Text>

      {/* Likes and Comments Count */}
      <Text style={styles.likesCount}>{item.likes} likes</Text>
      <Text style={styles.commentsCount}>{item.comments} comments</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    resizeMode: "cover",
  },
  container: {
    flex: 1,

    // borderBottomWidth: 1,
    // borderColor: "lightgray",
    // margin:5,
    // padding: 16,
    borderColor: "blue",
    borderWidth: 2,
  },
  videoCard: {
    margin: 10,
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  username: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
  engagementIcons: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  icon: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  caption: {
    padding: 10,
    fontSize: 16,
  },
  likesCount: {
    paddingLeft: 10,
    fontWeight: "bold",
  },
  commentsCount: {
    paddingLeft: 10,
  },
});

export default QuestionView;
