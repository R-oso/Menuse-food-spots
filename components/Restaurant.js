import React, { useContext, useEffect, useState } from "react";
import { Text, TouchableOpacity, View, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Overlay } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { restaurantStyles } from "../styles/appStyles";
import { Ionicons } from "@expo/vector-icons";

import { ThemeContext } from "../ThemeContext";
import { lightStyles, darkStyles } from "../styles/appStyles";
import Seperator from "./Seperator";

const Restaurant = ({ restaurant, route, loadFavorites }) => {
  // Determine the appropriate styles based on the theme.
  const { theme } = useContext(ThemeContext);
  const stylesTheme = theme === "light" ? lightStyles : darkStyles;

  // Access navigation prop here
  const navigation = useNavigation();

  // Access the properties of the restaurant object here.
  const { id, title, description, latitude, longitude, price, favorite } = restaurant;

  // Usestate for the overlay (about page).
  const [visible, setVisible] = useState(false);

  // Handle the press on the restaurant title.
  const toggleOverlay = () => {
    setVisible(!visible);
  };

  // Close the overlay and handle the press on the navigate to map button.
  const navigateToMap = () => {
    toggleOverlay();
    navigation.navigate("Map", { restaurant: restaurant });
  };

  // Make a state variable for a random number.
  const [number, setNumber] = useState(1);

  // Carry out the function once and set the state.
  useEffect(() => {
    const getRandomNumber = () => {
      const randomNumber = Math.floor(Math.random() * 100) + 1;
      setNumber(randomNumber);
    };

    getRandomNumber();
  }, []);

  // Make a state variable for the favorite option.
  const [isFavorite, setIsFavorite] = useState(restaurant.favorite);

  // Toggle favorite and update it in local storage.
  const toggleFavorite = async () => {
    try {
      const newIsFavorite = !isFavorite;
      setIsFavorite(newIsFavorite);

      // Update the favorite status in local storage
      if (newIsFavorite) {
        await AsyncStorage.setItem(`favorite_${restaurant.id}`, JSON.stringify(restaurant));
      } else {
        await AsyncStorage.removeItem(`favorite_${restaurant.id}`);
      }
    } catch (error) {
      console.log("Error updating favorite status:", error);
    }
    // loadFavorites is a function that has been passed as a prop from App.js. Calling it will update the favorites state.
    loadFavorites();
  };

  // This useEffect function gets the current favorite status on reload.
  useEffect(() => {
    const getFavoriteStatus = async () => {
      try {
        // Retrieve the favorite status from local storage
        const favoriteStatus = await AsyncStorage.getItem(`favorite_${restaurant.id}`);
        if (favoriteStatus !== null) {
          setIsFavorite(JSON.parse(favoriteStatus));
        }
      } catch (error) {
        console.log("Error retrieving favorite status:", error);
      }
    };
    getFavoriteStatus();
  }, []);

  return (
    <View>
      <TouchableOpacity title="Open Overlay" onPress={toggleOverlay}>
        <Text style={[restaurantStyles.title, stylesTheme.text]}>{title}</Text>
      </TouchableOpacity>

      <Seperator randomNumber={number} />

      <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
        <View style={restaurantStyles.overlay}>
          <Text style={restaurantStyles.description}>{description}</Text>

          <TouchableOpacity style={restaurantStyles.favorite} onPress={toggleFavorite}>
            <Text style={restaurantStyles.icon}>{isFavorite ? <Ionicons name="ios-heart" size={40} color="red" /> : <Ionicons name="ios-heart-outline" size={40} color="red" />}</Text>
          </TouchableOpacity>

          <Text style={restaurantStyles.price}>{price}</Text>

          <TouchableOpacity onPress={navigateToMap}>
            <Text>See it on the map</Text>
          </TouchableOpacity>
        </View>
      </Overlay>
    </View>
  );
};

export default Restaurant;
