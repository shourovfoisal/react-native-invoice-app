import { StyleSheet, TextStyle, ViewStyle } from "react-native";

const button: ViewStyle = {
  width: 80,
  height: 35,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "lightblue",
  borderRadius: 5,
  elevation: 3,
};

const textInput: TextStyle = {
  borderColor: "#333",
  borderWidth: 1,
  marginTop: 5,
  color: "#222",
  borderRadius: 7,
  paddingLeft: 10,
};

const disabledTextInput: TextStyle = {
  ...textInput,
  backgroundColor: "#eee",
  paddingLeft: 10,
};

export const globalStyles = StyleSheet.create({
  button,
  textInput,
  disabledTextInput
});
