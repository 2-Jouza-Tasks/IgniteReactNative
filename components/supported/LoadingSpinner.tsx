import { View, ActivityIndicator, StyleSheet, Dimensions } from "react-native";

const Loader: React.FC = () => {
  return (
    <View style={styles.loader}>
      <ActivityIndicator size={200} color="blue" />
    </View>
  );
};

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    position: "absolute",
    right: 0,
    bottom: 0,
    top: 0,
    left: 0,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
}as const);

export default Loader;
