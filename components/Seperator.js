import React, { useContext } from "react";
import { View } from "react-native";

import { restaurantStyles } from "../styles/appStyles";
import { ThemeContext } from "../ThemeContext";
import { lightStyles, darkStyles } from "../styles/appStyles";

const Seperator = ({ randomNumber }) => {
  const { theme } = useContext(ThemeContext);
  const stylesTheme = theme === "light" ? lightStyles : darkStyles;
  return <View style={[restaurantStyles.seperator, stylesTheme.white, { marginLeft: randomNumber }]} />;
};

export default Seperator;
