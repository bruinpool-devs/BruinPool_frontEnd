import {
  LOGIN,
  SET_FILTER,
  FETCH_RIDE_FEED,
  FETCH_UPCOMING_RIDE,
  FETCH_RIDE_HISTORY,
  INCREMENT_RIDER_NUM,
  FETCH_DRIVE_HISTORY,
  FETCH_UPCOMING_DRIVE,
  INCREMENT_DRIVER_NUM,
  FETCH_NOTIFICATION,
  FETCH_REVIEWS,
  FETCH_PROFILE_PIC,
  FETCH_RIDER_REQUEST_FEED,
  FETCH_DRIVER_REQUEST_FEED,
  FETCH_PUBLIC_PROFILE
} from "./types";

export default (state, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        userInfo: action.payload
      };
    case SET_FILTER:
      return {
        ...state,
        filter: action.payload
      };
    case FETCH_RIDE_FEED:
      return {
        ...state,
        rideFeed: action.payload
      };
    case FETCH_UPCOMING_RIDE:
      return {
        ...state,
        upcomingRide: action.payload
      };
    case FETCH_RIDE_HISTORY:
      return {
        ...state,
        rideHistory: action.payload
      };
    case INCREMENT_RIDER_NUM:
      return {
        ...state,
        riderPageNum: action.payload
      };
    case FETCH_DRIVE_HISTORY:
      return {
        ...state,
        driveHistory: action.payload
      };
    case FETCH_UPCOMING_DRIVE:
      return {
        ...state,
        upcomingDrive: action.payload
      };
    case INCREMENT_DRIVER_NUM:
      return {
        ...state,
        driverPageNum: action.payload
      };
    case FETCH_NOTIFICATION:
      return {
        ...state,
        noti: action.payload
      };
    case FETCH_REVIEWS:
      return {
        ...state,
        reviews: action.payload
      };
    case FETCH_PROFILE_PIC:
      return {
        ...state,
        profilePic: action.payload
      };
    case FETCH_PUBLIC_PROFILE:
      return {
        ...state,
        publicProfile: action.payload
      };
    case FETCH_RIDER_REQUEST_FEED:
      return {
        ...state,
        requestRiderFeed: action.payload
      };
    case FETCH_DRIVER_REQUEST_FEED:
      return {
        ...state,
        requestDriverFeed: action.payload
      };
    default:
      return state;
  }
};
