import React, { useContext, useEffect, useState } from "react";
import { Elements, StripeProvider } from "react-stripe-elements";
import CheckoutForm from "../../modules/CheckoutForm/CheckoutForm.js";
import MainContext from "../../../context/mainContext";

const Checkout = (props) => {
  const { rideCheckoutDetails } = props;
  const [key, setApiKey] = useState("");
  const mainContext = useContext(MainContext);

  useEffect(() => {
    mainContext
      .getPublicStripeKey()
      .then((res) => {
        setApiKey(res.publicKey);
      })
      .catch((err) => {
        // TODO: Better Error Handling
        console.log(err);
      });
  });

  if (key !== "") {
    return (
      <div className="checkout">
        <StripeProvider apiKey={key ? key : null}>
          <Elements>
            <CheckoutForm
              rideCheckoutDetails={rideCheckoutDetails}
              mainContext={mainContext}
              appFee={mainContext.appFee}
            />
          </Elements>
        </StripeProvider>
      </div>
    );
  }

  return null;
};

export default Checkout;
