import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Ride } from '../../../types/Rides';
import RideDate from '../commonInfo/RideDate';
import RideDriver from '../commonInfo/RideDriver';
import RideSeats from '../commonInfo/RideSeats';
import StopComponent from '../commonInfo/StopComponent';
import RideTime from '../commonInfo/RideTime';

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
                <View style={{flexDirection:'row'}}>
                    <RideDate date={ride.date}/>
                    <View style={{marginLeft:16}}>
                        <RideTime time={ride.date} />
                    </View>
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