import React, { useContext, useEffect, useState } from "react";
import { View, Text, Appearance, ScrollView } from "react-native";
import { settingsStyles } from "../styles/appStyles";

import { ThemeContext } from "../ThemeContext";
import { lightStyles, darkStyles } from "../styles/appStyles";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Settings = ({ favoriteRestaurants }) => {
  // Determine the appropriate styles based on the theme.
  const { theme, toggleTheme } = useContext(ThemeContext);
  const stylesTheme = theme === "light" ? lightStyles : darkStyles;

  // let title = favoriteRestaurants[0].isFavorite.title;

  // Access navigation prop here
  const navigation = useNavigation();

  const navigateToFavorites = () => {
    navigation.navigate("Favorites");
  };

  // Call the clearAsyncStorage function wherever you want to clear AsyncStorage.
  const clearAsyncStorage = async () => {
    const directoryPath = `${fs.DocumentDirectoryPath}/RCTAsyncLocalStorage`;
    const directoryExists = await fs.exists(directoryPath);

    if (directoryExists) {
      await AsyncStorage.clear();
      await fs.unlink(directoryPath);
      console.log("AsyncStorage cleared successfully!");
    } else {
      console.log("AsyncStorage directory not found.");
    }
  };

  return (
    <ScrollView style={[settingsStyles.scrollView, stylesTheme.black]}>
      <View style={[settingsStyles.container, stylesTheme.black]}>
        <View style={[settingsStyles.button, stylesTheme.whiteButton]}>
          <Text style={[settingsStyles.color, stylesTheme.text]} onPress={toggleTheme}>
            dark mode
          </Text>
        </View>

        <View style={settingsStyles.favoriteContainer}>
          <Text style={[settingsStyles.favorites, stylesTheme.text2]} onPress={navigateToFavorites}>
            my favorites
          </Text>
        </View>
        {favoriteRestaurants.map((favorite) => (
          <Text key={favorite.id} style={[settingsStyles.restaurants, stylesTheme.grayText]}>
            {favorite.isFavorite.title}
          </Text>
        ))}
      </View>
    </ScrollView>
  );
};

export default Settings;
