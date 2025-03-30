import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { useRouter } from "expo-router";
import Ionicons from 'react-native-vector-icons/Ionicons'; 

export default function SignIn() {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const handleSubmit = () => {
    console.log('Sign In Submitted:', form);
  };

  return (
    <View className="flex-1 items-center justify-center bg-white p-4">
      <View>
        <Image
          source={require('../../assets/images/landing.png')}
          className=" w-52 h-52 mb-4"
          resizeMode="contain"
        />
      </View>
      <Text className="text-3xl font-extrabold text-gray-800 text-center mb-6">Welcome Back</Text>

      <TextInput
        className="w-full bg-gray-100 p-4 rounded-lg border border-gray-300 mb-4 focus:border-blue-500"
        placeholder="Email"
        keyboardType="email-address"
        onChangeText={(text) => handleChange('email', text)}
      />

<View className="w-full flex-row items-center bg-gray-100 p-[6px] rounded-lg border border-gray-300 mb-4 focus:border-blue-500">
          <TextInput
            className="flex-1"
            placeholder="Password"
            secureTextEntry={!showPassword}
            onChangeText={(text) => handleChange('password', text)}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Ionicons name={showPassword ? "eye-off" : "eye"} size={24} color="gray" />
          </TouchableOpacity>
        </View>

      <TouchableOpacity className="w-full bg-blue-500 p-4 rounded-lg mt-4 shadow-md active:bg-blue-700" onPress={handleSubmit}>
        <Text className="text-center text-white text-lg font-semibold">Sign In</Text>
      </TouchableOpacity>

      <Text className="text-gray-600 text-sm text-center mt-4">Don't have an account? <Text onPress={() => router.push('/auth/signUp')} className="text-blue-500 font-semibold">Sign Up</Text></Text>
    </View>
  );
}