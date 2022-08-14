import { FontAwesome } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

type RideDateProps = {
    date: Date
}
export default function RideDate(props: RideDateProps) {

    return (
        <View style={styles.time}>
            <FontAwesome size={18} name='calendar-o' color='#00C897' />
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
        color: '#00C897',
        paddingLeft: 8
    },

});