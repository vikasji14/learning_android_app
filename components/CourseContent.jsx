
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const CourseContent = ({ jsonData }) => {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showAnswers, setShowAnswers] = useState({});
  const [flashcardVisibility, setFlashcardVisibility] = useState({});
  const [quizVisibility, setQuizVisibility] = useState({});
  const [qaVisibility, setQaVisibility] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false)
  const [report, setReport] = useState({});
  const optionLabels = ['A', 'B', 'C', 'D']; // Labels for options
  const handleAnswerSelect = (courseIndex, quizIndex, optionIndex, correctAnswer) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [`${courseIndex}-${quizIndex}`]: {
        selected: optionIndex,
        isCorrect: correctAnswer === jsonData.courses[courseIndex].quiz[quizIndex].options[optionIndex],
      },
    }));
  };

  const submitQuiz = () => {
    setQuizSubmitted(true);
    let correct = 0, incorrect = 0, totalQa = 0;

    jsonData.courses.forEach((course, courseIndex) => {
      totalQa += course.quiz?.length || 0;

      course.quiz?.forEach((question, questionIndex) => {
        const answerData = selectedAnswers[`${courseIndex}-${questionIndex}`];

        if (answerData) {  //Only count if the user has selected an answer
          if (answerData.isCorrect) {
            correct++; // Correct Answer Count
          } else {
            incorrect++; //Incorrect Answer Count
          }
        }
      });
    });

    setReport({ totalQa, correct, incorrect });
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
                  <Text style={styles.topic}>Chapter:{contentIndex + 1} ({content.topic})</Text>
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

          {quizVisibility[courseIndex] && (
            <>
              {course.quiz.map((quiz, quizIndex) => {
                const selectedOption = selectedAnswers[`${courseIndex}-${quizIndex}`]?.selected;
                return (
                  <View key={quizIndex} style={styles.quizContainer}>
                    <Text style={styles.quizQuestion}>{quiz.question}</Text>
                    {quiz.options.map((option, optionIndex) => {
                      const isSelected = selectedOption === optionIndex;
                      const isCorrect = quiz.correctAnswer === option;
                      const isDisabled = selectedOption !== undefined; // 🛑 Disable after selection

                      return (
                        <TouchableOpacity
                          key={optionIndex}
                          onPress={() => !isDisabled && handleAnswerSelect(courseIndex, quizIndex, optionIndex, quiz.correctAnswer)} // 🔒 Disable selection after first choice
                          style={[
                            styles.quizOption,
                            isSelected && (isCorrect ? styles.correctOption : styles.incorrectOption),
                            isDisabled && styles.disabledOption // Optional: Style for disabled state
                          ]}
                          disabled={isDisabled} // 🚫 Disable button
                        >
                          <Text>{optionLabels[optionIndex]}. {option}</Text>
                        </TouchableOpacity>
                      );
                    })}
                    {quizSubmitted && (
                      <Text style={styles.correctAnswer}>
                        Answer: {optionLabels[quiz.options.findIndex(option => option === quiz.correctAnswer)]}
                      </Text>
                    )}
                  </View>
                );
              })}

              {/* 🟢 **Submit Button (only visible when quiz is open)** */}
              <TouchableOpacity onPress={submitQuiz} style={styles.submitButton}>
                <Text style={styles.submitButtonText}>Final Submit</Text>
              </TouchableOpacity>

              {quizSubmitted && (
                <View style={{ alignItems: 'center', marginTop: 40 }}>
                  {/* Box Container */}
                  <View style={{ flexDirection: 'row', gap: 10 }}>
                    {/* Total Questions */}
                    <View style={{ backgroundColor: '#6c5ce7', padding: 10, borderRadius: 10, minWidth: 60, alignItems: 'center', position: 'relative' }}>
                      <Text style={{ fontWeight: 'bold', color: 'white' }}>{report.totalQa}</Text>
                      <Text style={{ position: 'absolute', top: -20, fontSize: 12, color: '#6c5ce7', fontWeight: 'bold' }}>Total</Text>
                    </View>

                    {/* Total Attempted */}
                    <View style={{ backgroundColor: '#fdcb6e', padding: 10, borderRadius: 10, minWidth: 60, alignItems: 'center', position: 'relative' }}>
                      <Text style={{ fontWeight: 'bold', color: 'black' }}>{report.correct + report.incorrect}</Text>
                      <Text style={{ position: 'absolute', top: -20, fontSize: 12, color: '#e17055', fontWeight: 'bold' }}>Attempted</Text>
                    </View>

                    {/* Correct Answers */}
                    <View style={{ backgroundColor: '#00b894', padding: 10, borderRadius: 10, minWidth: 60, alignItems: 'center', position: 'relative' }}>
                      <Text style={{ fontWeight: 'bold', color: 'white' }}>{report.correct}</Text>
                      <Text style={{ position: 'absolute', top: -20, fontSize: 12, color: '#00b894', fontWeight: 'bold' }}>Correct</Text>
                    </View>

                    {/* Incorrect Answers */}
                    <View style={{ backgroundColor: '#d63031', padding: 10, borderRadius: 10, minWidth: 60, alignItems: 'center', position: 'relative' }}>
                      <Text style={{ fontWeight: 'bold', color: 'white' }}>{report.incorrect}</Text>
                      <Text style={{ position: 'absolute', top: -20, fontSize: 12, color: '#d63031', fontWeight: 'bold' }}>Incorrect</Text>
                    </View>
                  </View>

                  {/* Pass/Fail/Good Circle */}
                  <View style={{
                    marginTop: 20,
                    width: 80,
                    height: 80,
                    borderRadius: 50,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor:
                      report.correct > 15 ? '#00b894' :
                        report.correct > 8 ? '#0984e3' : '#d63031'
                  }}>
                    <Text style={{ color: 'white', fontWeight: 'bold' }}>
                      {report.correct > 15 ? "Great!" :
                        report.correct > 8 ? "Pass" :
                          "Fail"}
                    </Text>
                  </View>
                </View>



              )}

            </>
          )}
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
  disabledOption: {
    opacity: 0.5, // Light grey effect
  },
  correctOption: {
    backgroundColor: 'green',
  },
  incorrectOption: {
    backgroundColor: 'red',
  },
  correctAnswer: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'blue',
    marginTop: 5,
  },

  submitButton: {
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 15,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  reportCard: {
    marginTop: 15,
    padding: 12,
    backgroundColor: '#f0f0f0',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  reportText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  container: {
    padding: 0,
    // backgroundColor: "#f5f5f5",
    paddingBottom: 80,
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
    padding: 2,
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
