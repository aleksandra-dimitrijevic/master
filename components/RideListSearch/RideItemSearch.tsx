import { FontAwesome } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

import { Ride, RideSearch } from '../../types/Rides';
import RideDriver from './RideDriver';
import RideStationSearch from './RideStationSearch';
import RideTime from './RideTime';

type RideItemSearchProps = {
    ride: RideSearch
}
export default function RideItemSearch(props: RideItemSearchProps) {
    const driver = props.ride.ride.driver;
    const ride = props.ride.ride;

    return (
        <View style={styles.item}>
            <RideTime time={ride.date}/>
            <RideDriver driver={driver}/>
            {ride.stops.map((stop, index) =>
                <RideStationSearch
                    stop={stop}
                    blur={index < props.ride.start || index > props.ride.finish}
                    key={stop.location.coordinates[1] + stop.location.coordinates[0]} />
            )}
        </View>
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