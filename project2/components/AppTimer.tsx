import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import FA5 from "react-native-vector-icons/FontAwesome5";

const AppTimer: React.FC = () => {
  const [isActive, setIsActive] = useState<boolean>(true);
  const [duration, setDuration] = useState<number>(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;

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
      <FA5 name="stopwatch" size={24} color="time" />

      <Text style={styles.timerText}>
        {/* hours */}
        {/* {formatTime(Math.floor(duration / 3600))}: */}
        {/* Minutes: Seconds */}
        {formatTime(Math.floor((duration % 3600) / 60))}:
        {formatTime(duration % 60)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  timerView:{
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  timerText: {
    marginLeft: 5,
  },
});

export default AppTimer;
