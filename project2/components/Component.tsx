import React, { FC } from 'react';

interface Props {
  name: string;
}

const Greeting: FC<Props> = ({ name }) => {
  return <Text>Hello, {name}!</Text>;
};