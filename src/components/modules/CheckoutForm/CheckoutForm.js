import React, { useContext, Component } from "react";
import { Button } from "reactstrap";
import { CardElement, injectStripe } from "react-stripe-elements";
import "./CheckoutForm.css";
import Cookies from "universal-cookie";
import MainContext from "../../../context/mainContext";
import MainState from "../../../context/MainState";

class CheckoutForm extends Component {
  constructor(props) {
    super(props);

    // TODO: Fix this so it gets the correct appFee
    this.state = {
      amount:
        Number(props.rideCheckoutDetails.ride.price) +
        Number(props.rideCheckoutDetails.ride.price) * 0.1,
      currency: "usd",
      clientSecret: null,
      error: null,
      metadata: null,
      disabled: false,
      succeeded: false,
      processing: false,
      rideID: "",
      requestID: "",
      riderUsername: "",
      driverStripeAcct: "",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    // Payment Intent should technically be created here, but we can't do this until
    // we complete the session task.
  }

  async handleSubmit(ev) {
    ev.preventDefault();
    const rideCheckoutDetails = this.props.rideCheckoutDetails;
    const mainContext = this.props.mainContext;
    const cookies = new Cookies();
    const authToken = cookies.get("authToken");
    const currentUserName = cookies.get("userName");

    // Get Latest Ride details
    mainContext
      .rideDetails(rideCheckoutDetails.ride._id, authToken)
      .then((ride) => {
        if (1 > ride.seats) {
          this.setState({ error: "Error: Not Enough Seats" });
          return;
        }
        mainContext
          .fetchUserInfo(ride.ownerUsername, authToken)
          .then((driver) => {
            // Step 1: Create PaymentIntent over Stripe API
            mainContext
              .createPaymentIntent(
                {
                  rideID: rideCheckoutDetails.ride._id,
                  requestID: rideCheckoutDetails.requestID,
                  riderUsername: currentUserName,
                },
                authToken
              )
              .then((clientSecret) => {
                this.setState({
                  clientSecret: clientSecret,
                  disabled: true,
                  processing: true,
                  rideID: rideCheckoutDetails.ride._id,
                  requestID: rideCheckoutDetails.requestID,
                  riderUsername: currentUserName,
                  driverStripeAcct: driver.stripe.accountID,
                });
                // Step 2: Use clientSecret from PaymentIntent to handle payment in stripe.handleCardPayment() call
                this.props.stripe
                  .handleCardPayment(this.state.clientSecret)
                  .then((payload) => {
                    if (payload.error) {
                      this.setState({
                        error: `Payment failed: ${payload.error.message}`,
                        disabled: false,
                        processing: false,
                      });
                      console.log("[error]", payload.error);
                    } else {
                      this.setState({
                        processing: false,
                        succeeded: true,
                        error: "",
                        metadata: payload.paymentIntent,
                      });
                      console.log("[PaymentIntent]", payload.paymentIntent);
                    }
                  });
              })
              .catch((err) => {
                this.setState({ error: err.error });
                return;
              });
          })
          .catch((err) => {
            console.log(err);
            this.setState({ error: err.message });
            return;
          });
      });
  }

  renderSuccess() {
    const triggerSuccessfulPaymentFlow = () => {
      const mainContext = this.props.mainContext;
      const cookies = new Cookies();
      const authToken = cookies.get("authToken");

      // TODO: Fix this so it gets the correct appFee
      mainContext
        .triggerSuccessfulPayment(
          {
            id: this.state.metadata.id,
            metadata: {
              rideID: this.state.rideID,
              requestID: this.state.requestID,
              riderUsername: this.state.riderUsername,
              driverStripeAcct: this.state.driverStripeAcct,
              appFee: 0.1,
            },
            amount:
              (this.state.metadata.amount - this.state.metadata.amount * 0.1) *
              100,
          },
          authToken
        )
        .then((successful) => {
          if (successful) {
            console.log("Successfully Joined Ride");
          } else {
            console.log("Could not join Ride");
          }
        });
    };

    return (
      <div className="sr-field-success message">
        <h1>Your test payment succeeded</h1>
        <p>View PaymentIntent response:</p>
        <pre className="sr-callout">
          <code>{JSON.stringify(this.state.metadata, null, 2)}</code>
        </pre>
        <Button
          style={{
            backgroundColor: "#3d77ff",
            borderWidth: "0px",
            color: "white",
            boxShadow: "none",
            width: "265px",
            height: "50px",
            borderRadius: "10px",
            marginTop: "25px",
          }}
          onClick={() => triggerSuccessfulPaymentFlow()}
        >
          Trigger Successful Flow Payment
        </Button>
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
          color: "#aab7c4",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    };
    return (
      <form onSubmit={this.handleSubmit}>
        <h1>
          {"Total: "}
          {this.state.currency.toLocaleUpperCase()}{" "}
          {this.state.amount.toLocaleString(navigator.language, {
            minimumFractionDigits: 2,
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
