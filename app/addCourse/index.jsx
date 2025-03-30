import React from 'react'
import { View, Text, TextInput } from 'react-native'
import { ActivityIndicator } from 'react-native-web'
const index = () => {
    const [loading, setLoading] = React.useState(false)
    const [form, setForm] = React.useState({
        course: ''
    })
    const onGenerateTopic = () => {
        console.log('Generate Topic button clicked')
        // Add your logic to generate topics here
    }
  return (
    <View className="flex-1 bg-white mt-10 p-4">
        <Text className='text-2xl font-bold'>Create New Course</Text>
        <Text className='text-gray-500 text-2xl mt-4'>What you want to learn today?</Text>
        <Text className='mt-4' style={{fontSize:16, textjustify:'center'}} >What course you want to create (ex: Web Development, Mobile Development, Data Science, Python, Java, C++)</Text>
        <TextInput multiline={true} numberOfLines={4} placeholder='EX: Web Development, Mobile Development, Data Science' style={{height:100}}  className='w-full bg-gray-100 p-4 rounded-lg border border-gray-300 mt-4 focus:border-blue-500' />
        <Text type='outline' disabled={loading} style={{fontSize:16}} className='w-full bg-blue-500 p-4 flex justify-center items-center font-bold text-white mt-4' onPress={() => onGenerateTopic()}>{
            loading ? <><ActivityIndicator size="large" color="white" /></> : 'Generate Topics'
        } </Text>
    </View>
  )
}

export default index
