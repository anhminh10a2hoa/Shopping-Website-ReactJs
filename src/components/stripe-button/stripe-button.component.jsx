import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeButton = ({price}) => {
  const priceForStrike = price * 100;
  const publishableKey = 'pk_test_51IK0qlHa8v6zmzIBGBwkjy9SfHYbty0Ji0YMh3LE1uTpsLYxP5sfd3lThmvp8DWekcCsqqJvyzrXGXmMQwgs8d5Z00MGy5EJpf'

  const onToken = token => {
    console.log(token);
    alert('Payment successful!');
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