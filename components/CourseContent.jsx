import React from 'react';
import { View, Text, FlatList, ScrollView } from 'react-native';
import RenderHTML from 'react-native-render-html';

const CourseContent = ({ message }) => {
  // console.log(aiChat?.courses);

  return (
    <ScrollView style={{ padding: 10 }}>
      <View>{message}</View>
    </ScrollView>
  );
};

export default CourseContent;
