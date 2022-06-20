import { Button, StyleSheet } from "react-native";
import { View } from "../components/Themed";
import AddRideInfo from "../components/AddRideInfo";
import Map from "../components/Map";
import { useState } from "react";
import { Location } from "../types";

export default function TabTwoScreen() {
  const [showMap, setShowMap] = useState(true);
  const [coordinates, setCoordinates] = useState<Location[]>([]);
  const [date, setDate] = useState<Date>(new Date());
  const [time, setTime] = useState<Date>(new Date());
  const [count, setCount] = useState(3);

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
