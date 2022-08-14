import { Text, StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import React from "react";
import { Stop } from "../../../types/Rides";
import pinIcon from "../../../components/pin2.png";

type MapStopsProps = {
  stops: Stop[];
}

const initRegion = {
  latitude: 44.811879,
  longitude: 20.464239,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
}
export default function MapStops(props: MapStopsProps) {

  return (
      <MapView
        style={{
          width: '100%',
          height: 300,
          marginTop: 16,
        }}
        initialRegion={ initRegion}
      >
        {props.stops.map((stop, index) => (
          <Marker
            key={index}
            image={pinIcon}
            coordinate={{ latitude: stop.location.coordinates[1], longitude: stop.location.coordinates[0] }}
          >
            <Text style={{fontWeight:"bold", color:'black'}}>{index + 1}</Text>
          </Marker>
        ))}
      </MapView>
  );
}

const styles = StyleSheet.create({
  
});
