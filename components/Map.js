import React, { useEffect, useRef, useState } from "react";
import { Button, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { mapStyles } from "../styles/appStyles";

import Restaurant from "./Restaurant";
import * as Location from "expo-location";
import Ionicons from "@expo/vector-icons/Ionicons";

const Map = ({ navigation, route, restaurants }) => {
  // Create a reference to the MapView.
  const mapRef = useRef(null);

  // Get the parameters for the restaurant
  if (route !== undefined) {
    const restaurant = route.params.restaurant;
    mapRef.current.animateToRegion(restaurant), 600;
  } else {
    // console.log("No restaurant selected");
  }

  // State for current region.
  const [region, setRegion] = useState({
    latitude: 51.5079145,
    longitude: -0.0899163,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  // State for the selected marker.
  const [selectedMarker, setSelectedMarker] = useState(null);

  // State for current user location.
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if ((status = "granted")) {
        let loc = await Location.getCurrentPositionAsync();
        setUserLocation(loc);
      } else {
        console.log("no permission");
      }
    })();
  }, []);

  const rotterdamRegion = {
    latitude: 51.92478071029673,
    longitude: 4.476729188606079,
    latitudeDelta: 0.04,
    longitudeDelta: 0.05,
  };

  // If pressed, make the screen move to the pressed marker.
  const handlePress = (coordinate) => {
    setSelectedMarker(coordinate);
    if (mapRef.current) {
      mapRef.current.animateToRegion(
        {
          latitude: coordinate.latitude,
          longitude: coordinate.longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.015,
        },
        500 // Adjust the duration as needed
      );
    }
  };

  const navigateToUserLocation = () => {
    if (mapRef.current && userLocation) {
      mapRef.current.animateToRegion(
        {
          latitude: userLocation.coords.latitude,
          longitude: userLocation.coords.longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        },
        500
      );
    } else {
      alert("Your location has not been acquired yet. Please wait a couple of seconds for the map to load.");
    }
  };

  // Map through the restaurants and put them in a Marker component.
  const showMarkers = restaurants.map((restaurant, key) => <Marker key={restaurant.id} coordinate={restaurant} title={restaurant.title} onPress={() => handlePress(restaurant)}></Marker>);

  return (
    <View>
      <MapView
        style={mapStyles.map}
        initialRegion={
          userLocation
            ? {
                latitude: userLocation.coords.latitude,
                longitude: userLocation.coords.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }
            : rotterdamRegion
        }
        onRegionChangeComplete={(region) => setRegion(region)}
        ref={mapRef}
        showsUserLocation={true}
        region={
          userLocation
            ? {
                latitude: userLocation.coords.latitude,
                longitude: userLocation.coords.longitude,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
              }
            : rotterdamRegion
        }>
        <Pressable onPress={navigateToUserLocation}>
          <Ionicons style={mapStyles.icon} name="navigate-circle" size={32}></Ionicons>
        </Pressable>
        {showMarkers}
      </MapView>
    </View>
  );
};

export default Map;
