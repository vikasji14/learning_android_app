import React from 'react';
import { View, Text, Image, ScrollView, Animated } from 'react-native';

export default function Courses() {
    const courses = [
        { id: 1, title: 'React Native Basics', description: 'Learn the fundamentals of React Native.', chapters: 12, image: require('@/assets/images/banner1.png') },
        { id: 2, title: 'Advanced JavaScript', description: 'Master ES6+ features and beyond.', chapters: 18, image: require('@/assets/images/banner2.png') },
        { id: 3, title: 'UI/UX Design Principles', description: 'Enhance user experience with design basics.', chapters: 10, image: require('@/assets/images/banner3.png') },
        { id: 4, title: 'UI/UX Design Principles', description: 'Enhance user experience with design basics.', chapters: 10, image: require('@/assets/images/banner4.png') },
        { id: 5, title: 'UI/UX Design Principles', description: 'Enhance user experience with design basics.', chapters: 10, image: require('@/assets/images/banner5.png') },
        { id: 6, title: 'UI/UX Design Principles', description: 'Enhance user experience with design basics.', chapters: 10, image: require('@/assets/images/banner6.png') },
        { id: 7, title: 'UI/UX Design Principles', description: 'Enhance user experience with design basics.', chapters: 10, image: require('@/assets/images/banner2.png') },
    ];

    return (
        <View>
            <Text style={{ fontSize: 22, fontWeight: 'bold', textAlign: 'start', marginTop: 20 }}>Your Courses</Text>
            {courses.length > 0 ? (
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
                                    padding: 5,
                                    borderRadius: 10,
                                    marginRight: 15,
                                    width: 220,
                                    height: 230,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    elevation: 5,
                                    shadowColor: 'white',
                                    shadowOpacity: 0.2,
                                    shadowOffset: { width: 0, height: 2 },
                                    shadowRadius: 4,
                                }}
                            >
                                <Image source={course.image} style={{ width: 200, height: 110, marginBottom: 7, borderRadius: 5 }} />
                                <Text style={{ fontSize: 14, fontWeight: 'bold', textAlign: 'left', flex: 1 }}>{course.title}</Text>
                                <Text style={{ color: '#4b5563', textAlign: 'left', flex: 1 }}>{course.description}</Text>
                                <Text style={{ color: '#1d4ed8', fontWeight: 'bold', marginTop: 2, marginBottom:0, textAlign: 'left', flex: 1 }}>Chapters: {course.chapters}</Text>
                            </Animated.View>
                        );
                    })}
                </ScrollView>
            ) : (
                <View style={{ alignItems: 'center', marginTop: 20 }}>
                    <Image source={require('@/assets/images/landing.png')} style={{ width: '100%', height: 300, marginTop: 20 }} />
                    <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginTop: 20 }}>You don't have any courses</Text>
                </View>
            )}
        </View>
    );
}