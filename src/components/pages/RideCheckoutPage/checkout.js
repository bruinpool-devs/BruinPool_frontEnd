import React, { Component, useContext, useEffect, useState } from "react";
import { Elements, StripeProvider } from "react-stripe-elements";
import CheckoutForm from "../../modules/CheckoutForm/CheckoutForm.js";
import api from "./api";

function Checkout() {
  const [key, setApiKey] = useState("");

  useEffect(() => {
    api.getPublicStripeKey().then(apiKey => {
        setApiKey(apiKey);
    });
    console.log(key);
  });

  if(key != "") {
    return (
      <div className="checkout">
        <StripeProvider apiKey={key ? key : null}>
          <Elements>
            <CheckoutForm />
          </Elements>
        </StripeProvider>
      </div>
    );
  }

  return null;
}

export default Checkout;