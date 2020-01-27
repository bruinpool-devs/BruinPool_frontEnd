import React, { useReducer } from "react";
import Cookies from "universal-cookie";
import axios from "axios";
import MainContext from "./mainContext";
import MainReducer from "./mainReducer";
import {
  LOGIN,
  COOKIE_AUTH,
  SET_FILTER,
  FETCH_RIDE_FEED,
  FETCH_MORE_RIDE_FEED,
  FETCH_UPCOMING_RIDE,
  INCREMENT_RIDER_NUM,
  FETCH_DRIVE_HISTORY,
  FETCH_MORE_DRIVE_HISTORY,
  FETCH_UPCOMING_DRIVE,
  INCREMENT_DRIVER_NUM,
  TOGGLE_EDIT_MODAL,
  TOGGLE_INFO_MODAL,
  FETCH_NOTIFICATION
} from "./types";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

const MainState = ({ children }) => {
  const initialState = {
    authToken: "",
    userInfo: false,
    rideFeed: [],
    driveHistory: [],
    upcomingRide: [],
    upcomingDrive: [],
    riderPageNum: 1,
    driverPageNum: 1,
    filter: null,
    editModal: false,
    infoModal: false,
    newNoti: [],
    oldNoti: []
  };

  const [state, dispatch] = useReducer(MainReducer, initialState);

  // SIGNUP
  const signup = (password, username, name) => {
    const signupInfo = {
      password,
      username,
      name
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
  const login = async (email, password) => {
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
          dispatch({
            type: LOGIN,
            payload: res.data
          });

          console.log(res.data.authToken);

          validity = true;
        }
      })
      .catch(error => {
        console.error(error);
      });

    return validity;
  };

  // AUTHENTICATE COOKIE
  const cookieAuth = authToken => {
    authToken = authToken || state.authToken;
    axios
      .get("/login", {
        params: {
          authToken,
          type: "cookie"
        }
      })
      .then(res => {
        if (res.data.length !== 0) {
          dispatch({
            type: COOKIE_AUTH,
            payload: res.data[0]
          });
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  // LOGOUT
  const logout = () => {
    const cookies = new Cookies();
    cookies.remove("authToken");
    window.location.reload();
  };

  // GET RIDE Details
  const rideDetails = rideID => {
    return axios
      .get("/rides/ride-details", {
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
      });
  };

  // POST RIDE
  const postRide = info => {
    const { userInfo } = state;

    if (!info.seats || info.seats === 0) {
      alert("Please enter valid number of seats!");
      return;
    }

    if (!info.from || !info.to) {
      alert("Please enter valid destination info!");
      return;
    }

    const rideInfo = {
      ownerEmail: userInfo.email,
      ownerUsername: userInfo.username,
      ownerPhoneNumber: userInfo.phoneNumber,
      from: info.from,
      to: info.to,
      date: info.date,
      seats: info.seats,
      price: info.price,
      detail: info.detail,
      passengers: []
    };

    axios
      .post("/rideList", {
        rideInfo
      })
      .then(() => {
        alert("Posted!");
        fetchUpcomingDrive();
        fetchDriveHistory();
        fetchRideFeed();
      })
      .catch(error => {
        console.error(error);
      });
  };

  // WITHDRAW REQUEST
  const withdrawRequest = requestID => {
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
  const archiveRequest = requestID => {
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
  const approveRequest = requestID => {
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
  const declineRequest = requestID => {
    return axios
      .put("/request/decline", {
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

  // JOIN RIDE
  const joinRide = entry => {
    const { userInfo, authToken } = state;
    entry.passengers.push(userInfo.username);

    axios
      .put("/rideList", {
        entry,
        userInfo,
        status: "join"
      })
      .then(() => {
        alert("Joined!");
        cookieAuth(authToken);
        fetchRideFeed();
        fetchUpcomingRide();
      })
      .catch(error => {
        console.error(error);
      });
  };

  // CANCEL RIDE
  const cancelRide = entry => {
    const { userInfo, authToken } = state;
    const ind = entry.passengers.indexOf(userInfo.username);
    entry.passengers.splice(ind, 1);

    axios
      .put("/rideList", {
        entry,
        userInfo,
        status: "cancel"
      })
      .then(() => {
        alert("Canceled!");
        cookieAuth(authToken);
        fetchRideFeed();
        fetchUpcomingRide();
      })
      .catch(error => {
        console.error(error);
      });
  };

  // EDIT RIDE
  const editRide = entry => {
    const { authToken } = state;
    axios
      .put("/rideList", {
        entry
      })
      .then(() => {
        alert("Edited!");
        cookieAuth(authToken);
        fetchUpcomingDrive();
        fetchDriveHistory();
        fetchRideFeed();
      })
      .catch(error => {
        console.error(error);
      });
  };

  // FETCH RIDE FEED
  const fetchRideFeed = filter => {
    const { riderPageNum } = state;
    dispatch({
      type: SET_FILTER,
      payload: filter
    });

    axios
      .get("/rideList", {
        params: {
          filter,
          pageNum: riderPageNum,
          type: "rideFeed"
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

  // FETCH MORE RIDE FEED
  const fetchMoreRideFeed = () => {
    const { filter, riderPageNum, rideFeed } = state;

    axios
      .get("/rideList", {
        params: {
          filter,
          pageNum: riderPageNum,
          type: "rideFeedMore"
        }
      })
      .then(res => {
        dispatch({
          type: FETCH_MORE_RIDE_FEED,
          payload: rideFeed.concat(res.data)
        });
      })
      .catch(error => {
        console.error(error);
      });

    dispatch({
      type: INCREMENT_RIDER_NUM,
      payload: riderPageNum + 1
    });
  };

  // FETCH UPCOMING RIDE
  const fetchUpcomingRide = () => {
    const { userInfo } = state;

    axios
      .get("/rideList", {
        params: {
          userInfo,
          type: "rideUpcoming"
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

  // FETCH DRIVE HISTORY
  const fetchDriveHistory = () => {
    const { userInfo, driverPageNum } = state;
    axios
      .get("/rideList", {
        params: {
          userInfo,
          pageNum: driverPageNum,
          type: "driveHistory"
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

  // FETCH MORE DRIVE HISTORY
  const fetchMoreDriveHistory = () => {
    const { userInfo, driveHistory, driverPageNum } = state;

    axios
      .get("/rideList", {
        params: {
          userInfo,
          pageNum: driverPageNum,
          type: "driveHistoryMore"
        }
      })
      .then(res => {
        dispatch({
          type: FETCH_MORE_DRIVE_HISTORY,
          payload: driveHistory.concat(res.data)
        });
      })
      .catch(error => {
        console.error(error);
      });

    dispatch({
      type: INCREMENT_DRIVER_NUM,
      payload: driverPageNum + 1
    });
  };

  // FETCH UPCOMING DRIVE
  const fetchUpcomingDrive = () => {
    const { userInfo } = state;
    axios
      .get("/rideList", {
        params: {
          userInfo,
          type: "driveUpcoming"
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

  // CANCEL DRIVE
  const cancelDrive = ride => {
    const { authToken } = state;
    axios
      .delete("/rideList", {
        params: {
          ride
        }
      })
      .then(() => {
        alert("Deleted!");
        cookieAuth(authToken);
        fetchDriveHistory();
        fetchUpcomingDrive();
        fetchRideFeed();
      })
      .catch(error => {
        console.error(error);
      });
  };

  // TOGGLE EDIT MODAL
  const toggleEditModal = entry => {
    dispatch({
      type: TOGGLE_EDIT_MODAL,
      payload: entry
    });
  };

  // TOGGLE INFO MODAL
  const toggleInfoModal = entry => {
    dispatch({
      type: TOGGLE_INFO_MODAL,
      payload: entry
    });
  };

  // FETCH NOTIFICATIONS
  const fetchNotification = authToken => {
    const notiDivider = noti => {
      const newNoti = [];
      const oldNoti = [];

      noti.forEach(item => {
        if (item.viewed) {
          oldNoti.push(item);
        } else {
          newNoti.push(item);
        }
      });

      return [newNoti, oldNoti];
    };

    axios
      .get("/notification", {
        params: {
          authToken
        }
      })
      .then(res => {
        dispatch({
          type: FETCH_NOTIFICATION,
          payload: notiDivider(res.data)
        });
      })
      .catch(error => {
        console.error(error);
      });
  };

  // CLEAR NOTIFICATIONS
  const clearNotification = () => {
    const { userInfo } = state;

    axios
      .put("/notification", {
        email: userInfo.email
      })
      .then(() => {
        return;
      })
      .catch(error => {
        console.error(error);
      });
  };

  // FETCH PROFILE PICTURE
  const fetchProfilePic = (username, cb) => {
    axios
      .get("/usersPic", {
        params: {
          username
        }
      })
      .then(res => {
        cb(res.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  // GET PUBLIC STRIPE KEY
  const getPublicStripeKey = () => {
    return axios
      .get("/stripe/public-key")
      .then(res => {
        return res.data;
      })
      .catch(err => {
        throw err;
      });
  };

  // CREAT PAYMENT INTENT
  const createPaymentIntent = options => {
    return axios
      .post("/stripe/create-payment-intent", options)
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
        authToken: state.authToken,
        userInfo: state.userInfo,
        rideFeed: state.rideFeed,
        driveHistory: state.driveHistory,
        upcomingRide: state.upcomingRide,
        upcomingDrive: state.upcomingDrive,
        riderPageNum: state.riderPageNum,
        driverPageNum: state.driverPageNum,
        filter: state.filter,
        editModal: state.editModal,
        infoModal: state.infoModal,
        newNoti: state.newNoti,
        oldNoti: state.oldNoti,
        signup,
        validateUsername,
        login,
        cookieAuth,
        logout,
        rideDetails,
        postRide,
        withdrawRequest,
        archiveRequest,
        approveRequest,
        declineRequest,
        joinRide,
        cancelRide,
        editRide,
        fetchRideFeed,
        fetchMoreRideFeed,
        fetchUpcomingRide,
        fetchDriveHistory,
        fetchMoreDriveHistory,
        fetchUpcomingDrive,
        cancelDrive,
        toggleEditModal,
        toggleInfoModal,
        fetchNotification,
        clearNotification,
        fetchProfilePic,
        getPublicStripeKey,
        createPaymentIntent
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

export default MainState;
