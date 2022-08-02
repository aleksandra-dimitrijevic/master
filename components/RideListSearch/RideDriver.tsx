import { FontAwesome } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import { User } from '../../types/User';

type RideDriverProps = {
    driver: User
}
export default function RideDriver(props: RideDriverProps) {

    return (
        <View style={styles.driver}>
            <FontAwesome size={20} name='user-o' />
            <Text style={styles.driverText}>
                {props.driver.firstName + ' ' + props.driver.lastName}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    driver: {
        flexDirection: 'row',
        marginBottom: 16
    },
    driverText: {
        color: 'black',
        paddingLeft: 8,
        fontWeight: 'bold'
    }
});