import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Ride } from '../../types/Rides';
import RideDate from '../RideListSearch/RideDate';
import RideDriver from '../RideListSearch/RideDriver';
import RideSeats from '../RideListSearch/RideSeats';
import StopComponent from '../RideListSearch/StopComponent';
import RideTime from '../RideListSearch/RideTime';

type RideItemProps = {
    ride: Ride,
    navigation: any
}
export default function RideItem(props: RideItemProps) {
    const {ride, navigation} = props;
    return (
        <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('RideInfoDriver', { ride })}>
            <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                <View>
                    <RideSeats passengersNumber={ride.passengersNumber} available={ride.availableSeats} />
                </View>
                <View>
                    <RideDate date={ride.date}/>
                    <RideTime time={ride.date} />
                </View>
            </View>
            
            {ride.stops.map( stop => 
                <StopComponent
                    stop={stop}
                    blur={false}
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
    passengers:{
        color:'black',
        marginBottom:16
    }
});