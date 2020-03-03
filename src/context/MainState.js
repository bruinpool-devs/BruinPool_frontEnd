import React, { useReducer } from "react";
import Cookies from "universal-cookie";
import axios from "axios";
import MainContext from "./mainContext";
import MainReducer from "./mainReducer";
import {
  LOGIN,
  SET_FILTER,
  FETCH_RIDE_FEED,
  FETCH_UPCOMING_RIDE,
  FETCH_RIDE_HISTORY,
  FETCH_DRIVE_HISTORY,
  FETCH_UPCOMING_DRIVE,
  FETCH_SENDER_REQUEST_FEED,
  FETCH_NOTIFICATION
} from "./types";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

const MainState = ({ children }) => {
  const initialState = {
    rideFeed: [],
    requestSenderFeed: [],
    rideHistory: [],
    driveHistory: [],
    upcomingRide: [],
    upcomingDrive: [],
    riderPageNum: 0,
    driverPageNum: 0,
    filter: null,
    noti: []
  };

  const [state, dispatch] = useReducer(MainReducer, initialState);

  // SIGNUP
  const signup = (password, username) => {
    const signupInfo = {
      password,
      username
    };

    axios
      .post("/users/signup", signupInfo)
      .then(() => {
        alert("User signed up!");
      })
      .catch(error => {
        console.error(error);
      });
  };

  // VALIDATE USERNAME
  const validateUsername = async username => {
    var validity = "";

    await axios
      .get("/users/usernameValidation", {
        params: {
          username
        }
      })
      .then(res => {
        if (res.data.length === 0) {
          validity = "true";
        } else {
          validity = "false";
        }
      })
      .catch(error => {
        console.error(error);
      });

    return validity;
  };

  // LOGIN
  const login = async (username, email, password) => {
    const cookies = new Cookies();
    const loginInfo = {
      email,
      password
    };

    var validity = false;

    await axios
      .post("/users/login", loginInfo)
      .then(res => {
        if (res.status === 200) {
          cookies.set("authToken", res.data.authToken, { path: "/" });
          cookies.set("userName", username, { path: "/" });
          dispatch({
            type: LOGIN,
            payload: res.data
          });

          validity = true;
        }
      })
      .catch(error => {
        console.error(error);
      });

    return validity;
  };

  // LOGOUT
  const logout = () => {
    const cookies = new Cookies();
    cookies.remove("authToken");
    window.location.reload();
  };

  // GET RIDE DETAILS
  const rideDetails = (rideID, token) => {
    return axios
      .get("/rides/ride-details", {
        params: {
          rideID: rideID
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => {
        if (res.status === 200) {
          return res.data;
        } else {
          return null;
        }
      })
      .then(data => {
        if (!data || data.error) {
          console.log("API error:", { data });
          throw Error("Ride Details Error");
        } else {
          return data;
        }
      });
  };

  // FETCH REQUEST FEED
  const fetchSenderRequestFeed = token => {
    axios
      .get("/request/sender", {
        params: {
          status: "visible",
          senderID: "admin-noreply"
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => {
        dispatch({
          type: FETCH_SENDER_REQUEST_FEED,
          payload: res.data
        });
      })
      .catch(error => {
        console.error(error);
      });
  };

  // WITHDRAW REQUEST
  const withdrawRequest = (requestID, token) => {
    return axios
      .put("/request/cancel", {
        params: {
          requestID
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => {
        return res.data;
      })
      .catch(error => {
        console.error(error);
      });
  };

  // ARCHIVE REQUEST
  const archiveRequest = (requestID, token) => {
    return axios
      .put("/request/archive", {
        params: {
          requestID
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => {
        return res.data;
      })
      .catch(error => {
        console.error(error);
      });
  };

  // ACCEPT REQUEST
  const approveRequest = (requestID, token) => {
    return axios
      .put("/request/approve", {
        params: {
          requestID
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => {
        return res.data;
      })
      .catch(error => {
        console.error(error);
      });
  };

  // DECLINE REQUEST
  const denyRequest = (requestID, token) => {
    return axios
      .put("/request/deny", {
        params: {
          requestID
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => {
        return res.data;
      })
      .catch(error => {
        console.error(error);
      });
  };

  // POST RIDE
  const postRide = (info, token) => {
    const rideObject = {
      rideInfo: info
    };

    axios
      .post("/rides/post-ride", rideObject, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(() => {
        alert("Ride posted!");
        fetchRideFeed({}, token);
      })
      .catch(error => {
        console.error(error);
      });
  };

  // JOIN RIDE
  const joinRide = (entry, token) => {
    const rideObject = {
      ride: entry
    };

    axios
      .put("/rides/join-ride", rideObject, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(() => {
        fetchRideFeed({}, token);
        fetchUpcomingRide(token);
      })
      .catch(error => {
        console.error(error);
      });
  };

  // CANCEL RIDE
  const cancelRide = (entry, token) => {
    const rideObject = {
      ride: entry
    };

    axios
      .put("/rides/cancel-ride", rideObject, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(() => {
        alert("Ride cancelled!");
        fetchRideFeed({}, token);
        fetchUpcomingRide(token);
      })
      .catch(error => {
        console.error(error);
      });
  };

  // DELETE RIDE
  const deleteRide = (entry, token) => {
    const rideObject = {
      ride: entry
    };

    axios
      .delete("/rides/delete-ride", rideObject, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(() => {
        alert("Ride deleted!");
        fetchRideFeed({}, token);
        fetchUpcomingRide(token);
      })
      .catch(error => {
        console.error(error);
      });
  };

  // EDIT RIDE
  const editRide = entry => {
    axios
      .put("/rideList", {
        entry
      })
      .then(() => {
        alert("Edited!");
        fetchUpcomingDrive();
        fetchDriveHistory();
        fetchRideFeed();
      })
      .catch(error => {
        console.error(error);
      });
  };

  // FETCH RIDE FEED
  const fetchRideFeed = (filter, token) => {
    const { riderPageNum } = state;
    dispatch({
      type: SET_FILTER,
      payload: filter
    });

    axios
      .get("/rides/matching-rides", {
        params: {
          filter,
          pageNum: riderPageNum
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => {
        dispatch({
          type: FETCH_RIDE_FEED,
          payload: res.data
        });
      })
      .catch(error => {
        console.error(error);
      });
  };

  // FETCH UPCOMING RIDE
  const fetchUpcomingRide = token => {
    const { riderPageNum } = state;

    axios
      .get("/rides/my-rides-upcoming", {
        params: {
          pageNum: riderPageNum
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => {
        dispatch({
          type: FETCH_UPCOMING_RIDE,
          payload: res.data
        });
      })
      .catch(error => {
        console.error(error);
      });
  };

  // FETCH RIDE HISTORY
  const fetchRideHistory = token => {
    const { riderPageNum } = state;

    axios
      .get("/rides/my-rides-history", {
        params: {
          pageNum: riderPageNum
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => {
        dispatch({
          type: FETCH_RIDE_HISTORY,
          payload: res.data
        });
      })
      .catch(error => {
        console.error(error);
      });
  };

  // FETCH DRIVE HISTORY
  const fetchDriveHistory = (username, token) => {
    const { driverPageNum } = state;

    axios
      .get("/rides/drives-history", {
        params: {
          pageNum: driverPageNum,
          username
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => {
        dispatch({
          type: FETCH_DRIVE_HISTORY,
          payload: res.data
        });
      })
      .catch(error => {
        console.error(error);
      });
  };

  // FETCH UPCOMING DRIVE
  const fetchUpcomingDrive = (username, token) => {
    const { driverPageNum } = state;

    axios
      .get("/rides/drives-upcoming", {
        params: {
          pageNum: driverPageNum,
          username
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => {
        dispatch({
          type: FETCH_UPCOMING_DRIVE,
          payload: res.data
        });
      })
      .catch(error => {
        console.error(error);
      });
  };

  // FETCH NOTIFICATIONS
  const fetchNotification = token => {
    axios
      .get("/notis/get-driverNotis", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => {
        dispatch({
          type: FETCH_NOTIFICATION,
          payload: res.data
        });
      })
      .catch(error => {
        console.error(error);
      });
  };

  // CREATE NOTIFICATION
  const createNotification = token => {
    const notiObject = {
      msg: "Sarah has accepted your ride request!",
      passengerPhoneNumber: "2132470148",
      passengerEmail: "jhan25@g.ucla.edu"
    };

    axios
      .post("/notis/create-driverNoti", notiObject, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(() => {
        alert("Noti created!");
        fetchNotification(token);
      })
      .catch(error => {
        console.error(error);
      });
  };

  // VIEW NOTIFICATION
  const viewNotification = token => {
    axios
      .put("/notis/view-driverNoti", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(() => {
        alert("Notis viewed!");
        fetchNotification(token);
      })
      .catch(error => {
        console.error(error);
      });
  };

  // GET PUBLIC STRIPE KEY
  const getPublicStripeKey = token => {
    return axios
      .get("/stripe/public-key", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => {
        return res.data;
      })
      .catch(err => {
        throw err;
      });
  };

  // CREAT PAYMENT INTENT
  const createPaymentIntent = (options, token) => {
    return axios
      .post("/stripe/create-payment-intent", {
        options,
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => {
        if (res.status === 200) {
          return res.data.clientSecret;
        } else {
          return null;
        }
      })
      .catch(err => {
        throw err;
      });
  };

  return (
    <MainContext.Provider
      value={{
        rideFeed: state.rideFeed,
        requestSenderFeed: state.requestSenderFeed,
        rideHistory: state.rideHistory,
        driveHistory: state.driveHistory,
        upcomingRide: state.upcomingRide,
        upcomingDrive: state.upcomingDrive,
        riderPageNum: state.riderPageNum,
        driverPageNum: state.driverPageNum,
        filter: state.filter,
        noti: state.noti,
        signup,
        validateUsername,
        login,
        logout,
        rideDetails,
        fetchSenderRequestFeed,
        postRide,
        withdrawRequest,
        archiveRequest,
        approveRequest,
        denyRequest,
        joinRide,
        cancelRide,
        deleteRide,
        editRide,
        fetchRideFeed,
        fetchUpcomingRide,
        fetchRideHistory,
        fetchDriveHistory,
        fetchUpcomingDrive,
        fetchNotification,
        createNotification,
        viewNotification,
        getPublicStripeKey,
        createPaymentIntent
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

export default MainState;
