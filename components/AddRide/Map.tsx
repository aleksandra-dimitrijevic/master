import { Text, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import React from "react";
import pinIcon from "../../assets/images/pin2.png";
import { Location } from "../../types/Rides";
import { fetchAddress } from "../../types/Rides";

const initRegion = {
    latitude: 44.811879,
    longitude: 20.464239,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
}

type MapProps = {
  setCoordinates: (coordinates: Location[]) => void,
  coordinates: Location[]
}

export default function Map(props: MapProps) {
  
  return (
      <MapView
        style={styles.map}
        initialRegion={initRegion}
      >
        {props.coordinates.map((coord, index) => (
          <Marker
            draggable
            key={index}
            image={pinIcon}
            coordinate={{ latitude: coord.latitude, longitude: coord.longitude }}
            onDragEnd={async (e) => {
              let latitude = e.nativeEvent.coordinate.latitude;
              let longitude = e.nativeEvent.coordinate.longitude;
              let l = await fetchAddress(latitude, longitude);
              let arr = [...props.coordinates];
              arr[index] = { latitude, longitude, label: l };
              props.setCoordinates(arr);
            }}
          >
            <Text style={{fontWeight:"bold"}}>{index + 1}</Text>
          </Marker>
        ))}
      </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  }
});
