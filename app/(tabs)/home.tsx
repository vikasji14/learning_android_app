import { Image, StyleSheet, Platform , View,Text} from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
export default function HomeScreen() {
  const router = useRouter();
  return (

    <View className='flex-1 bg-white mt-10 p-4'>
      <View className='flex flex-row items-center w-full' style={{justifyContent:'space-between', borderRadius: 10}}>
        <View>
          <Text className='font-bold text-3xl'>Hello, Vikas</Text>
         <Text className=''>Let's get started!</Text>
        </View>
        <View>
          <Ionicons name="settings-outline" size={24} color="black" className='text-bold' /> 
        </View>
      </View>
      <View>
        <Image
          source={require('@/assets/images/landing.png')}
          style={{
            width: '100%',
            height: 300,
            // marginTop:40
          }}
        />
      </View>

      <View>
        <Text className='flex text-2xl font-bold' style={{justifyContent:'center' ,textAlign:'center'}}>You don't have any courses</Text>
      </View>

      <View className='bg-blue-500 mt-10 p-4 hover:bg-blue-800 py-4 px-4 rounded justify-center items-center'>
        <Text className='text-white font-bold' onPress={() => router.push('/addCourse')}>+ Create New course</Text>
      </View>
      <View className='bg-blue-500 mt-10 p-4 hover:bg-blue-800 py-4 px-4 rounded justify-center items-center'>
        <Text className='text-white font-bold' >Explore Existing Courses</Text>
      </View>
    </View>
  )
}
