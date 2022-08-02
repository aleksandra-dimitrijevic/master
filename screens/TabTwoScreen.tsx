import { Button, StyleSheet } from "react-native";
import { View } from "../components/Themed";
import AddRideInfo from "../components/AddRideInfo";
import Map from "../components/Map";
import { useState } from "react";
import { Location } from "../types";
import { SERVER_URL } from "../constants/Api";
import { StackRouter } from "@react-navigation/native";
import { getCurrentUser } from "../types/User";

export default function TabTwoScreen( {navigation}:any) {
  const [showMap, setShowMap] = useState(true);
  const [coordinates, setCoordinates] = useState<Location[]>([]);
  const [date, setDate] = useState<Date>(new Date());
  const [time, setTime] = useState<Date>(new Date());
  const [count, setCount] = useState(3);

  const onSubmit = async () => {
    try {
        const user = await getCurrentUser();
        if(!user) alert("Please log in to add a ride!")
        date.setHours(time.getHours())
        date.setMinutes(time.getMinutes())
        const data = {
          date,
          passengersNumber: count,
          driver: user._id,
          stops: coordinates
        }
        const response = await fetch(SERVER_URL+'/rides' , {
            method:'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        const json = await response.json();
        if( response.status>399){
            alert(json.msg)
        } else {
            alert('Ride successfully added!')
            navigation.navigate('TabRides')
        }
    } catch(error){
        alert("Error, please try again");
    }
}

  return (
    <View style={styles.container}>
      {showMap && (
        <Map
          showMap={() => setShowMap(false)}
          setCoordinates={(coordinates: Location[]) => setCoordinates(coordinates)}
          coordinates={coordinates}
        ></Map>
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
