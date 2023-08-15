// Expo imports
import { StatusBar } from "expo-status-bar";
import { Font } from "expo-font";
import Ionicons from "@expo/vector-icons/Ionicons";

// React imports
import React, { useEffect, useState } from "react";
import { Button, ScrollView, StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// Component imports
import Restaurant from "./components/Restaurant";
import Home from "./components/Home";
import Map from "./components/Map";
import Settings from "./components/Settings";
import { ThemeProvider } from "./ThemeContext";

// Style imports
import { appStyles } from "./styles/appStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";

const App = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [favoriteRestaurants, setFavoriteRestaurants] = useState([]);

  // Using Tab Navigator to navigate to different components.
  const Tab = createBottomTabNavigator();

  // Load in the fonts.
  const loadFonts = async () => {
    await Font.loadAsync({
      "ESFace-Thin": require("./assets/fonts/ESFace-ThinTRIAL.otf"),
      "Liquid-Pixel": require("./assets/fonts/Liquid-Pixel.otf"),
    });
    setFontsLoaded(true);
  };

  // Load in the json file using fetch.
  const loadApi = async () => {
    await fetch("https://stud.hosted.hr.nl/1012112/api-menuse/api.json", {
      method: "GET",
      headers: {
        "Cache-control": "no-cache",
      },
    })
      .then((response) => response.json())
      .then((result) => setRestaurants(result.items));
  };

  // Load favorite restaurants from AsyncStorage
  const loadFavorites = async () => {
    try {
      // Get all keys from local storage.
      const keys = await AsyncStorage.getAllKeys();

      // Filter keys for favorites.
      const favoriteKeys = keys.filter((key) => key.startsWith("favorite_"));

      // Get favorite restaurants from local storage.
      const favoriteRestaurants = await AsyncStorage.multiGet(favoriteKeys);

      // Parse the stored favorite restaurant data.
      const parsedFavorites = favoriteRestaurants.map(([key, value]) => ({
        id: key.split("_")[1],
        isFavorite: JSON.parse(value),
      }));

      // Set the favorite restaurants in state
      setFavoriteRestaurants(parsedFavorites);
    } catch (error) {
      console.log("Error loading favorite restaurants:", error);
    }
  };

  // Only run the all these functions once!
  useEffect(() => {
    loadApi();
    loadFavorites();
  }, []);

  // if (!fontsLoaded) {
  //   // Return a loading state or placeholder if fonts are not loaded yet
  //   return (
  //     <View style={appStyles.loadingContainer}>
  //       <Text>Loading fonts...</Text>
  //     </View>
  //   );
  // }

  return (
    <ThemeProvider>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerShown: false,
            tabBarStyle: [
              {
                backgroundColor: "white",
                elevation: 0,
              },
            ],
          }}
          tabBarOptions={{
            activeTintColor: "black",
            tabBarInactiveTintColor: "lightgray",
            style: {
              backgroundColor: "blue",
              elevation: 0,
            },
          }}>
          <Tab.Screen name="Home">{(children) => <Home restaurants={restaurants} loadFavorites={loadFavorites} />}</Tab.Screen>
          <Tab.Screen name="Map">{(children) => <Map restaurants={restaurants} />}</Tab.Screen>
          <Tab.Screen name="Settings">{(children) => <Settings favoriteRestaurants={favoriteRestaurants} />}</Tab.Screen>
        </Tab.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;
