import React from 'react';
import { View,ScrollView, Text, Image, Animated } from 'react-native';

export default function Practice() {
    const courses = [
        { id: 1,name:'flashcard', image: require('@/assets/images/flashcard.png') },
        { id: 2,name:'Quiz', image: require('@/assets/images/quiz.png') },
        { id: 3, name:'Question & answer', image: require('@/assets/images/qa.png') },
        { id: 4, name:'Test', image: require('@/assets/images/flashcard.png') },
        { id: 5, name:'Exame', image: require('@/assets/images/flashcard.png') },
        { id: 6, name:'Solution', image: require('@/assets/images/flashcard.png') },
        { id: 7, name:'Home Work ', image: require('@/assets/images/flashcard.png') },
    ];

    return (
        <View>
        <Text style={{ fontSize: 22, fontWeight: 'bold', textAlign: 'start', marginTop: 20 }}>Practice</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 10 }}>
            {courses.map((course, index) => {
                const animatedValue = new Animated.Value(0);
                Animated.timing(animatedValue, {
                    toValue: 1,
                    duration: 1000 + index * 300,
                    useNativeDriver: false,
                }).start();
    
                return (
                    <Animated.View
                        key={course.id}
                        style={{
                            transform: [{ scale: animatedValue }],
                            backgroundColor: '#f3f4f6',
                            padding: 15,
                            borderRadius: 10,
                            marginRight: 15,
                            width: 100,
                            height: 100,
                            justifyContent: 'center',
                            alignItems: 'center',
                            elevation: 4,
                            shadowColor: 'white',
                            shadowOpacity: 0.2,
                            shadowOffset: { width: 0, height: 2 },
                            // shadowRadius: 4,
                        }}
                    >
                        <View style={{ position: 'relative', width: 96, height: 96 }}>
                            <Image source={course.image} style={{ width: 96, height: 96, borderRadius: 10 }} />
                            <Text 
                                style={{
                                    position: 'absolute',
                                    top: 10,
                                    marginLeft: 5,
                                    textAlign: 'left',
                                    fontWeight: 'bold',
                                    color: 'black',
                                    paddingVertical: 2,
                                    borderTopLeftRadius: 10,
                                    borderTopRightRadius: 10,
                                }}
                            >
                                {course.name}
                            </Text>
                        </View>
                    </Animated.View>
                );
            })}
        </ScrollView>
    </View>
    
    );
}