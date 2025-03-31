import { Image, StyleSheet, Platform, View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
export default function HomeScreen() {
    const router = useRouter();
  return (
    <View
    style={{ backgroundColor: 'white', flex: 1, paddingTop: (Platform.OS === 'ios' || Platform.OS === 'web') ? 45 : 25 }}
    >
      <Image
        source={require("@/assets/images/landing.png")}
        style={{
          width: "100%",
          height: 300,
          // marginTop:40
        }}
      />

      <View
        style={{
          padding: 25,
          backgroundColor: "#0075Ff",
          height: "100%",
          borderTopLeftRadius: 35,
          borderTopRightRadius: 35,
          width: "100%",
        }}
      >
        <Text style={{fontSize:35, fontWeight:'bold', textAlign:'center', color:'white'}}>Welcome to learning app</Text>
        <Text style={{fontSize:20, marginTop:20, textAlign:'center', color:'white'}}>This is a learning app for students🧑🏻‍🎓 and teachers 🧑🏻‍🏫</Text>
        <TouchableOpacity onPress={() => router.push('/auth/signUp')}>
            <Text style={{backgroundColor:'white', textShadowColor:'#0075Ff', padding:10, borderRadius:10, textAlign:'center', marginTop:20, color:'black', fontSize:20 , fontWeight:'bold'}}>Get started</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/auth/signIn')}>
            <Text style={{borderWidth:1, borderColor:'white', padding:10, borderRadius:10, textAlign:'center', marginTop:20, color:'white', fontSize:16, shadowColor:'black'}}>Already have an account?</Text>
        </TouchableOpacity>
        <View>
            <Image
                source={require('@/assets/images/landing.png')}
                style={{
                    marginTop:30,
                    width: 100,
                    height: 100,
                    borderRadius: 100,
                    bottom: 0,
                    left: 100,
                }}
            />
        </View>
      </View>
    </View>
  );
}
