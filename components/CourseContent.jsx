
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet,ScrollView } from 'react-native';

const CourseContent = ({ jsonData }) => {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showAnswers, setShowAnswers] = useState({});
  const [flashcardVisibility, setFlashcardVisibility] = useState({});
  const [quizVisibility, setQuizVisibility] = useState({});
  const [qaVisibility, setQaVisibility] = useState({});
  
  const handleAnswerSelect = (courseIndex, quizIndex, optionIndex, correctAnswer) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [`${courseIndex}-${quizIndex}`]: optionIndex,
    }));
  };

  const toggleAnswerVisibility = (courseIndex, quizIndex) => {
    setShowAnswers(prev => ({
      ...prev,
      [`${courseIndex}-${quizIndex}`]: !prev[`${courseIndex}-${quizIndex}`],
    }));
  };

  const toggleFlashcard = (index) => {
    setFlashcardVisibility((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const toggleQuizSection = (courseIndex) => {
    setQuizVisibility(prev => ({
      ...prev,
      [courseIndex]: !prev[courseIndex],
    }));
  };
  const toggleQa = (courseIndex) => {
    setQaVisibility((prev) => ({
      ...prev,
      [courseIndex]: !prev[courseIndex],
    }));
  };


  return (
    <View style={styles.container}>
      {jsonData.courses.map((course, courseIndex) => (
        <View key={courseIndex} style={styles.courseContainer}>
          <Text style={styles.courseTitle}>{course.courseTitle}</Text>
          <Text style={styles.description}>{course.description}</Text>
            {/* <Text style={styles.sectionTitle}>Chapters:</Text> */}
            {course.chapters.map((chapter, chapIndex) => (
            <View key={chapIndex} style={styles.chapterContainer}>
              <Text style={styles.chapterTitle}>{chapter.chapterName}</Text>
              {chapter.content.map((content, contentIndex) => (
                <View key={contentIndex} style={styles.contentContainer}>
                  <Text style={styles.topic}>Chapter:{contentIndex + 1} ({ content.topic })</Text>
                  <Text style={styles.text}>{content.explain}</Text>
                  {content.code && (
                    <Text style={[styles.code, styles.text]}>{content.code}</Text>
                  )}
                  {content.example && <Text style={styles.example}>Exapmle: {content.example}</Text>}
                </View>
              ))}
            </View>
          ))}
          {/* Quiz Section */}
          <TouchableOpacity onPress={() => toggleQuizSection(courseIndex)} style={styles.flashcardToggle}>
            <Text style={styles.sectionTitle}>Quiz {quizVisibility[courseIndex] ? '-' : '+'}</Text>
          </TouchableOpacity>
          {quizVisibility[courseIndex] && course.quiz.map((quiz, quizIndex) => (
            <View key={quizIndex} style={styles.quizContainer}>
              <Text style={styles.quizQuestion}>{quiz.question}</Text>
              {quiz.options.map((option, optionIndex) => {
                const isSelected = selectedAnswers[`${courseIndex}-${quizIndex}`] === optionIndex;
                const isCorrect = option === quiz.correctAnswer;
                return (
                  <TouchableOpacity
                    key={optionIndex}
                    onPress={() => handleAnswerSelect(courseIndex, quizIndex, optionIndex, quiz.correctAnswer)}
                    style={[styles.quizOption, isSelected && { backgroundColor: isCorrect ? 'green' : 'red' }]}>
                    <Text>{optionIndex + 1}. {option}</Text>
                  </TouchableOpacity>
                );
              })}
              <TouchableOpacity onPress={() => toggleAnswerVisibility(courseIndex, quizIndex)}>
                <Text style={styles.showAnswerBtn}>Show Answer</Text>
              </TouchableOpacity>
              {showAnswers[`${courseIndex}-${quizIndex}`] && (
                <Text style={styles.correctAnswer}>Answer: {quiz.correctAnswer}</Text>
              )}
            </View>
          ))}

          {/* Flashcards */}
          <TouchableOpacity onPress={() => toggleFlashcard(courseIndex)} style={styles.flashcardToggle}>
            <Text style={styles.sectionTitle}>📖 Flashcards {flashcardVisibility[courseIndex] ? '-' : '+'}</Text>
          </TouchableOpacity>
          
          {flashcardVisibility[courseIndex] && (
            <View style={styles.flashcardWrapper}>
              <ScrollView style={styles.flashcardScroll} nestedScrollEnabled={true}>
                {course.flashcard.map((flash, flashIndex) => (
                  <View key={flashIndex} style={styles.flashcardContainer}>
                    <Text style={styles.flashFront}>{flash.front}</Text>
                    <Text style={styles.flashBack}>{flash.back}</Text>
                  </View>
                ))}
              </ScrollView>
            </View>
          )}


         {/* Q&A Section */}
         <TouchableOpacity onPress={() => toggleQa(courseIndex)} style={styles.qaToggle}>
            <Text style={styles.sectionTitle}>Question & Answer {qaVisibility[courseIndex] ? '-' : '+'}</Text>
          </TouchableOpacity>
          {qaVisibility[courseIndex] && (
            <ScrollView style={styles.qaScroll} nestedScrollEnabled={true}>
              {course.qa.map((qa, qaIndex) => (
                <View key={qaIndex} style={styles.qaContainer}>
                  <Text style={styles.qaQuestion}>Q. {qa.question}</Text>
                  <Text style={styles.qaAnswer}>Ans: {qa.answer}</Text>
                </View>
              ))}
            </ScrollView>
          )}

        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 0,
    // backgroundColor: "#f5f5f5",
    paddingBottom:80,
  },
      chapterContainer: {
        padding: 6,
        backgroundColor: "#e3f2fd",
        borderRadius: 5,
        marginBottom: 10,
      },
      chapterTitle: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
      },
      contentContainer: {
        marginTop: 5,
      },
      topic: {
        fontSize: 16,
        padding:2,
        fontWeight: "bold",
        color: "#444",
      },
      text: {
        fontSize: 14,
        color: "#555",
      },
      code: {
        backgroundColor: "#333",
        color: "white",
        padding: 5,
        borderRadius: 5,
        marginTop: 5,
        fontFamily: "monospace",
      },
      example: {
        fontSize: 14,
        fontStyle: "italic",
        color: "blue",
        marginTop: 5,
      },
  courseContainer: {
    backgroundColor: "white",
    padding: 4,
    borderRadius: 10,
    marginBottom: 20,
  },
  courseTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#222",
  },
  description: {
    fontSize: 14,
    color: "#555",
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#007bff",
    textAlign: "center",
    margin: 6,
  },
  quizContainer: {
    padding: 10,
    backgroundColor: "#fef4e5",
    borderRadius: 5,
    marginBottom: 10,
  },
  quizQuestion: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  quizOption: {
    fontSize: 14,
    color: "#555",
    padding: 10,
    marginVertical: 4,
    borderRadius: 5,
    backgroundColor: "#ddd",
  },
  showAnswerBtn: {
    fontSize: 14,
    color: "blue",
    marginTop: 5,
  },
  correctAnswer: {
    fontSize: 14,
    fontWeight: "bold",
    color: "green",
    marginTop: 5,
  },
 flashcardToggle: {
    backgroundColor: '#e3f2fd',
    padding: 6,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  flashcardWrapper: {
    marginTop: 10,
  },
  flashcardContainer: {
    backgroundColor: '#fffbe6',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ffecb3',
  },
  flashFront: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  flashBack: {
    fontSize: 16,
    color: '#666',
    marginTop: 6,
  },
  flashcardScroll: {
    maxHeight: 400,
  },
    qaContainer: {
    padding: 10,
    backgroundColor: "#dcedc8",
    borderRadius: 5,
    marginBottom: 10,
  },


   qaToggle: {
    backgroundColor: '#d1f7c4',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  qaWrapper: {
    marginTop: 10,
  },
  qaScroll: {
    maxHeight: 500,
  },
  qaQuestion: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  qaAnswer: {
    fontSize: 16,
    color: '#666',
    marginTop: 6,
  },
  
});

export default CourseContent;
