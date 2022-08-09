import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SERVER_URL } from '../../constants/Api';
import { Stop } from '../../types/Rides';
import { getCurrentUser, User } from '../../types/User';
import RideDate from '../RideListSearch/RideDate';
import RideDriver from '../RideListSearch/RideDriver';
import RideSeats from '../RideListSearch/RideSeats';
import RideStationSearch from '../RideListSearch/RideStationSearch';
import RideTime from '../RideListSearch/RideTime';
import Passenger from '../RidesList/Passenger';
import MapStops from './MapStops';

type RideInfoDriverProps = {

}
export default function RideInfoDriver({ route }: any) {
    const { ride } = route.params;
    const driver = route.params.ride.driver;
   
    return (
        <ScrollView style={styles.container}  contentContainerStyle={{ padding: 16}}>
            <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                <View>
                    <RideSeats passengersNumber={ride.passengersNumber} available={ride.availableSeats} />
                </View>
                <View>
                    <RideDate date={ride.date}/>
                    <RideTime time={ride.date} />
                </View>
            </View>
            
            {ride.stops.map((stop: Stop, index: number) =>
                <RideStationSearch
                    stop={stop}
                    blur={false}
                    key={stop.location.coordinates[1] + stop.location.coordinates[0]} />
            )}
            <MapStops stops={ride.stops}/>

            {ride.passengers.map( (passenger: { user: User; start: number; finish: number }) => 
                <Passenger
                    key = {passenger.user._id}
                    user={passenger.user}
                    start = {ride.stops[passenger.start]}
                    finish = {ride.stops[passenger.finish]}
                    rideId = {ride._id}
                />
            )}
            
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex:1
    },
    submitButton:{
        padding:8,
        backgroundColor: '#00C897',
        marginTop:32
    }
});