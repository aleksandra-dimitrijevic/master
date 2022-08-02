import { View, Text, Button, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import MapView, { Marker, MapEvent } from "react-native-maps";
import React, { useState } from "react";
import { FontAwesome } from '@expo/vector-icons';
import pinIcon from "./green-pin.png";
import { Location } from "../types";
import { fetchAddress } from "../types/Rides";

type MapProps = {
  showMap : () => void,
  setCoordinates: (coordinates: Location[]) => void,
  coordinates: Location[]
}

export default function Map(props: MapProps) {
  const [label, setLabel] = useState("");

  const newMarker = async () => {
    if (props.coordinates.length) {
      let length = props.coordinates.length - 1;
      let latitude = props.coordinates[length].latitude;
      let longitude = props.coordinates[length].longitude + 0.003;
      let label = await fetchAddress(latitude, longitude);
      setLabel(label);
      props.setCoordinates([... props.coordinates, { latitude, longitude, label }]);
    } else {
      let label = await fetchAddress(44.811879, 20.464239);
      setLabel(label);
      props.setCoordinates([{ latitude: 44.811879, longitude: 20.464239, label }]);
    }
  };

  const deleteMarker = (index: number) => {
    let arr = [...props.coordinates];
    arr.splice(index, 1);
    props.setCoordinates(arr);
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
              setLabel(l);
              let arr = [...props.coordinates];
              arr[index] = { latitude, longitude, label: l };
              props.setCoordinates(arr);
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
          {props.coordinates.map((coord, index) => (
            <View key={index} style={styles.stop}>
              <View
                style={styles.stopNumber}
              >
                <Text style={{color:'white'}}>{index + 1}</Text>
              </View>
              <Text numberOfLines={1} style={{maxWidth:'85%'}}>{coord.label}</Text>
              {coord.label &&  <TouchableOpacity  onPress={() => deleteMarker(index)}  style={styles.stopNumber}>
                <Text style={{color:'white'}}>X</Text>
              </TouchableOpacity> }
            </View>
          ))}
        </ScrollView>
        <View style={{alignItems:'flex-end', marginTop:16}}>
          <TouchableOpacity style={{padding:8,backgroundColor:'#00C897', borderRadius:15}} onPress={() => props.showMap() }>
            <Text style={{color:'white'}}> RIDE INFO {' ->'}</Text>
            {/* <FontAwesome name="arrow-right" size={24} color="white" /> */}
          </TouchableOpacity> 
        </View>
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
    top: 0,
    width:'100%',
    padding:16,
    backgroundColor:'white'
  },
  stop: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth:1,
    borderColor: 'lightgrey',
    marginBottom: 8,
    borderRadius: 10,
    padding: 8,
    width:'100%'
  },
  stopNumber: {
    backgroundColor: "#00C897",
    borderRadius:50,
    paddingLeft: 8,
    paddingRight: 8,
    textAlign:'center',
    justifyContent:'center'
  },
  scrollView: {
    maxHeight: 150,
    marginTop:8,
    padding:8,
  },
});
