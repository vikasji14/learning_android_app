import { Image, StyleSheet, Platform , View,Text} from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function progress() {
  return (

    <View>
        <Text style={{fontSize:20, fontWeight:'bold', textAlign:'center', justifyContent:'center' , marginTop:40}}>Progress tab</Text>
    </View>
  )
}
