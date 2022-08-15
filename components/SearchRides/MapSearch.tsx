import { Text, StyleSheet, Image, View, } from "react-native";
import MapView, { Marker } from "react-native-maps";
import React from "react";
import pinIcon from "../../components/pin2.png";
import { Location } from "../../types/Rides";
import { fetchAddress } from "../../services/address";
import Pin from "../basic/Pin";


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
        <Pin label='START'/>
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
        <Pin label='FINISH'/>
      </Marker>
    </MapView>

  );
}