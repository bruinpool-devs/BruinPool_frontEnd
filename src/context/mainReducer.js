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
  FETCH_SENDER_REQUEST_FEED
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
    case FETCH_SENDER_REQUEST_FEED:
      return {
        ...state,
        requestSenderFeed: action.payload
      };
    default:
      return state;
  }
};
