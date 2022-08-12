import { useState } from "react";
import { Button } from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";

type DateTimePickerProps = {
  date: Date;
  setDate: (date: Date) => void;
  mode: 'date' | 'time';
};

export default function DateTimePickerComponent({ date, setDate, mode }: DateTimePickerProps) {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

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

  const getDate = () => {
    return date?.toLocaleDateString();
  }

  const getTime = () => {
    const hours = date?.getHours();
    const minutes = String(date?.getMinutes()).padStart(2, '0')
    return hours + ' : ' + minutes;
  }

  return (
    <>
      <Button
        color="#00C897"
        title={mode === 'date' ? getDate() : getTime()}
        onPress={showDatePicker}
      />
      <DateTimePicker
        isVisible={isDatePickerVisible}
        mode={mode}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </>

  );
}
