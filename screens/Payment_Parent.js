import { StripeProvider } from '@stripe/stripe-react-native';
import React from 'react'
import PaymentsUICompleteScreen from './Checkout_Screen';

function Payment_Parent({disabled,date,time,Branch}) {
    return (
        <StripeProvider
            publishableKey="pk_test_51Hl55bIegwU8Nf3F8HHvcSUyIVupstuZYpI99uVRfMJl2N3oIBgLXvKdNu8LkiKvydOKo5KgfloaxagiJXgxE4zu00u9O7Jt4u"
            urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
            merchantIdentifier="merchant.com.VtYuva" // required for Apple Pay
        >
            <PaymentsUICompleteScreen disabled={disabled} date={date}  time={time} Branch={Branch} />
        </StripeProvider>
    );
}
 

export default Payment_Parent; 