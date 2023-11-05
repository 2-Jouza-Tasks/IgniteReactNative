import React, { useState, useEffect, memo } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import {
  QuestionWithTheCorrectAnswer,
  getAmountOfDataV02,
} from "../services/question-services";
import {
  IN_TESTING_MODE,
  TESTING_MODE_STYLE,
} from "../testing/TestingModeVariables";
import AppTimer from "./supported/AppTimer";
import QuestionView, { QuestionViewProps } from "./QuestionView";
import Icon from "react-native-vector-icons/FontAwesome";
import Loader from "./supported/LoadingSpinner";

const areQuestionPropsEqual = (
  prevProps: QuestionViewProps,
  nextProps: QuestionViewProps
) => {
  const isThisPropsIsEqual =
    prevProps.questionKeyValue == nextProps.questionKeyValue;

  if (IN_TESTING_MODE && !isThisPropsIsEqual) {
    console.log(
      "QuestionView will Update: ",
      prevProps.questionKeyValue,
      nextProps.questionKeyValue
    );
  }

  return isThisPropsIsEqual;
};

const MemoQuestionView = memo(QuestionView, areQuestionPropsEqual);

const AMOUNT_OF_DATA_TO_GET = 20;

const ForYou: React.FC = () => {
  const [data, setData] = useState<QuestionWithTheCorrectAnswer[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const loadMoreData = () => {
    setIsLoading(true);

    getAmountOfDataV02(AMOUNT_OF_DATA_TO_GET)
      .then((newQuestions) => {
        setData([...data, ...newQuestions]);
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
      {/* Header */}
      <View
        style={[
          data.length == 0 && isLoading && styles.blackBackground,
          styles.header,
        ]}
      >
        <AppTimer />

        {IN_TESTING_MODE && (
          <View>
            <Text
              style={styles.headerText}
              onPress={() => {
                loadMoreData();
              }}
            >
              {data.length} - {isLoading && "Loading..."}
            </Text>
          </View>
        )}
        <Text style={styles.headerText}>For You</Text>

        <Icon name="search" size={24} color="white" />
      </View>

      {data.length == 0 && isLoading && <Loader />}

      {errorMessage ? (
        <Text>{errorMessage}</Text>
      ) : (
        <FlatList
          data={data}
          // Rendering Data
          keyExtractor={(item, i) => `${i + 1}.${item.id}`}
          renderItem={({ item, index }) => (
            <MemoQuestionView
              question={item}
              questionKeyValue={`${index + 1}.${item.id}`}
            />
          )}
          // Optimizing FlatList Configuration
          initialNumToRender={AMOUNT_OF_DATA_TO_GET}
          maxToRenderPerBatch={AMOUNT_OF_DATA_TO_GET}
          // on reach End
          onEndReachedThreshold={AMOUNT_OF_DATA_TO_GET}
          onEndReached={loadMoreData}
          // View
          showsVerticalScrollIndicator={false}
          ListFooterComponent={renderLoading}
          // Scroll
          snapToAlignment="end"
          decelerationRate="fast"
          disableIntervalMomentum={true}
          snapToInterval={Dimensions.get("window").height - 49}
        />
      )}
    </View>
  );
};

const testingModeStyle = TESTING_MODE_STYLE
  ? {
      borderWidth: 4,
      borderColor: "blue",
    }
  : {};

const testingModeStyle2 = TESTING_MODE_STYLE
  ? {
      borderWidth: 3,
      borderColor: "green",
      marginTop: 655,
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
    zIndex: 1,
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
    width: "100%",
    justifyContent: "space-between",
    top: 20,
    ...testingModeStyle2,
  },
  blackBackground: {
    backgroundColor: "black",
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
} as const);

export default ForYou;
