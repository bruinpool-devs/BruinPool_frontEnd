import React, { Component, useContext } from "react";
import { CardElement, injectStripe } from "react-stripe-elements";
import "./CheckoutForm.css";

class CheckoutForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      amount: props.request.ride.price / props.request.meta.seats,
      currency: "usd",
      clientSecret: null,
      error: null,
      metadata: null,
      disabled: false,
      succeeded: false,
      processing: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    // Payment Intent should technically be created here, but we can't do this until
    // we complete the session task.
  }

  async handleSubmit(ev) {
    ev.preventDefault();
    var request = this.props.request;
    var mainContext = this.props.mainContext;

    // Step 0: Check Prerequisites
    mainContext
      .rideDetails(request.meta.rideID)
      .then(ride => {
        if (ride.passengers >= ride.seats) {
          this.setState({ error: "All seats full" });
        }
      })
      .catch(err => {
        console.log(err);
        this.setState({ error: err.message });
      });

    // Step 1: Create PaymentIntent over Stripe API
    mainContext
      .createPaymentIntent({
        rideID: request.meta.rideID,
        spotsToBePurchased: request.meta.seats,
        username: "jo" //TODO: get current logged in user
      })
      .then(clientSecret => {
        this.setState({
          amount: request.ride.price / request.meta.spots,
          clientSecret: clientSecret,
          disabled: true,
          processing: true
        });

        // Step 2: Use clientSecret from PaymentIntent to handle payment in stripe.handleCardPayment() call
        this.props.stripe
          .handleCardPayment(this.state.clientSecret)
          .then(payload => {
            if (payload.error) {
              this.setState({
                error: `Payment failed: ${payload.error.message}`,
                disabled: false,
                processing: false
              });
              console.log("[error]", payload.error);
            } else {
              this.setState({
                processing: false,
                succeeded: true,
                error: "",
                metadata: payload.paymentIntent
              });
              console.log("[PaymentIntent]", payload.paymentIntent);
            }
          });
      })
      .catch(err => {
        this.setState({ error: err.message });
      });
  }

  renderSuccess() {
    return (
      <div className="sr-field-success message">
        <h1>Your test payment succeeded</h1>
        <p>View PaymentIntent response:</p>
        <pre className="sr-callout">
          <code>{JSON.stringify(this.state.metadata, null, 2)}</code>
        </pre>
      </div>
    );
  }

  renderForm() {
    var style = {
      base: {
        color: "#32325d",
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#aab7c4"
        }
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a"
      }
    };
    return (
      <form onSubmit={this.handleSubmit}>
        <h1>
          {this.state.currency.toLocaleUpperCase()}{" "}
          {this.state.amount.toLocaleString(navigator.language, {
            minimumFractionDigits: 2
          })}{" "}
        </h1>

        <div className="sr-combo-inputs">
          <div className="sr-combo-inputs-row">
            <input
              type="text"
              id="name"
              placeholder="Name"
              autoComplete="cardholder"
              className="sr-input"
            />
          </div>

          <div className="sr-combo-inputs-row">
            <CardElement className="sr-input sr-card-element" style={style} />
          </div>
        </div>

        {this.state.error && (
          <div className="message sr-field-error">{this.state.error}</div>
        )}

        {!this.state.succeeded && (
          <button className="pay-btn" disabled={this.state.disabled}>
            {this.state.processing ? "Processing…" : "Pay"}
          </button>
        )}
      </form>
    );
  }

  render() {
    return (
      <div className="checkout-form">
        <div className="sr-payment-form">
          <div className="sr-form-row" />
          {this.state.succeeded && this.renderSuccess()}
          {!this.state.succeeded && this.renderForm()}
        </div>
      </div>
    );
  }
}

export default injectStripe(CheckoutForm);
