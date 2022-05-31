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

export default function MapSearch() {
  const [coordinates, setCoordinates] = useState<Location[]>([]);
  const [label, setLabel] = useState("");
  const [start, setStart] = useState<Location>( { latitude: 44.811879, longitude: 20.464239, label:'' });
  const [finish, setFinish] = useState<Location>({ latitude: 44.811879, longitude: 20.477285, label:''});

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
         <Marker
            draggable
            image={pinIcon}
            coordinate={{ latitude: start.latitude, longitude: start.longitude }}
            onDragEnd={async (e) => {
              let latitude = e.nativeEvent.coordinate.latitude;
              let longitude = e.nativeEvent.coordinate.longitude;
              let l = await fetchAddress(latitude, longitude);
              setLabel(l);
              setStart({ latitude, longitude, label: l })
            }}
          >
            <Text style={{fontWeight:"bold"}}>START</Text>
          </Marker>
          <Marker
            draggable
            image={pinIcon}
            coordinate={{ latitude: finish.latitude, longitude: finish.longitude }}
            onDragEnd={async (e) => {
              let latitude = e.nativeEvent.coordinate.latitude;
              let longitude = e.nativeEvent.coordinate.longitude;
              let l = await fetchAddress(latitude, longitude);
              setLabel(l);
              setFinish({ latitude, longitude, label: l })
            }}
          >
            <Text style={{fontWeight:"bold"}}>FINISH</Text>
          </Marker>
      </MapView>
     
      <View
        style={styles.stopsWrapper}
      >
        <ScrollView style={styles.scrollView}>
        <View style={styles.stop}>
              <View
                style={styles.stopNumber}
              >
                <Text style={{color:'white'}}>START</Text>
              </View>
              <Text>{start.label}</Text>
            </View>
            <View style={styles.stop}>
              <View
                style={styles.stopNumber}
              >
                <Text style={{color:'white'}}>FINISH</Text>
              </View>
              <Text>{finish.label}</Text>
            </View>
        </ScrollView>
      </View>
      <View style={styles.searchButton}>
        <Button color="#00C897" title="Search" onPress={() => alert('Search')} />
      </View>
      <Text
        style={styles.label}
      >
        {label}
      </Text>
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
    top: 0,
    width:'95%'
  },
  stop: {
    flexDirection: "row",
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
    borderRadius: 10,
    marginRight:8,
    textAlign:'center',
    justifyContent:'center'
  },
  scrollView: {
    backgroundColor: '#E8E8E8',
    maxHeight: 150,
    marginTop:8,
    padding:8,
  },
  searchButton:{
      position:"absolute",
      bottom:64,
      right:16
  }
});
