import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

const StripeButton = ({price}) => {
  const priceForStrike = price * 100;
  const publishableKey = 'pk_test_51IK0qlHa8v6zmzIBGBwkjy9SfHYbty0Ji0YMh3LE1uTpsLYxP5sfd3lThmvp8DWekcCsqqJvyzrXGXmMQwgs8d5Z00MGy5EJpf'

  const onToken = token => {
    axios({
      url: 'payment',
      method: 'POST',
      data: {
        amount: priceForStrike,
        token
      }
    }).then((res) => {
      alert('Payment successful')
    }).catch((err) => {
      console.log('Payment error: ' + JSON.parse(err));
      alert('There was an issue with your payment. Please make sure you used the provided cart')
    })
  }

  return (
    <StripeCheckout
      label='Pay now'
      name='AM Clothing Ltd.'
      billingAddress
      shippingAddress
      image='https://svgshare.com/i/CUz.svg'
      description={`Your total is $${price}`}
      amount={priceForStrike}
      panelLabel='Pay now'
      token={onToken}
      stripeKey={publishableKey}
    />
  )
}

export default StripeButton;