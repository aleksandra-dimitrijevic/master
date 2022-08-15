import { User } from "./User";

export type Location = {
  latitude: number;
  longitude: number;
  label: string;
};


export type Stop = {
  _id?:any
  number: number,
  location: {
      type: string,
      coordinates: number[],
  },
  label?:string,
};


export type Ride = {
    _id?: any
    driver: User;
    passengersNumber: number;
    date: Date;
    stops: [Stop],
    availableSeats:number,
    passengers: [{
      user: User,
      start: number,
      finish: number
    }]
}

export type RideSearch = {
  start: number,
  finish: number,
  ride: Ride;
}