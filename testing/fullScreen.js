import React from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';

const data = [
  { id: '1', text: 'Item 1' },
  { id: '2', text: 'Item 2' },
  { id: '3', text: 'Item 3' },
  // Add more items as needed
];

const renderItem = ({ item }) => {
  return (
    <View style={styles.item}>
      <Text>{item.text}</Text>
    </View>
  );
};

const MyFlatList = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.flatList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ensure the container takes up the entire screen height
  },
  flatList: {
    flex: 1, // Allow the FlatList to take up the entire vertical space
  },
  item: {
    backgroundColor: 'white',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
});

export default MyFlatList;

/* 

 <Tab.Screen
          name="SSS"
          component={fullScreen}
          options={{
            tabBarIcon: () => <FA5 name="home" color={"gray"} size={30} />,
          }}
        />
*/