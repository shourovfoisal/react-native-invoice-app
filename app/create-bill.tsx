import { PdfTemplate } from "@/components/PdfTemplate";
import { globalStyles } from "@/helpers/styles";
import { handleError } from "@/helpers/utils";
import { Picker } from "@react-native-picker/picker";
import dateFormat from "dateformat";
import { printToFileAsync } from "expo-print";
import { shareAsync } from "expo-sharing";
import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export type BillForm = {
  name: string;
  address: string;
  mobileNumber: string;
  product: string;
  quantity: string;
  invoiceNumber: string;
  total: string;
  receivedAmount: string;
  balanceDue: string;
  paymentMethod: string;
};

function initForm(): BillForm {
  return {
    address: "",
    mobileNumber: "",
    name: "",
    product: "",
    quantity: "",
    invoiceNumber: dateFormat(new Date(), "ddmmyyhhMss"),
    total: "",
    receivedAmount: "",
    balanceDue: "",
    paymentMethod: "",
  };
}

export default function CreateBill() {
  const [form, setForm] = useState<BillForm>(initForm());

  async function makePdf(html: string) {
    try {
      const { uri } = await printToFileAsync({ html });
      console.log(`File saved to ${uri}`);
      await shareAsync(uri, { UTI: ".pdf", mimeType: "application/pdf" });
      resetForm();
    } catch (error) {
      handleError(
        error,
        "Something went wrong while creating or sharing the PDF."
      );
    }
  }
  
  function getBalanceDue(): string {
    const total = parseFloat(form.total);
    const received = parseFloat(form.receivedAmount);
    
    if(!Number.isNaN(total) && !Number.isNaN(received)) {
      if(received > total) {
        return ""
      } else {
        return (total - received).toString()
      }
    } else {
      return ""
    }
  }

  function handleSubmit() {
    if(Number.isNaN(parseFloat(getBalanceDue()))) {
      Alert.alert("Incorrect due balance.");
    } else {
      const html = PdfTemplate({...form, balanceDue: getBalanceDue()});
      makePdf(html);
    }
  }

  function resetForm() {
    setForm(initForm());
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Name */}
        <View style={styles.formContainer}>
          <Text style={styles.inputLabel}>Name</Text>
          <TextInput
            placeholder="Full Name"
            style={globalStyles.textInput}
            value={form?.name}
            onChangeText={(name) => setForm((prev) => ({ ...prev, name }))}
          />
        </View>

        {/* Address */}
        <View style={styles.formContainer}>
          <Text style={styles.inputLabel}>Address</Text>
          <TextInput
            placeholder="Address"
            style={globalStyles.textInput}
            value={form?.address}
            onChangeText={(address) =>
              setForm((prev) => ({ ...prev, address }))
            }
          />
        </View>

        {/* Mobile Number */}
        <View style={styles.formContainer}>
          <Text style={styles.inputLabel}>Mobile Number</Text>
          <TextInput
            placeholder="Mobile Number"
            keyboardType="number-pad"
            style={globalStyles.textInput}
            value={form?.mobileNumber}
            onChangeText={(mobileNumber) =>
              setForm((prev) => ({ ...prev, mobileNumber }))
            }
          />
        </View>

        {/* Product Dropdown */}
        <View style={styles.formContainer}>
          <Text style={styles.inputLabel}>Product</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={form?.product}
              onValueChange={(product) =>
                setForm((prev) => ({ ...prev, product }))
              }
            >
              <Picker.Item label="Desktop" value="Desktop" />
              <Picker.Item label="Laptop" value="Laptop" />
              <Picker.Item label="Mouse" value="Mouse" />
              <Picker.Item label="Keyboard" value="Keyboard" />
            </Picker>
          </View>
        </View>

        {/* Quantity */}
        <View style={styles.formContainer}>
          <Text style={styles.inputLabel}>Quantity</Text>
          <TextInput
            placeholder="Quantity"
            keyboardType="number-pad"
            style={globalStyles.textInput}
            value={form?.quantity}
            onChangeText={(quantity) =>
              setForm((prev) => ({ ...prev, quantity }))
            }
          />
        </View>

        {/* Invoice Number */}
        <View style={styles.formContainer}>
          <Text style={styles.inputLabel}>Invoice Number</Text>
          <TextInput
            editable={false}
            placeholder="Invoice Number"
            style={globalStyles.disabledTextInput}
            value={form?.invoiceNumber}
          />
        </View>

        {/* Total */}
        <View style={styles.formContainer}>
          <Text style={styles.inputLabel}>Total</Text>
          <TextInput
            placeholder="Total $"
            keyboardType="numeric"
            style={globalStyles.textInput}
            value={form?.total}
            onChangeText={(total) => setForm((prev) => ({ ...prev, total }))}
          />
        </View>

        {/* Received Amount */}
        <View style={styles.formContainer}>
          <Text style={styles.inputLabel}>Received Amount</Text>
          <TextInput
            placeholder="Received Amount $"
            keyboardType="numeric"
            style={globalStyles.textInput}
            value={form?.receivedAmount}
            onChangeText={(receivedAmount) =>
              setForm((prev) => ({ ...prev, receivedAmount }))
            }
          />
        </View>

        {/* Balance Due */}
        <View style={styles.formContainer}>
          <Text style={styles.inputLabel}>Balance Due</Text>
          <TextInput
            editable={false}
            placeholder="Balance Due $"
            keyboardType="numeric"
            style={globalStyles.disabledTextInput}
            value={getBalanceDue()}
          />
        </View>

        {/* Payment Method  */}
        <View style={styles.formContainer}>
          <Text style={styles.inputLabel}>Payment Method</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={form.paymentMethod}
              onValueChange={(paymentMethod) =>
                setForm((prev) => ({ ...prev, paymentMethod }))
              }
            >
              <Picker.Item label="Credit" value="Credit" />
              <Picker.Item label="Cash" value="Cash" />
              <Picker.Item label="Other" value="Other" />
            </Picker>
          </View>
        </View>

        <View style={styles.submitButtonContainer}>
          <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
            <Text>Submit</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 15,
    paddingBottom: 15,
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
  pickerContainer: {
    marginTop: 5,
    borderWidth: 1,
    borderRadius: 4,
  },
  submitButtonContainer: {
    marginHorizontal: 15,
  },
  submitButton: {
    ...globalStyles.button,
    marginVertical: 15,
    width: "100%",
  },
});
