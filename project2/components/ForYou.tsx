import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { Question, getTheNextQuestion } from "../services/question-services";
import { IN_TESTING_MODE } from "../services/TestingModeVariables";
import AppTimer from "./AppTimer";
import QuestionView from "./QuestionView";
import Icon from "react-native-vector-icons/FontAwesome";

const InfiniteScrollComponent: React.FC = () => {
  const [data, setData] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const loadMoreData = () => {
    setIsLoading(true);
    getTheNextQuestion()
      .then((newQuestion) => {
        setData([...data, newQuestion]);
      })
      .catch((err) => {
        setErrorMessage(err.message);
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
      <View style={styles.header}>
        <AppTimer />

        {IN_TESTING_MODE && (
          <Text>
            {data.length} - {isLoading && "Loading..."}
          </Text>
        )}

        <Text>For You</Text>

        <Icon name="search" size={24} color="white" />
      </View>

      {errorMessage ? (
        <Text>{errorMessage}</Text>
      ) : (
        <FlatList
          data={data}
          renderItem={({ item, index }) => (
            <QuestionView question={item} index={index} />
          )}
          keyExtractor={(item, index) => item.id.toString()}
          style={styles.flatList}
          onEndReachedThreshold={0.1}
          onEndReached={loadMoreData}
          ListFooterComponent={renderLoading()}
        />
      )}
    </View>
  );
};

const testingModeStyle = IN_TESTING_MODE
  ? {
      borderWidth: 4,
      borderColor: "blue",
      marginBottom: 30,
    }
  : {};

const testingModeStyle2 = IN_TESTING_MODE
  ? {
      borderWidth: 3,
      borderColor: "green",
    }
  : {};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...testingModeStyle,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
  },

  flatList: {
    flex: 1,
    // backgroundColor: "lightgray",
    ...testingModeStyle2,
  },
});

export default InfiniteScrollComponent;
