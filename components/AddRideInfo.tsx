import React from "react";
import { Button, StyleSheet, TouchableOpacity,View } from "react-native";
import { Text,} from "../components/Themed";
import { useState } from "react";
import DateTimePickerComponent from "./DateTimePickerComponent";

type AddRideInfoProps = {
  showMap: () => void;
  date: Date,
  setDate: (date:Date) => void,
  time: Date,
  setTime: (date:Date) => void,
  count: number,
  setCount:(count: number) => void
};
function AddRideInfo(props: AddRideInfoProps) {
  
  return (
    <View style={styles.container}>
       <View style={{ alignItems: "flex-start", width:400, marginLeft:16}}>
        <TouchableOpacity
          style={{ padding: 8, backgroundColor: "#00C897", borderRadius: 15 }}
          onPress={() => props.showMap()}
        >
          <Text style={{ color: "white" }}> {"<- STOPS"}</Text>
          {/* <FontAwesome name="arrow-right" size={24} color="white" /> */}
        </TouchableOpacity>
      </View>
      <View style={{ width: "80%" }}>
        <View style={styles.field}>
          <Text style={{ marginBottom: 8, color:'black' }}>Date:</Text>
          <DateTimePickerComponent mode='date' date={props.date} setDate={(date)=> props.setDate(date)}/>
        </View>

        <View style={styles.field}>
          <Text style={{ marginBottom: 8, color:'black'  }}>Time:</Text>
          <DateTimePickerComponent mode='time' date={props.time} setDate={(date)=> props.setTime(date)}/>
        </View>

        <View style={styles.field}>
          <Text style={{ marginBottom: 8,  color:'black'  }}>Number of people:</Text>
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
            <TouchableOpacity onPress={() => props.setCount(props.count >= 2 ? props.count - 1 : 1)} style={styles.roundButton}>
              <Text>-</Text>
            </TouchableOpacity>
            <Text style={{ marginLeft: 16, marginRight: 16,  color:'black'  }}>{props.count}</Text>
            <TouchableOpacity onPress={() => props.setCount(props.count >= 4 ? 4 : props.count + 1)} style={styles.roundButton}>
              <Text>+</Text>
            </TouchableOpacity>
          </View>
          <View style={{marginTop:32}}>
            <Button color="#00C897" title='SUBMIT' onPress={() => alert('ADD raide')} />
          </View>
          
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 32,
    backgroundColor: 'rgb(232,232,232)',
    // justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  field: {
    marginBottom: 16,
  },
  roundButton: {
    justifyContent: "center",
    alignItems: "center",
    padding: 0,
    borderRadius: 100,
    width: 60,
    height: 30,
    backgroundColor: "#00C897",
  },
});

export default AddRideInfo;
