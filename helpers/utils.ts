import { Alert } from "react-native";

export function handleError(error: unknown, alertMessage: string) {
  console.error(error);
  let message = alertMessage;
  if(error instanceof Error) {
    message += "\n\n";
    message += `Details: ${error.message}`
  } else if (typeof error === "string") {
    message += "\n\n";
    message += `Details: ${error}`;
  }
  
  Alert.alert(
    "Error",
    message,
    [{ text: "OK" }]
  );
}