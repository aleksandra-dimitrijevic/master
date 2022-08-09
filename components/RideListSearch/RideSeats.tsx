import { FontAwesome } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

type RideSeatsProps = {
    passengersNumber: number,
    available: number
}
export default function RideSeats(props: RideSeatsProps) {
    const full = props.passengersNumber - props.available
    return (
        <View style={styles.seats}>
            <FontAwesome size={16} name='car' />
            <Text style={styles.seatsText}>
                {full+ ' / ' + props.passengersNumber}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    seats: {
        flexDirection: 'row',
        marginBottom: 16
    },
    seatsText: {
        color: 'black',
        paddingLeft: 8,
        fontWeight: 'bold'
    }
});