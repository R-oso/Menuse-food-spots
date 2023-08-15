import React, { useContext, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { appStyles } from "../styles/appStyles";

import Restaurant from "./Restaurant";
import SlidingText from "./SlidingText";
import { ThemeContext } from "../ThemeContext";
import { lightStyles, darkStyles } from "../styles/appStyles";

const Home = ({ navigation, restaurants, loadFavorites }) => {
  const { theme } = useContext(ThemeContext);

  // Determine the appropriate styles based on the theme.
  const stylesTheme = theme === "light" ? lightStyles : darkStyles;

  // This function maps through the restaurants json file.
  const showRestaurants = restaurants.map((restaurant, key) => <Restaurant key={restaurant.id} restaurant={restaurant} loadFavorites={loadFavorites} />);

  return (
    <ScrollView style={[appStyles.scroll, stylesTheme.black]}>
      <SlidingText style={stylesTheme.text} />
      <View style={[appStyles.container, stylesTheme.black]}>
        <Text style={appStyles.title}>Menuse</Text>
      </View>

      <View style={[appStyles.itemContainer, stylesTheme.black]}>{showRestaurants}</View>
    </ScrollView>
  );
};

export default Home;
