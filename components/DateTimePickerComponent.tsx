import { useState } from "react";
import { Button } from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";

type DateTimePickerProps = {
  date: Date;
  setDate: (date: Date) => void;
  mode: 'date' | 'time';
};

export default function DateTimePickerComponent(props: DateTimePickerProps) {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    props.setDate(date);
    hideDatePicker();
  };

  return (
    <>
      <Button color="#00C897" title={props.mode==='date' ? (props.date?.toLocaleDateString()) : (props.date?.getHours() + " : " +  String(props.date?.getMinutes()).padStart(2, '0'))} onPress={showDatePicker} />
      <DateTimePicker isVisible={isDatePickerVisible} mode={props.mode} onConfirm={handleConfirm} onCancel={hideDatePicker} />
    </>
    
  );
}
