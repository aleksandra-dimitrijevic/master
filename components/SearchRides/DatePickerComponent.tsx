import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';

type DatePickerComponentProps = {
    date: Date,
    setDate: (d: Date) => void
}
export default function DatePickerComponent({ date, setDate }: DatePickerComponentProps) {
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (d: Date) => {
        hideDatePicker();
        setDate(d);
    }

    return (
        <TouchableOpacity style={styles.borderedInput} onPress={showDatePicker}>
            <View
                style={styles.inputLabel}
            >
                <Text style={{ color: 'white' }}>DATE</Text>
            </View>
            <Text>{date?.toLocaleDateString()}</Text>
            <DateTimePicker
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    borderedInput: {
        flexDirection: "row",
        borderWidth: 1,
        borderColor: 'lightgrey',
        marginBottom: 8,
        borderRadius: 10,
        padding: 8,
        width: '100%'
    },
    inputLabel: {
        backgroundColor: "#00C897",
        paddingLeft: 8,
        paddingRight: 8,
        borderRadius: 10,
        marginRight: 8,
        textAlign: 'center',
        justifyContent: 'center'
    }
});