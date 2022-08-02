import { User } from "./User";

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
    stops: [Stop]
}

export type RideSearch = {
  start: number,
  finish: number,
  ride: Ride;
}


export const fetchAddress = async (latitude: number, longitude: number) => {
    try {
      const response = await fetch(
        `http://api.positionstack.com/v1/reverse?access_key=f1e15b07199675967ec63b981354a130&query=${latitude},${longitude}&limit=1`
      );
      const { data } = await response.json();
      alert(data[0])
      return data[0].label;
    } catch (e) {
      alert(e);
    }
  };