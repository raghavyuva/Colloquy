import React, { useEffect, useState } from "react";
import { Alert, Button, TouchableOpacity } from "react-native";
import { useStripe } from "@stripe/stripe-react-native";
import { Config } from "../config";
import { useSelector, useDispatch } from "react-redux";
import { View, Text } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { DefaultTheme, DarkTheme, useTheme } from "@react-navigation/native";

export default function PaymentsUICompleteScreen({ item,disabled,date,time,Branch }) {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [paymentSheetEnabled, setPaymentSheetEnabled] = useState(false);
  const [clientSecret, setClientSecret] = useState(null);
  const user = useSelector((state) => state.userDetails);
  const { colors } = useTheme();

  const fetchPaymentSheetParams = async () => {
    const response = await fetch(`${Config.url}/payment-sheet`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + `${user.userToken}`,
      },
      body: JSON.stringify({
        amount: 1052,
        receipt_email: user.user.user.email,
        metadata: {
          email: user.user.user.email,
          PackageName: "mockinterview",
          user: user.user.user,
          date:date,
          time:time,
          Branch:Branch,
        },
      }),
    });
    const { paymentIntent, ephemeralKey, customer, extrainfo, receipt_email } =
      await response.json();
    setClientSecret(paymentIntent);
    return {
      paymentIntent,
      ephemeralKey,
      customer,
      extrainfo,
      receipt_email,
    };
  };

  const openPaymentSheet = async () => {
    if (!clientSecret) {
      return;
    }
    const { error, paymentIntent } = await presentPaymentSheet({
      clientSecret,
    });

    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
      console.log(error);
    } else {
      Alert.alert("Success", "The payment was confirmed successfully");
      fetch(`${Config.url}/create-invoice`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + `${user.userToken}`,
        },
      })
        .then((res) => res.json())
        .then(async (resp) => {
          try {
            console.log(resp);
          } catch (error) {
            alert(error);
            console.log(error);
          }
        });
    }
    setPaymentSheetEnabled(false);
  };

  useEffect(() => {
    initialisePaymentSheet();
    return () => {};
  }, []);

  const initialisePaymentSheet = async () => {
    const { paymentIntent, ephemeralKey, customer, extrainfo } =
      await fetchPaymentSheetParams();
    const { error } = await initPaymentSheet({
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: paymentIntent,
      customFlow: false,
      merchantDisplayName: "VtYuva",
      style: "alwaysDark",
      // metadata: extrainfo
    }); 
    if (!error) {
      setPaymentSheetEnabled(true);
    } 
  };

  return (
    <View
      style={{
        width: "100%",
        backgroundColor: disabled? colors.primary:'gray',
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <TouchableOpacity
        onPress={openPaymentSheet}
        style={{
          flexDirection: "row",
          alignItems:'center',
          justifyContent:"space-around"
        }}
        disabled={!disabled}
      >
        <Text
          style={{
            color: colors.text,
            fontSize:25,
            marginRight:5
          }}
        >
          checkout
        </Text>
        <MaterialIcons name="arrow-forward" color={colors.text} size={26} />
      </TouchableOpacity>
    </View>
  );
}
