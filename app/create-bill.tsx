import React from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CreateBill() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.formContainer}>
          <Text style={styles.inputLabel}>Name</Text>
          <TextInput placeholder="Full Name" style={styles.textInput} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  formContainer: {
    marginTop: 15,
    marginHorizontal: 15,
  },
  inputLabel: {
    color: "#222",
    fontSize: 16,
    fontWeight: "bold",
  },
  textInput: {
    borderColor: "#333",
    borderWidth: 1,
    marginTop: 5,
    color: "#222",
    borderRadius: 7,
  },
});
