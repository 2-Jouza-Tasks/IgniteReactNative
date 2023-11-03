import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
} from "react-native";
import {
  QuestionWithTheCorrectAnswer,
  getAmountOfDataV02,
} from "../services/question-services";
import { IN_TESTING_MODE } from "../services/TestingModeVariables";
import AppTimer from "./AppTimer";
import QuestionView from "./QuestionView";
import Icon from "react-native-vector-icons/FontAwesome";

const InfiniteScrollComponent: React.FC = () => {
  const [data, setData] = useState<QuestionWithTheCorrectAnswer[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const loadMoreData = () => {
    setIsLoading(true);
    getAmountOfDataV02()
      .then((newQuestions) => {
        setData([...data, ...newQuestions]);
      })
      .catch((err) => {
        setErrorMessage(err.message);
        throw Error(err.message);
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
          <Text style={styles.headerText}>
            {data.length} - {isLoading && "Loading..."}
          </Text>
        )}

        <Text style={styles.headerText}>For You</Text>

        <Icon name="search" size={24} color="white" />
      </View>

      {/* <View>HERE</View> */}
      {errorMessage ? (
        <Text>{errorMessage}</Text>
      ) : (
        <FlatList
          data={data}
          renderItem={({ item, index }) => (
            <QuestionView question={item} index={index} />
          )}
          keyExtractor={(item, i) => `${i}-${item.id}`}
          style={styles.flatList}
          // Rendering Data
          onEndReachedThreshold={0.5}
          onEndReached={loadMoreData}
          ListFooterComponent={renderLoading}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          // View
          showsVerticalScrollIndicator={false}
          snapToInterval={
            Dimensions.get("window").height - (IN_TESTING_MODE ? 60 : 50)
          }
          snapToAlignment="start"
          decelerationRate="normal"
        />
      )}
    </View>
  );
};

const testingModeStyle = IN_TESTING_MODE
  ? {
      borderWidth: 4,
      borderColor: "blue",
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
    paddingHorizontal: 15,
    // backgroundColor: "none",
    paddingVertical: 5,
    position: "absolute",
    top: 20,
    zIndex: 1,
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",

    width: "100%",
    justifyContent: "space-between",
    ...testingModeStyle,
  },

  headerText: {
    color: "white",
    fontWeight: "bold",

    borderBottomWidth: 5,
    borderColor: "white",
    alignSelf: "center",
    justifyContent: "center",
    marginRight: 30,
  },
  flatList: {
    flex: 1,
    // backgroundColor: "lightgray",
    ...testingModeStyle2,
  },
});

export default InfiniteScrollComponent;
