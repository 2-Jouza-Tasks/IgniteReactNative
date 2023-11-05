import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  Pressable,
  FlatList,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import {
  QuestionWithTheCorrectAnswer,
  getAmountOfDataV02,
} from "../services/question-services";
import { IN_TESTING_MODE, LESS_DATA } from "../testing/TestingModeVariables";
import AppTimer from "./supported/AppTimer";
import QuestionView from "./QuestionView";
import Icon from "react-native-vector-icons/FontAwesome";
import Loader from "./supported/LoadingSpinner";

interface MemoProps {
  question: QuestionWithTheCorrectAnswer;
  index: string;
}
const MemoizedItemComponent = React.memo(QuestionView);
// const MemoizedItemComponent = React.memo<MemoProps>(
//   ({ question, index }):<QuestionView> => {
//     console.log("question  rendered");
//     return <QuestionView/>
//     );
//   },
//   (prevProps, nextProps) => {
//     if (prevProps.userDetails.name === nextProps.userDetails.name) {
//       return true; // props are equal
//     }
//     return false; // props are not equal -> update the component
//   }
// );

const AMOUNT_OF_DATA_TO_GET = LESS_DATA ? 2 : 20;

const ForYou: React.FC = () => {
  const [data, setData] = useState<QuestionWithTheCorrectAnswer[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const flatListRef = useRef(FlatList);

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
            <Text style={styles.headerText}>
              {data.length} - {isLoading && "Loading..."}
              {/* {console.log("DATA: ", data.map((e) => e.id).join("|"))} */}
            </Text>
            <Text
              onPress={() => {
                loadMoreData();
              }}
            >
              END
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
          keyExtractor={(item, i) => `${i}-${item.id}`}
          renderItem={({ item, index }) => (
            <MemoizedItemComponent question={item} index={index} />
          )}
          // onEndReachedThreshold={AMOUNT_OF_DATA_TO_GET * 0.8}
          onEndReachedThreshold={data.length}
          onEndReached={loadMoreData}
          // View
          showsVerticalScrollIndicator={false}
          ListFooterComponent={renderLoading}
          // Scroll
          snapToAlignment="end"
          decelerationRate="fast"
          disableIntervalMomentum={true}
          snapToInterval={
            Dimensions.get("window").height - (IN_TESTING_MODE ? 60 : 49)
          }
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
