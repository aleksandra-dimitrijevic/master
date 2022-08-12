import { Text, StyleSheet, } from "react-native";
import MapView, { Marker } from "react-native-maps";
import React from "react";
import pinIcon from "../green-pin.png";
import { Location } from "../../types";
import { fetchAddress } from "../../types/Rides";


type MapSearchProps = {
  start: Location,
  finish: Location,
  setStart: (l: Location) => void,
  setFinish: (l: Location) => void,
}
const initRegion = {
  latitude: 44.811879,
  longitude: 20.464239,
  latitudeDelta: 0.095,
  longitudeDelta: 0.0421,
}

export default function MapSearch({ start, finish, setStart, setFinish }: MapSearchProps) {

  return (
    <MapView
      style={{
        width: '100%',
        height: '100%',
      }}
      initialRegion={initRegion}
    >
      <Marker
        draggable
        image={pinIcon}
        coordinate={{ latitude: start.latitude, longitude: start.longitude }}
        onDragEnd={async (e) => {
          const { latitude, longitude } = e.nativeEvent.coordinate;
          let l = await fetchAddress(latitude, longitude);
          setStart({ latitude, longitude, label: l })
        }}
      >
        <Text style={{ fontWeight: "bold" }}>START</Text>
      </Marker>
      <Marker
        draggable
        image={pinIcon}
        coordinate={{ latitude: finish.latitude, longitude: finish.longitude }}
        onDragEnd={async (e) => {
          const { latitude, longitude } = e.nativeEvent.coordinate;
          let l = await fetchAddress(latitude, longitude);
          setFinish({ latitude, longitude, label: l })
        }}
      >
        <Text style={{ fontWeight: "bold" }}>FINISH</Text>
      </Marker>
    </MapView>

  );
}