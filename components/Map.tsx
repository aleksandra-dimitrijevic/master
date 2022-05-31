import { View, Text, Button, StyleSheet, ScrollView } from "react-native";
import MapView, { Marker, MapEvent } from "react-native-maps";
import React, { useState } from "react";

import pinIcon from "./green-pin.png";

type Location = {
  latitude: number;
  longitude: number;
  label: string;
};

const fetchAddress = async (latitude: number, longitude: number) => {
  try {
    const response = await fetch(
      `http://api.positionstack.com/v1/reverse?access_key=f1e15b07199675967ec63b981354a130&query=${latitude},${longitude}&limit=1`
    );
    const { data } = await response.json();
    return data[0].label;
  } catch (e) {
    alert(e);
  }
};

export default function Map() {
  const [coordinates, setCoordinates] = useState<Location[]>([]);
  const [label, setLabel] = useState("");

  const newMarker = async () => {
    if (coordinates.length) {
      let length = coordinates.length - 1;
      let latitude = coordinates[length].latitude;
      let longitude = coordinates[length].longitude + 0.003;
      let label = await fetchAddress(latitude, longitude);
      setLabel(label);
      setCoordinates([...coordinates, { latitude, longitude, label }]);
    } else {
      let label = await fetchAddress(44.811879, 20.464239);
      setLabel(label);
      setCoordinates([{ latitude: 44.811879, longitude: 20.464239, label }]);
    }
  };

  const deleteMarker = (index: number) => {
    let arr = [...coordinates];
    arr.splice(index, 1);
    setCoordinates(arr);
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        width: "100%",
        height: "100%",
      }}
    >
      <MapView
        style={{
          width: "100%",
          height: "90%",
        }}
        initialRegion={{
          latitude: 44.811879,
          longitude: 20.464239,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {coordinates.map((coord, index) => (
          <Marker
            draggable
            key={index}
            image={pinIcon}
            coordinate={{ latitude: coord.latitude, longitude: coord.longitude }}
            onDragEnd={async (e) => {
              let latitude = e.nativeEvent.coordinate.latitude;
              let longitude = e.nativeEvent.coordinate.longitude;
              let l = await fetchAddress(latitude, longitude);
              setLabel(l);
              let arr = [...coordinates];
              arr[index] = { latitude, longitude, label: l };
              setCoordinates(arr);
            }}
          >
            <Text style={{fontWeight:"bold"}}>{index + 1}</Text>
          </Marker>
        ))}
      </MapView>
      <Text
        style={styles.label}
      >
        {label}
      </Text>
      <View
        style={styles.stopsWrapper}
      >
        <Button color="#00C897" title="+ New stop" onPress={() => newMarker()} />
        <ScrollView style={styles.scrollView}>
          {coordinates.map((coord, index) => (
            <View key={index} style={styles.stop}>
              <View
                style={styles.stopNumber}
              >
                <Text style={{color:'white'}}>{index + 1}</Text>
              </View>
              <Text>{coord.label}</Text>
              {coord.label && <Button title="x" color="#00C897" onPress={() => deleteMarker(index)} />}
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  map: {
    width: "100%",
    height: "90%",
  },
  label: {
    backgroundColor: "white",
    width: "100%",
    padding: 8,
    textAlign: "center",
    justifyContent: "center",
  },
  stopsWrapper: {
    position: "absolute",
    top: 32,
    width:'95%'
  },
  stop: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "white",
    marginTop: 4,
    borderRadius: 10,
    padding: 8,
    width:'100%'
  },
  stopNumber: {
    backgroundColor: "#00C897",
    paddingLeft: 8,
    paddingRight: 8,
    textAlign:'center',
    justifyContent:'center'
  },
  scrollView: {
    backgroundColor: '#E8E8E8',
    maxHeight: 150,
    marginTop:8,
    padding:8,
  },
});
