const requests = [
  {
    meta: {
      status: "approved",
      _id: "5e2c7189ad0f17552027741f",
      rideID: "5e2e5f9d1d7edd0d2242e9e0",
      senderID: "admin",
      recepientID: "test_recepient",
      msg: "Hi can I get a ride",
      numReminds: 1,
      data: "2020-01-12T22:17:21.367Z",
      seats: 1,
      luggage: 1,
      __v: 0
    },
    ride: {
      ownerEmail: "testemail@test.com",
      ownerFullName: "Sarah Smith",
      ownerUsername: "jo",
      ownerPhoneNumber: "9999999999",
      from: {
        name: "UCLA",
        location: "Los Angeles"
      },
      to: {
        name: "UCSB",
        location: "Santa Barbara"
      },
      date: "6/15/19",
      time: "2:00PM",
      price: 20,
      seats: 0,
      detail:
        "Driving from Los Angeles to UC Santa Barbara! Have 3 spots and flexible with time and drop off locations! Preferably looking for non-smokers and respectful riders!",
      passengers: []
    }
  },
  {
    meta: {
      status: "pending",
      _id: "5e2c71b0ad0f175520277420",
      rideID: "5e2e5f9d1d7edd0d2242e9e0",
      senderID: "admin",
      recepientID: "test_recepient",
      numReminds: 1,
      msg: "Hi can I get a ride",
      data: "2020-01-12T22:17:21.367Z",
      seats: 2,
      luggage: 1,
      __v: 0
    },
    ride: {
      ownerEmail: "testemail@test.com",
      ownerFullName: "Sarah Smith",
      ownerUsername: "testuser2",
      ownerPhoneNumber: "9999999999",
      from: {
        name: "UCLA",
        location: "Los Angeles"
      },
      to: {
        name: "UCSB",
        location: "Santa Barbara"
      },
      date: "5/12/19",
      time: "9:40PM",
      price: 20,
      seats: 3,
      detail:
        "some fake details about fake datas for mock testing with mock users and mock mock mock mock mock",
      passengers: []
    }
  },
  {
    meta: {
      status: "pending",
      _id: "5e2c71c2ad0f175520277421",
      rideID: "5e2e5f9d1d7edd0d2242e9e0",
      senderID: "admin",
      recepientID: "test_recepient",
      msg: "Hi can I get a ride",
      numReminds: 1,
      data: "2020-01-12T22:17:21.367Z",
      seats: 2,
      luggage: 1,
      __v: 0
    },
    ride: {
      ownerEmail: "testemail@test.com",
      ownerFullName: "Sarah Smith",
      ownerUsername: "testuser1",
      ownerPhoneNumber: "9999999999",
      from: {
        name: "UCLA",
        location: "Los Angeles"
      },
      to: {
        name: "UCSB",
        location: "Santa Barbara"
      },
      date: "6/15/19",
      time: "2:00PM",
      price: 20,
      seats: 0,
      detail:
        "Driving from Los Angeles to UC Santa Barbara! Have 3 spots and flexible with time and drop off locations! Preferably looking for non-smokers and respectful riders!",
      passengers: []
    }
  }
];

module.exports = {
  requests
};
