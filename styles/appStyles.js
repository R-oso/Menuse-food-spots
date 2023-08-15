import { StyleSheet } from "react-native";

// All stylesheets used in this project.
const appStyles = StyleSheet.create({
  scroll: {
    backgroundColor: "#f53302",
  },

  container: {
    flexDirection: "column",
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: "#f53302",
    alignItems: "center",
  },

  itemContainer: {
    flexDirection: "column",
    backgroundColor: "#f53302",
    marginTop: 40,
  },

  title: {
    fontSize: 100,
    color: "black",
    marginTop: 40,
    backgroundColor: "white",
    borderColor: "black",
    borderWidth: 4,
    borderBottomColor: "blue",
    width: "100%",
    textAlign: "center",
  },

  line: {
    height: 10,
    width: "90%",
    backgroundColor: "black",
  },

  p: {
    flex: 2,
    fontSize: 70,
  },

  slidingText: {
    fontSize: 30,
    marginTop: 60,
  },

  slidingText2: {
    fontSize: 30,
    marginTop: 60,
  },
});

const restaurantStyles = StyleSheet.create({
  title: {
    fontSize: 60,
    marginLeft: 15,
    color: "black",
  },

  price: {
    fontSize: 20,
    marginLeft: 15,
  },

  seperator: {
    height: 2,
    width: "85%",
    backgroundColor: "black",
    padding: 3,
    marginBottom: 10,
  },

  overlay: {
    height: "60%",
    backgroundColor: "white",
    flexDirection: "column",
  },

  description: {
    fontSize: 30,
    flexWrap: "wrap",
  },

  favorite: {
    flex: 2,
    width: "14%",
  },

  icon: {},

  price: {
    flex: 2,
    fontSize: 30,
  },
});

const mapStyles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  },

  icon: {
    fontSize: 40,
    marginTop: 150,
    marginLeft: "85%",
  },
});

const settingsStyles = StyleSheet.create({
  scrollView: {
    backgroundColor: "#f53302",
  },
  container: {
    flexDirection: "column",
    justifyContent: "flex-start",
    marginTop: 100,
  },

  color: {
    fontSize: 30,
    marginRight: 60,
    alignSelf: "flex-end",
  },

  button: {
    borderWidth: 2,
    borderBottomWidth: 7,
    borderColor: "black",
    alignItems: "center",
    marginLeft: 20,
    padding: 5,
    width: "45%",
  },

  favorites: {
    fontSize: 25,
    color: "black",
    textAlign: "center",
  },

  favoriteContainer: {
    justifyContent: "flex-start",
    marginTop: 100,
  },

  restaurants: {
    marginLeft: 20,
    fontSize: 40,
    color: "black",
  },

  seperator: {
    height: 1,
    backgroundColor: "black",
    alignItems: "center",
    marginLeft: 60,
    padding: 3,
    width: "45%",
  },
});

const darkStyles = StyleSheet.create({
  black: {
    backgroundColor: "black",
  },

  white: {
    backgroundColor: "white",
  },

  text: {
    color: "white",
    fontWeight: "250",
  },

  text2: {
    color: "white",
    fontWeight: "300",
  },

  whiteButton: {
    borderColor: "white",
  },

  grayText: {
    color: "gray",
  },

  // Rest of the styles for the light theme
});

const lightStyles = StyleSheet.create({
  // Rest of the styles for the dark theme
});

export { appStyles, restaurantStyles, mapStyles, settingsStyles, lightStyles, darkStyles };
