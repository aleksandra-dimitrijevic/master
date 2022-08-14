import { FontAwesome } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

type RideTimeProps = {
    time: Date
}
export default function RideTime(props: RideTimeProps) {

    return (
        <View style={styles.time}>
            <FontAwesome size={20} name='clock-o' color='#00C897' />
            <Text style={styles.timeText}>
                {new Date(props.time).toLocaleTimeString().substring(0, 5)}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    time: {
        flexDirection: 'row',
        marginBottom: 16,
        justifyContent: 'flex-end'
    },
    timeText: {
        color: '#00C897',
        paddingLeft: 8
    },

});