import { Image,ScrollView, Platform, View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Courses from '@/components/Courses';
import Practice from '@/components/Practice';
export default function HomeScreen() {
  const router = useRouter();


  return (
    <View   style={{ padding: 10, backgroundColor: 'white', flex: 1, paddingTop: (Platform.OS === 'ios' || Platform.OS === 'web') ? 45 : 45 }}>
      {/* Header Section */}
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', borderRadius: 10 }}>
        <View>
          <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Hello, Vikas</Text>
          <Text>Let's get started!</Text>
        </View>
        <Ionicons name="settings-outline" size={24} color="black" />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}  style={{ marginTop: 20 }}>

      {/* Practice Section */}
      <Practice/>
     
      {/* Course Section */}
      <Courses/>
  
      {/* Buttons Section */}
      <TouchableOpacity onPress={() => router.push('/addCourse')} style={{ backgroundColor: '#3b82f6', padding: 15, borderRadius: 10, marginTop: 20, alignItems: 'center' }}>
        <Text style={{ color: 'white', fontWeight: 'bold' }}>+ Create New Course</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{ backgroundColor: '#3b82f6', padding: 15, borderRadius: 10, marginTop: 10, alignItems: 'center' }}>
        <Text style={{ color: 'white', fontWeight: 'bold' }}>Explore Existing Courses</Text>
      </TouchableOpacity>

      </ScrollView>
    </View>
  );
}