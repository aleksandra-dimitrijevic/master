import { Alert, StyleSheet, View } from "react-native";
import AddRideInfo from "../components/AddRide/AddRideInfo";
import AddStops from "../components/AddRide/AddStops";
import { useState } from "react";
import { Location } from "../types/Rides";
import { getCurrentUser } from "../types/User";
import { request } from "../services/request";

export default function TabAddRideScreen( {navigation}:any) {
  const [showMap, setShowMap] = useState(true);
  const [coordinates, setCoordinates] = useState<Location[]>([]);
  const [date, setDate] = useState<Date>(new Date());
  const [time, setTime] = useState<Date>(new Date());
  const [count, setCount] = useState(3);

  const onSubmit = async () => {
    try {
        const user = await getCurrentUser();
        if(!user) Alert.alert('Not Authorized', 'Please log in to  add the new ride.')
        date.setHours(time.getHours())
        date.setMinutes(time.getMinutes())
        const data = {
          date,
          passengersNumber: count,
          driver: user._id,
          stops: coordinates
        }
        const json = await request({
          url: '/rides',
          method: 'POST',
          body: data
      })

      alert('Ride successfully added!')
      navigation.navigate('TabRides')
       
    } catch(error){
        //alert("Error, please try again");
    }
}

  return (
    <View style={styles.container}>
      {showMap && (
        <AddStops
          showMap={() => setShowMap(false)}
          setCoordinates={(coordinates: Location[]) => setCoordinates(coordinates)}
          coordinates={coordinates}
        />
      )}
      {!showMap && (
        <AddRideInfo
          showMap={() => setShowMap(true)}
          date={date}
          setDate={(date) => setDate(date)}
          time={time}
          setTime={(time) => {setTime(time)}}
          count={count}
          setCount={(count) => setCount(count)}
          submit = {onSubmit}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
