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
  FETCH_NOTIFICATION,
  FETCH_REVIEWS,
  FETCH_PROFILE_PIC,
  FETCH_RIDER_REQUEST_FEED,
  FETCH_DRIVER_REQUEST_FEED,
  FETCH_PUBLIC_PROFILE
} from "./types";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

const MainState = ({ children }) => {
  const initialState = {
    rideFeed: [],
    requestRiderFeed: [],
    requestDriverFeed: [],
    rideHistory: [],
    driveHistory: [],
    upcomingRide: [],
    upcomingDrive: [],
    riderPageNum: 0,
    driverPageNum: 0,
    filter: null,
    noti: [],
    reviews: [],
    profilePic: "",
    publicProfile: {}
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
        headers: {
          Authorization: `Bearer ${token}`
        },
        params: {
          rideID: rideID
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
      })
      .catch(error => {
        console.error(error);
      });
  };

  // FETCH RIDER REQUEST FEED
  const fetchRiderRequestFeed = (username, token) => {
    axios
      .get("/request/sender", {
        params: {
          status: "visible",
          senderID: username
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => {
        dispatch({
          type: FETCH_RIDER_REQUEST_FEED,
          payload: res.data.requests
        });
      })
      .catch(error => {
        console.error(error);
      });
  };

  // FETCH DRIVER REQUEST FEED
  const fetchDriverRequestFeed = (username, token) => {
    axios
      .get("/request/recipient", {
        params: {
          status: "visible",
          recipientID: username
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => {
        console.log(res.data.requests);
        dispatch({
          type: FETCH_DRIVER_REQUEST_FEED,
          payload: res.data.requests
        });
      })
      .catch(error => {
        console.error(error);
      });
  };

  // CREATE NEW REQUEST
  const createRequest = (requestInfo, token) => {
    return axios
      .post("/request/new", {
        requestInfo,
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
  const denyRequest = (requestID, msg, token) => {
    console.log(requestID);
    return axios
      .put("/request/deny", {
        params: {
          requestID: requestID,
          msg: msg
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

  // Remind the Recipient of the request
  const remindDriver = (requestID, token) => {
    return axios
      .get("/request/remind", {
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
      .delete("/rides/delete-ride", {
        headers: {
          Authorization: `Bearer ${token}`
        },
        data: rideObject
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

  // REDICTS DRIVER TO STRIPE AUTHENTICATION SETUP
  const redirectStripeAuth = (driverInfo, token) => {
    axios.defaults.withCredentials = true;
    return axios
      .post("/stripe/driver/auth", driverInfo, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        withCredentials: true
      })
      .then(res => {
        return res.data;
      })
      .catch(err => {
        throw err.response.data.error;
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

  // CREATE PAYMENT INTENT
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

  // ADD REVIEW
  const addReview = (entry, token) => {
    axios
      .post("/reviews", entry, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => {
        alert("Review added!");
      })
      .catch(error => {
        console.error(error);
      });
  };

  // FETCH REVIEWS
  const fetchReviews = (username, token) => {
    axios
      .get("/reviews", {
        params: {
          username
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => {
        dispatch({
          type: FETCH_REVIEWS,
          payload: res.data
        });
      })
      .catch(error => {
        console.error(error);
      });
  };

  // FETCH PROFILE PICTURE
  const fetchProfilePic = (username, token) => {
    axios
      .get("/users/usersPic", {
        params: {
          username
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => {
        dispatch({
          type: FETCH_PROFILE_PIC,
          payload: res.data
        });
      })
      .catch(error => {
        console.error(error);
      });
  };

  // UPLOAD PROFILE PICTURE
  const uploadProfilePic = (picture, token) => {
    var fileObject = new FormData();
    fileObject.append("file", picture);

    axios
      .patch("/users/upload-profile-pic", fileObject, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }
      })
      .then(() => {
        alert("Picture uploaded!");
      })
      .catch(error => {
        console.error(error);
      });
  };

  // UPDATE ABOUT ME
  const updateAboutMe = (aboutMe, token) => {
    const aboutMeObject = {
      aboutMe: aboutMe
    };

    axios
      .patch("/users/updateAboutMe", aboutMeObject, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(() => {
        alert("Profile updated!");
      })
      .catch(error => {
        console.error(error);
      });
  };

  // FETCH PUBLIC PROFILE
  const fetchPublicProfile = (username, token) => {
    return axios
      .get("/users/get-public-profile", {
        params: {
          username
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => {
        console.log(res.data);
        dispatch({
          type: FETCH_PUBLIC_PROFILE,
          payload: res.data
        });
        return res.data;
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <MainContext.Provider
      value={{
        rideFeed: state.rideFeed,
        requestRiderFeed: state.requestRiderFeed,
        requestDriverFeed: state.requestDriverFeed,
        rideHistory: state.rideHistory,
        driveHistory: state.driveHistory,
        upcomingRide: state.upcomingRide,
        upcomingDrive: state.upcomingDrive,
        riderPageNum: state.riderPageNum,
        driverPageNum: state.driverPageNum,
        filter: state.filter,
        noti: state.noti,
        reviews: state.reviews,
        profilePic: state.profilePic,
        publicProfile: state.publicProfile,
        signup,
        validateUsername,
        login,
        logout,
        rideDetails,
        fetchRiderRequestFeed,
        fetchDriverRequestFeed,
        postRide,
        createRequest,
        withdrawRequest,
        archiveRequest,
        approveRequest,
        denyRequest,
        remindDriver,
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
        addReview,
        fetchReviews,
        fetchProfilePic,
        uploadProfilePic,
        updateAboutMe,
        fetchPublicProfile,
        getPublicStripeKey,
        createPaymentIntent,
        redirectStripeAuth
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

export default MainState;
