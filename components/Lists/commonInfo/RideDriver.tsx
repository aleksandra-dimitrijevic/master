import { FontAwesome } from '@expo/vector-icons';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SERVER_URL } from '../../../constants/Api';
import { User } from '../../../types/User';

type RideDriverProps = {
    driver: User,
    navigation: any
}
export default function RideDriver(props: RideDriverProps) {
    const {driver, navigation} = props;
    
    return (
        <TouchableOpacity style={styles.driver} onPress={() => navigation.navigate('PublicProfile',{ driver})}>
            <FontAwesome size={30} name='user-o' style={!driver.image? styles.image : styles.hide} />
            <Image 
                source={{ uri: `${SERVER_URL}/users/picture/${driver.image}`}} 
                style={driver.image? styles.image : styles.hide}

            />
            <Text style={styles.driverText}>
                {driver.firstName + ' ' + driver.lastName}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    driver: {
        flexDirection: 'row',
        marginBottom: 16,
        justifyContent: 'center',
        alignItems: 'center'
    },
    driverText: {
        color: 'black',
        paddingLeft: 8,
        fontWeight: 'bold'
    },
    image:{
        width: 30,
        height: 30,
        borderRadius: 100
      },
      hide: {
        display: 'none'
      }
});