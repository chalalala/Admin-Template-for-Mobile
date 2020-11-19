import { Dimensions } from 'react-native';

export const colors = {
   VTBLUE: "#007DDD",
   VTGREEN: "#17ADB0",
   DBLUE: "#28abb9",
   DGREEN: "#1b6372",
   LGREEN: "#15ab92",
   BGREEN:"#3aa2bd",
   GREY: "#bbbfca",
   BLACK: "#222831",
}

export const screenWidth = Dimensions.get("window").width;
export const containerWidth = screenWidth*0.9;

export const chartConfig = {
   backgroundGradientFrom: "#fff",
   backgroundGradientTo: "#fff",
   fillShadowGradient: 'rgba(22, 165, 150)',
   fillShadowGradientOpacity: 0.3,
   color: (opacity = 1) => `rgba(50, 50, 50, ${opacity})`,
   strokeWidth: 2,
   barPercentage: 0.5,
   useShadowColorFromDataset: false
};