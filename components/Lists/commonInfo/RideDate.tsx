import { FontAwesome } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import { lightGreen } from '../../../constants/Colors';

type RideDateProps = {
    date: Date
}
export default function RideDate(props: RideDateProps) {

    return (
        <View style={styles.time}>
            <FontAwesome size={18} name='calendar-o' color={lightGreen} />
            <Text style={styles.timeText}>{new Date(props.date).toLocaleDateString()}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    time: {
        flexDirection: 'row',
        marginBottom: 8,
        justifyContent: 'flex-end'
    },
    timeText: {
        color: lightGreen,
        paddingLeft: 8
    },

});