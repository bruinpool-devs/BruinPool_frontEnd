import React from "react";
import "./RideCheckoutPage.css";
import Checkout from "./checkout.js";

const RideCheckoutPage = () => {
  return (
    <div className="App">
      <div className="sr-root">
        <div className="sr-main">
          <header className="sr-header">
            <div className="sr-header__logo" />
          </header>

          <Checkout />
        </div>
      </div>
      <div className="banner">
        <span>
          This is a{" "}
          <a href="https://github.com/stripe-samples"> Stripe Sample </a> on how
          to build a payment form in React to accept card payments.{" "}
          <a href="https://github.com/stripe-samples/react-elements-card-payment">
            View code on GitHub.
          </a>
        </span>
      </div>
    </div>
  );
};

export default RideCheckoutPage;
