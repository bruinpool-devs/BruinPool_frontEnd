const createPaymentIntent = options => {
    return window
      .fetch(`http://localhost:3000/stripe/create-payment-intent?username=bin315a1`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(options)
      })
      .then(res => {
        if (res.status === 200) {
          return res.json();
        } else {
          return null;
        }
      })
      .then(data => {
        if (!data || data.error) {
          console.log("API error:", { data });
          throw new Error("PaymentIntent API Error");
        } else {
          return data.client_secret;
        }
      });
  };

  const getRideDetails = options => {
    return window
      .fetch(`/rides/ride-details?ride_id=5e0fa833668a27552c82552f`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
      })
      .then(res => {
        if (res.status === 200) {
          return res.json();
        } else {
          return null;
        }
      })
      .then(data => {
        if (!data || data.error) {
          console.log("API error:", { data });
          throw Error("API Error");
        } else {
          return data;
        }
      });
  };  
  
  const getPublicStripeKey = options => {
    return window
      .fetch(`http://localhost:3000/stripe/public-key`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(res => {
        if (res.status === 200) {
          return res.json();
        } else {
          return null;
        }
      })
      .then(data => {
        if (!data || data.error) {
          console.log("API error:", { data });
          throw Error("API Error");
        } else {
          return data.publicKey;
        }
      });
  };
  
  const api = {
    createPaymentIntent,
    getPublicStripeKey: getPublicStripeKey,
    getRideDetails: getRideDetails
  };
  
  export default api;