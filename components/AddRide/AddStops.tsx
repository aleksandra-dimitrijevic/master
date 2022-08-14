import { View, Text, Button, StyleSheet, ScrollView, TouchableOpacity, Alert } from "react-native";
import React from "react";
import { Location } from "../../types/Rides";
import { fetchAddress } from "../../types/Rides";
import NewStop from "./NewStop";
import Map from "./Map";

type AddStopsProps = {
  showMap: () => void,
  setCoordinates: (coordinates: Location[]) => void,
  coordinates: Location[]
}

export default function AddStops({ showMap, setCoordinates, coordinates }: AddStopsProps) {

  const newMarker = async () => {
    if (coordinates.length) {
      let length = coordinates.length - 1;
      let latitude = coordinates[length].latitude;
      let longitude = coordinates[length].longitude + 0.003;
      let label = await fetchAddress(latitude, longitude);
      setCoordinates([...coordinates, { latitude, longitude, label }]);
    } else {
      let label = await fetchAddress(44.811879, 20.464239);
      setCoordinates([{ latitude: 44.811879, longitude: 20.464239, label }]);
    }
  };

  const deleteMarker = (index: number) => {
    let arr = [...coordinates];
    arr.splice(index, 1);
    setCoordinates(arr);
  };

  const handleToRideInfo = () => {
    if(coordinates.length < 2){
      Alert.alert('Add more than one station!','To enter more details about ride, you need at least two staions.')
    } else showMap();
  }

  return (
    <View style={styles.container}>
      <Map
        coordinates={coordinates}
        setCoordinates={setCoordinates}
      />
      <View style={styles.stopsWrapper}>
        <Button color="#00C897" title="+ New stop" onPress={newMarker} />
        <ScrollView style={styles.scrollView}>
          {coordinates.map((coord, index) => (
            <NewStop
              address={coord.label}
              index={index}
              deleteMarker={deleteMarker}
              key={index}
            />
          ))}
        </ScrollView>
        <View style={{ alignItems: 'flex-end', marginTop: 16 }}>
          <TouchableOpacity style={styles.backButton} onPress={handleToRideInfo}>
            <Text style={{ color: 'white' }}> RIDE INFO {' ->'}</Text>
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
    backgroundColor: "white",
    width: "100%",
    height: "100%",
  },
  stopsWrapper: {
    position: "absolute",
    top: 0,
    width: '100%',
    padding: 16,
    backgroundColor: 'white'
  },
  scrollView: {
    maxHeight: 150,
    marginTop: 8,
    padding: 8,
  },
  backButton:{
    padding: 8, 
    backgroundColor: '#00C897', 
    borderRadius: 15
  }
});
