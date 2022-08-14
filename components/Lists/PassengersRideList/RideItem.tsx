import { FontAwesome } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Ride, RideSearch } from '../../../types/Rides';
import RideDate from '../commonInfo/RideDate';
import RideDriver from '../commonInfo/RideDriver';
import RideSeats from '../commonInfo/RideSeats';
import StopComponent from '../commonInfo/StopComponent';
import RideTime from '../commonInfo/RideTime';

type RideItemProps = {
    ride: Ride,
    navigation: any,
    start: number,
    finish: number,
    search: boolean
}
export default function RideItem(props: RideItemProps) {
    const driver = props.ride.driver;
    const ride = props.ride;
    const disabled = props.search && ride.availableSeats===0

    const handleOnPress = () => {
        props.navigation.navigate('RideInfo', { ride, start: props.start, finish: props.finish })
    }
    return (
        <TouchableOpacity style={[styles.item, disabled ? styles.disabled : {} ]} onPress={handleOnPress} disabled={disabled}>
            <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                <View>
                    <RideDriver driver={driver} navigation={props.navigation}/>
                    <RideSeats passengersNumber={ride.passengersNumber} available={ride.availableSeats} />
                </View>
                <View>
                    <RideDate date={ride.date}/>
                    <RideTime time={ride.date} />
                </View>
            </View>
            
            {ride.stops.map((stop, index) =>
                <StopComponent
                    stop={stop}
                    blur={index < props.start || index > props.finish}
                    key={stop.location.coordinates[1] + stop.location.coordinates[0]} />
            )}
        </TouchableOpacity>
    );

}

const styles = StyleSheet.create({
    item: {
        borderWidth: 1,
        borderColor: 'lightgrey',
        marginBottom: 16,
        borderRadius: 10,
        padding: 16,
        width: '100%',
    },
    disabled: {
        opacity: 0.4
    }
});