import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import FA5 from "react-native-vector-icons/FontAwesome5";

const AppTimer: React.FC = () => {
  const [isActive, setIsActive] = useState<boolean>(true);
  const [duration, setDuration] = useState<number>(0);

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;

    if (isActive) {
      timer = setInterval(() => {
        setDuration((prevDuration) => prevDuration + 1);
      }, 1000);
    } else {
      clearInterval(timer);
    }

    return () => {
      clearInterval(timer);
    };
  }, [isActive]);

  const formatTime = (time: number) => {
    return time.toString().padStart(2, "0");
  };

  return (
    <View style={styles.timerView}>
      <FA5 name="stopwatch" size={24} color="white" />

      <Text style={styles.timerText}>
        {formatTime(Math.floor((duration % 3600) / 60))}:
        {formatTime(duration % 60)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  timerView: {
    flexDirection: "row",
    alignItems: "center",
  },
  timerText: {
    marginLeft: 5,
    color: "white",
    fontWeight: "bold",
  },
} as const);

export default AppTimer;
