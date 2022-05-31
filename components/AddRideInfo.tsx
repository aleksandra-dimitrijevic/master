import React from "react";
import { Button, StyleSheet, TouchableOpacity } from "react-native";

import { Text, View } from "../components/Themed";
//import DatePicker from 'react-native-datepicker';
import DateTimePicker from "react-native-modal-datetime-picker";
import { useState } from "react";

function AddRideInfo() {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [date, setDate] = useState<Date>(new Date());

  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [time, setTime] = useState<Date>(new Date());

  const [count, setCount] = useState(3);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    setDate(date);
    hideDatePicker();
  };

  const handleConfirmTime = (time: Date) => {
    setTime(time);
    hideTimePicker();
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Information about the ride</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      {/* <EditScreenInfo path="/screens/TabTwoScreen.tsx" />  */}
      <View style={{ width: "80%" }}>
        <View style={styles.field}>
          <Text style={{ marginBottom: 8 }}>Date:</Text>
          <Button color="#00C897" title={date?.toLocaleDateString()} onPress={showDatePicker} />
          <DateTimePicker
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
        </View>

        <View style={styles.field}>
          <Text style={{ marginBottom: 8 }}>Time:</Text>
          <Button color="#00C897" title={time?.getHours() + " : " + time?.getMinutes()} onPress={showTimePicker} />
          <DateTimePicker
            isVisible={isTimePickerVisible}
            mode="time"
            onConfirm={handleConfirmTime}
            onCancel={hideTimePicker}
          />
        </View>

        <View style={styles.field}>
          <Text style={{ marginBottom: 8 }}>Number of people:</Text>
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
            <TouchableOpacity onPress={() => setCount(count >= 2 ? count - 1 : 1)} style={styles.roundButton}>
              <Text>-</Text>
            </TouchableOpacity>
            <Text style={{ marginLeft: 16, marginRight: 16 }}>{count}</Text>
            <TouchableOpacity onPress={() => setCount(count >= 4 ? 4 : count + 1)} style={styles.roundButton}>
              <Text>+</Text>
            </TouchableOpacity>
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
