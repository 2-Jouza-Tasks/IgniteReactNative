import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const TimeTrackingApp: React.FC = () => {
  const [timeSpent, setTimeSpent] = useState<number>(0);
  const [isTracking, setIsTracking] = useState<boolean>(false);

  useEffect(() => {
    const timeId = setInterval(() => {
      setTimeSpent((prevTime) => prevTime + 1);
    }, 1000);

    // Start the timer when the component mounts
    setIsTracking(true);

    // Stop the timer when the component unmounts
    return () => {
      setIsTracking(false);
      clearInterval(timeId);
    };
  }, []);

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.timeText}>{formatTime(timeSpent)}</Text>
      {/* <Button
        title={isTracking ? "Stop Tracking" : "Start Tracking"}
        onPress={isTracking ? stopTimer : startTimer}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // justifyContent: "center",
    // alignItems: "left",
  },
  timeText: {
    fontSize: 16,
  },
});

export default TimeTrackingApp;
