import { StyleSheet, Text, View } from 'react-native';

import { Ride } from '../../types/Rides';
import RideDate from '../RideListSearch/RideDate';
import RideDriver from '../RideListSearch/RideDriver';
import RideStationSearch from '../RideListSearch/RideStationSearch';
import RideTime from '../RideListSearch/RideTime';

type RideItemProps = {
    ride: Ride
}
export default function RideItem(props: RideItemProps) {
    
    return (
        <View style={styles.item}>
            <RideDate date={props.ride.date} />
            <RideTime time={props.ride.date} />
            <RideDriver driver={props.ride.driver}/>
            
            <Text style={styles.passengers}>
                Passengers: {props.ride.passengersNumber}
            </Text>

            {props.ride.stops.map( stop => 
                <RideStationSearch
                    stop={stop}
                    blur={false}
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
    },
    passengers:{
        color:'black',
        marginBottom:16
    }
});