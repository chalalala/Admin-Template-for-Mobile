import React from 'react';
import { StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function GradientBackground(){
  return(
      <LinearGradient
      // Background Linear Gradient
         colors={["#19adb1", "#0a6dc3"]}
         style={[{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            
         },StyleSheet.absoluteFill]}
         // start={[0, 0]} end={[1, 0]}
      />
   )
}
   