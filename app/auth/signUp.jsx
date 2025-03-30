import { View, Text,Image, TextInput, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { useRouter } from "expo-router";
import Ionicons from 'react-native-vector-icons/Ionicons'; // नया आइकन पैकेज

export default function SignUp() {
  const [form, setForm] = useState({ name: '', email: '', phoneNumber: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();
  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const handleSubmit = () => {
    console.log('Form Submitted:', form);
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
      <Text className="text-2xl font-bold text-gray-700 mb-6">Create New Account</Text>

      <TextInput
       className="w-full bg-gray-100 p-4 rounded-lg border border-gray-300 mb-4 focus:border-blue-500"
        placeholder="Full Name"
        onChangeText={(text) => handleChange('name', text)}
      />

      <TextInput
        className="w-full bg-gray-100 p-4 rounded-lg border border-gray-300 mb-4 focus:border-blue-500"
        placeholder="Email"
        keyboardType="email-address"
        onChangeText={(text) => handleChange('email', text)}
      />

      <TextInput
        className="w-full bg-gray-100 p-4 rounded-lg border border-gray-300 mb-4 focus:border-blue-500"
        placeholder="Phone Number"
        keyboardType="phone-pad"
        onChangeText={(text) => handleChange('phoneNumber', text)}
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

      <TouchableOpacity className="w-full bg-blue-500 p-3 rounded-xl mt-2" onPress={handleSubmit}>
        <Text className="text-center text-white text-lg font-bold">Create Account</Text>
      </TouchableOpacity>

      <View className="flex-row items-center justify-center mt-4">
        <Text className="text-gray-500">Already have an account? </Text>
        <TouchableOpacity>
          <Text onPress={() => router.push('/auth/signIn')} className="text-blue-500 font-bold">Sign In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}