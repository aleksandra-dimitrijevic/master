import React from "react";
import { Button, StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { lightGreen } from "../../constants/Colors";
import SubmitButton from "../basic/SubmitBotton";
import DateTimePickerComponent from "./DateTimePickerComponent";
import NumberPeopleInput from "./NumberPeopleInput";

type AddRideInfoProps = {
  showMap: () => void;
  date: Date,
  setDate: (date: Date) => void,
  time: Date,
  setTime: (date: Date) => void,
  count: number,
  setCount: (count: number) => void
  submit: () => void
};
function AddRideInfo(props: AddRideInfoProps) {

  const { showMap, date, setDate, time, setTime, count, setCount, submit } = props

  return (
    <View style={styles.container}>

      <View style={{ alignItems: "flex-start", width: 400, marginLeft: 16 }}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={showMap}
        >
          <Text style={{ color: "white" }}> {"<- STOPS"}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Date:</Text>
        <DateTimePickerComponent
          mode='date'
          date={date}
          setDate={setDate}
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Time:</Text>
        <DateTimePickerComponent
          mode='time'
          date={time}
          setDate={setTime}
        />
      </View>

      <NumberPeopleInput
        count={count}
        setCount={setCount}
        style={styles.field}
      />

      <SubmitButton title='SUBMIT' action={submit} width={200}></SubmitButton>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 32,
    backgroundColor: 'white',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  field: {
    marginBottom: 16,
    width: 200
  },
  backButton: {
    padding: 8,
    backgroundColor: lightGreen,
    borderRadius: 15
  },
  label: {
    marginBottom: 8,
    color: 'black'
  }
});

export default AddRideInfo;
