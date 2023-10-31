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
import { IN_TESTING_MODE } from "../services/TestingModeVariables";
import AppTimer from "./AppTimer";

const InfiniteScrollComponent: React.FC = () => {
  const [data, setData] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadMoreData = () => {
    setIsLoading(true);
    // console.log("Load more");
    getTheNextQuestion()
      .then((newQuestion) => {
        // console.log("question: ", newQuestion);
        setData([...data, newQuestion]);
      })
      .catch((err) => {
        console.log("ERR: ", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    loadMoreData();
  }, []);

  const renderLoading = () => {
    return isLoading ? <ActivityIndicator size="large" color="blue" /> : null;
  };

  return (
    <View style={styles.container}>
      <AppTimer />
      {IN_TESTING_MODE && (
        <Text>
          {data.length} - {isLoading && "Loading..."}{" "}
        </Text>
      )}

      <FlatList
        data={data}
        keyExtractor={(item, index) => item.id.toString()}
        renderItem={({ item, index }) => (
          <QuestionView question={item} index={index} />
        )}
        initialNumToRender={10}
        onEndReachedThreshold={10}
        onEndReached={loadMoreData}
        ListFooterComponent={renderLoading()}
        style={styles.flatList}
        // Initially render only one item
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 3,
    borderColor: "red",
    marginBottom: IN_TESTING_MODE ? 30 : 0,
  },
  flatList: {
    backgroundColor: 'lightgray',
    borderWidth: 3,
    borderColor: "green",
  },
});

export default InfiniteScrollComponent;
