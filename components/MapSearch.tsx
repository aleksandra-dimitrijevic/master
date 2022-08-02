import { View, Text, Button, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import MapView, { Marker, MapEvent } from "react-native-maps";
import React, { useState } from "react";

import pinIcon from "./green-pin.png";
import DateTimePicker from "react-native-modal-datetime-picker";
import { Location } from "../types";
import { SERVER_URL } from "../constants/Api";
import { fetchAddress, RideSearch } from "../types/Rides";

type MapSearchProps = {
  showMap : () => void,
  setRides: (rides: RideSearch[]) => void,
}


export default function MapSearch(props: MapSearchProps) {
  const [label, setLabel] = useState("");
  const [start, setStart] = useState<Location>( { latitude: 44.811879, longitude: 20.464239, label:'' });
  const [finish, setFinish] = useState<Location>({ latitude: 44.811879, longitude: 20.477285, label:''});
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [date, setDate] = useState<Date>(new Date());

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    setDate(date);
    hideDatePicker();
  };

  const onSearch = async () => {
    try {
        const response = await fetch(SERVER_URL+'/rides/search?lat1='+start.latitude+'&long1='+start.longitude+ '&lat2='+finish.latitude+'&long2='+finish.longitude);
        const json = await response.json();
        if( response.status>399){
            alert(json.msg)
        } else {
            props.setRides(json.response);
            props.showMap();
        }
    } catch(error){
        alert("Error, please try again");
    }
}

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
        <View style={styles.stop}>
              <View
                style={styles.stopNumber}
              >
                <Text style={{color:'white'}}>START</Text>
              </View>
              <Text numberOfLines={1} style={{maxWidth:'85%'}}>{start.label}</Text>
            </View>
            <View style={styles.stop}>
              <View
                style={styles.stopNumber}
              >
                <Text style={{color:'white'}}>FINISH</Text>
              </View>
              <Text numberOfLines={1} style={{maxWidth:'85%'}}>{finish.label}</Text>
            </View>
            
            <TouchableOpacity style={styles.stop} onPress={showDatePicker}>
              <View
                  style={styles.stopNumber}
                >
                  <Text style={{color:'white'}}>DATE</Text>
                </View>
              <Text>{date?.toLocaleDateString()}</Text>
              <DateTimePicker
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />
            </TouchableOpacity>
           
            <View style ={{marginTop:8}}>
              <Button color="#00C897" title="Search" onPress={onSearch} />
            </View>
        
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
    width:'100%',
    padding:16,
    backgroundColor:'white'
  },
  stop: {
    flexDirection: "row",
    borderWidth:1,
    borderColor: 'lightgrey',
    marginBottom: 8,
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
  }
});
