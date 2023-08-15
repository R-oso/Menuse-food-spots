import React, { useContext, useEffect, useRef } from "react";
import { Animated, Text, View } from "react-native";
import { appStyles } from "../styles/appStyles";

import { ThemeContext } from "../ThemeContext";
import { lightStyles, darkStyles } from "../styles/appStyles";

const SlidingText = () => {
  // Determine the appropriate styles based on the theme.
  const { theme } = useContext(ThemeContext);
  const stylesTheme = theme === "light" ? lightStyles : darkStyles;

  // Different sentences all have different fonts applied here.
  const sentences = [
    { text: "PAD SEE EW", fontStyle: appStyles.slidingText },
    { text: "TACO'S", fontStyle: appStyles.slidingText2 },
    { text: "MEXICAN ITALIAN", fontStyle: appStyles.slidingText2 },
    { text: "RISOTTO RAMEN", fontStyle: appStyles.slidingText2 },
    { text: "NACHO'S NOODLES", fontStyle: appStyles.slidingText2 },

    // Add more sentences with different text and fontStyle as needed
  ];

  const translateXValue = useRef(new Animated.Value(-550)).current;

  useEffect(() => {
    const slideAnimation = Animated.loop(
      Animated.timing(translateXValue, {
        toValue: 400, // Adjust the toValue based on the width of the text or container
        duration: 7000, // Adjust the duration value to control the speed of the animation
        useNativeDriver: true,
      })
    );
    slideAnimation.start();

    return () => {
      slideAnimation.stop();
    };
  }, []);

  return (
    <View>
      <Animated.View
        style={{
          flexDirection: "row",
          transform: [
            {
              translateX: translateXValue.interpolate({
                inputRange: [-400, 400],
                outputRange: [-820, 420], // Adjust the outputRange based on the width of the text or container
              }),
            },
          ],
        }}>
        {sentences.map((sentence, index) => (
          <Text key={index} style={[sentence.fontStyle, stylesTheme.text2]}>
            {sentence.text}
            {index !== sentences.length - 1 && <Text> </Text>}
          </Text>
        ))}
      </Animated.View>
    </View>
  );
};

export default SlidingText;
