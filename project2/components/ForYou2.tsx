import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { Question, getTheNextQuestion } from "../services/question-services";
import QuestionView from "./QuestionView/QuestionView ";

const InfiniteScrollComponent: React.FC = () => {
  const [data, setData] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMoreData, setHasMoreData] = useState(true);

  const loadMoreData = () => {
    if (!isLoading && hasMoreData) {
      setIsLoading(true);
      getTheNextQuestion()
        .then((newQuestion) => {
          // console.log("question: ", newQuestion);
          if (newQuestion.id) {
            setData([...data, newQuestion]);
          } else {
            setHasMoreData(false);
          }
        })
        .catch((err) => {
          console.log("ERR: ", err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  useEffect(() => {
    loadMoreData();
  }, []);

  const renderFooter = () => {
    return isLoading ? <ActivityIndicator size="large" color="blue" /> : null;
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item, index) => item.id.toString()}
        renderItem={({ item }) => <QuestionView question={item} />}
        onEndReached={loadMoreData}
        onEndReachedThreshold={0.1}
        ListFooterComponent={renderFooter()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default InfiniteScrollComponent;
