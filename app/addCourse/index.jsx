import React from 'react';
import { useState } from 'react';
import { View,Platform, Text,TouchableOpacity, TextInput, ScrollView, ActivityIndicator } from 'react-native';
import { initializeChatSession } from '../../app/config/AiModel';
import generatePrompt from '../../constants/prompt'; // Ensure correct import path
import generatePromptTopic from '../../constants/courseGenerate'; // Ensure correct import path
const Index = () => {
    const [loading, setLoading] = useState(false);
    const [courseGenerateLoading, setCourseGenerateLoading] = useState(false);
    const [userInput, setUserInput] = useState("");
    const [topicList, setTopicList] = useState();
    const [selectedTopics, setSelectedTopics] = useState([]);
    const [chatSession, setChatSession] = useState(null);
    // ✅ Initialize chat session once on mount
    React.useEffect(() => {
        const setupChat = async () => {
            const session = await initializeChatSession();
            setChatSession(session);
        };
        setupChat();
    }, []);

    const onGenerateTopic = async () => {
        if (!chatSession) {
            console.error("Chat session not initialized yet!");
            return;
        }

        setLoading(true);
        try {
            // 🔥 Combine the AI Prompt with User Input
            const fullPrompt = generatePrompt(userInput);
            const aiRes = await chatSession.sendMessage(fullPrompt);
            const responseText = aiRes.response?.candidates?.[0]?.content?.parts?.[0]?.text || "";
            // ✅ Remove square brackets and split lines
            const topicIdeas = responseText
                .replace(/[\[\]",]/g, "")  // Remove square brackets `[]`
                .split("\n")             // Split by new line
                .map(line => line.replace(/^topic_\d+:\s*/, "").trim()) // Remove "topic_X:" prefix

            // ✅ Convert into key-value format
            const formattedTopics = topicIdeas.map((topic, index) => `topic_${index + 1}: "${topic}"`).join(",\n");
            setTopicList(topicIdeas);
        } catch (error) {
            console.error("Error generating topics:", error);
        }
        setLoading(false);

        console.log("Generated Topics:", topicList);

    };

    const onGenerateCourse = async () => {

        if (!topicList) {
            console.error("Chat session not initialized yet!");
            return;
        }

        setCourseGenerateLoading(true);
        try {
            // 🔥 Combine the AI Prompt with User Input
            const fullPrompt = generatePromptTopic(selectedTopics);
            const aiRes = await chatSession.sendMessage(fullPrompt);
            const responseText = aiRes.response?.candidates?.[0]?.content?.parts?.[0]?.text || "";
            console.log("AI Response:", responseText);
        } catch (error) {
            console.error("Error generating topics:", error);
        }
        setCourseGenerateLoading(false);
    }

    const onSelectTopic = (topic) => {
        setSelectedTopics((prevSelectedTopics) => {
            if (prevSelectedTopics.includes(topic)) {
                return prevSelectedTopics.filter(t => t !== topic); // Remove if already selected
            } else {
                return [...prevSelectedTopics, topic]; // Add if not selected
            }
        });
    };
    
    const isTopicSelected = (topic) => {
        return selectedTopics.includes(topic);
    };
    
    return (
        <View  style={{padding:10, backgroundColor:'white', flex:1,  paddingTop: (Platform.OS === 'ios' || Platform.OS =='web') && 45, }}>
            <Text className="text-2xl font-bold">Create New Course</Text>
            <Text className="text-gray-500 text-2xl mt-4">
                What do you want to learn today?
            </Text>
            <Text className="mt-4 text-lg text-center">
                Enter a course name (e.g., Web Development, Data Science, Java)
            </Text>
            <TextInput
                onChangeText={setUserInput}
                multiline={true}
                numberOfLines={4}
                placeholder="e.g., Web Development, Data Science"
                className="w-full bg-gray-100 p-4 rounded-lg border border-gray-300 mt-4 focus:border-blue-500"
            />
            <Text
                type="outline"
                disabled={loading}
                className="w-full bg-blue-500 p-4 font-bold flex justify-center items-center text-white mt-4"
                onPress={onGenerateTopic}
                style={{ justifyContent: 'center', textAlign: 'center' }}
            >
                {loading ? <ActivityIndicator size="small" color="white" /> : "Search Topic"}
            </Text>
            <View className="mt-4">
                <Text>*** Select all topic which you want to add in the course</Text>
            </View>
           {
            loading ? (
                <View className="flex-1 justify-center items-center mt-4">
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            ) : (
                <View className="mt-4 bg-white  p-4 ">
                {topicList?.length > 0 && (
                <Text className="text-xl font-bold text-gray-800 mb-2">Topics</Text>
                )}

                <ScrollView className="max-h-60" style={{ maxHeight: 350 }}>    
                    {topicList?.slice(1, -1).map((item, index) => (
                      <TouchableOpacity 
                      key={index} 
                      className={`p-3 rounded-md mb-2 ${isTopicSelected(item) ? 'bg-blue-500' : 'bg-gray-100'}`} 
                      onPress={() => onSelectTopic(item)}
                  >
                      <Text className={`text-lg ${isTopicSelected(item) ? 'text-white' : 'text-gray-700'}`}>
                          {index + 1}. {item}
                      </Text>
                  </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
            )
           }

        {
            topicList?.length > 0 && (
                <View>
             <Text
                type="outline"
                disabled={loading}
                className="w-full bg-blue-500 p-4 font-bold flex justify-center items-center text-white mt-4"
                onPress={onGenerateCourse}
                style={{ justifyContent: 'center', textAlign: 'center' }}
            
            >
               {courseGenerateLoading ? <ActivityIndicator size="small" color="white" /> : "Generate Course"}
            </Text>
        </View>

            )
        }

        </View>
    );
};

export default Index;
