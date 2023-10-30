import React, { FC } from "react";
import { Text } from "react-native";

interface Props {
  name: string;
}

const Home: FC<Props> = ({ name }) => {
  return <Text>Testing {name}!</Text>;
};


export default Home