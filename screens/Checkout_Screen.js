import React, { useEffect, useState } from 'react';
import { Alert, Button } from 'react-native';
import { useStripe } from '@stripe/stripe-react-native';
import { Config } from '../config';
import { useSelector, useDispatch } from 'react-redux';

export default function PaymentsUICompleteScreen({ item }) {
    const { initPaymentSheet, presentPaymentSheet } = useStripe();
    const [paymentSheetEnabled, setPaymentSheetEnabled] = useState(false);
    const [loading, setloading] = useState(true);
    const [clientSecret, setClientSecret] = useState(null)
    const user = useSelector((state) => state.userDetails);
    const fetchPaymentSheetParams = async () => {
        
        const response = await fetch(`${Config.url}/payment-sheet`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + `${user.userToken}`,
            }, 
            body: JSON.stringify({
                amount: 1052,
                receipt_email: user.user.user.email,
                metadata: {
                    email: user.user.user.email,
                    PackageName: 'mockinterview',
                    user: user.user.user
                }
            }) 
        });
        const { paymentIntent, ephemeralKey, customer, extrainfo, receipt_email } = await response.json();
        setClientSecret(paymentIntent);
        return {
            paymentIntent,
            ephemeralKey,
            customer,
            extrainfo,
            receipt_email
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
            Alert.alert('Success', 'The payment was confirmed successfully');
            fetch(`${Config.url}/create-invoice`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + `${user.userToken}`,
                },
            }).then(res => res.json()).then(async (resp) => {
                try { 
                    console.log(resp)
                } catch (error) {
                    alert(error)
                    console.log(error)
                }
            })
        }
        setPaymentSheetEnabled(false);
    };

    useEffect(() => {
        initialisePaymentSheet();
        return () => {
 
        }
    }, []) 

    const initialisePaymentSheet = async () => {
        const {
            paymentIntent,
            ephemeralKey,
            customer,
            extrainfo
        } = await fetchPaymentSheetParams();
        const { error } = await initPaymentSheet({
            customerId: customer,
            customerEphemeralKeySecret: ephemeralKey,
            paymentIntentClientSecret: paymentIntent,
            customFlow: false,
            merchantDisplayName: 'Smr Emarket',
            style: 'alwaysDark',
            // metadata: extrainfo
        });
        if (!error) {
            setPaymentSheetEnabled(true);
        }
    };


    return (
        <Button
            variant="primary"
            loading={loading}
            // disabled={!paymentSheetEnabled}
            title="Checkout"
            onPress={openPaymentSheet}
        />
    );
}