import { FontAwesome } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Ride, RideSearch } from '../../types/Rides';
import RideDate from './RideDate';
import RideDriver from './RideDriver';
import RideSeats from './RideSeats';
import RideStationSearch from './RideStationSearch';
import RideTime from './RideTime';

type RideItemSearchProps = {
    ride: Ride,
    navigation: any,
    start: number,
    finish: number
}
export default function RideItemSearch(props: RideItemSearchProps) {
    const driver = props.ride.driver;
    const ride = props.ride;
    
    return (
        <TouchableOpacity style={styles.item} onPress={() => props.navigation.navigate('RideInfo', { ride, start: props.start, finish: props.finish })}>
            <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                <View>
                    <RideDriver driver={driver} />
                    <RideSeats passengersNumber={ride.passengersNumber} available={ride.availableSeats} />
                </View>
                <View>
                    <RideDate date={ride.date}/>
                    <RideTime time={ride.date} />
                </View>
            </View>
            
            {ride.stops.map((stop, index) =>
                <RideStationSearch
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
    }
});