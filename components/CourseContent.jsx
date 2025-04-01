import React from 'react';
import { View, Text, FlatList, ScrollView } from 'react-native';
import RenderHTML from 'react-native-render-html';

const CourseContent = ({ aiChat }) => {
  // console.log(aiChat?.courses);

  if (!aiChat || !aiChat.courses) {
    return <Text>Loading...</Text>;
  }

  const { courses } = aiChat;
  console.log("wht the hell");

  return (
    <ScrollView style={{ padding: 10 }}>
      {courses?.map((course, index) => (
        <View key={index} style={{ marginBottom: 20 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{course.courseTitle}</Text>
          <Text style={{ fontSize: 16, marginBottom: 10 }}>{course.description}</Text>

          <FlatList
            data={course.chapters}
            keyExtractor={(item, idx) => idx.toString()}
            renderItem={({ item }) => (
              <View style={{ marginBottom: 10 }}>
                <Text style={{ fontSize: 18, fontWeight: '600' }}>{item.chapterName}</Text>
                
                {item.content.map((contentItem, contentIndex) => (
                  <View key={contentIndex} style={{ marginTop: 5 }}>
                    <Text style={{ fontSize: 16, fontWeight: '500' }}>{contentItem.topic}</Text>
                    <RenderHTML source={{ html: `<p>${contentItem.explain}</p>` }} />
                  </View>
                ))}
              </View>
            )}
          />
        </View>
      ))}
    </ScrollView>
  );
};

export default CourseContent;
