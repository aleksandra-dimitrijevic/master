import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { request } from '../../services/request';
import { Stop } from '../../types/Rides';
import { User } from '../../types/User';
import RideDate from '../RideListSearch/RideDate';
import RideSeats from '../RideListSearch/RideSeats';
import StopComponent from '../RideListSearch/StopComponent';
import RideTime from '../RideListSearch/RideTime';
import Passenger from '../RidesList/Passenger';
import MapStops from './MapStops';

type RideInfoDriverProps = {

}
export default function RideInfoDriver({ route, navigation }: any) {
    const { ride } = route.params;
    const driver = route.params.ride.driver;

    const onDelete = async () => {
        try {
            const json = await request({
                url: '/rides/',
                method: 'DELETE',
                body: {_id: ride._id}
            })
            alert('Ride deleted!')
            navigation.navigate('TabRides')
            
        } catch(error){
            alert("Error, please try again");
        }
    }
    
   
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
                <StopComponent
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

            <TouchableOpacity onPress={onDelete} style={{margin:32}}>
                <Text style={{color:'red', textAlign:'center'}}>Delete</Text>
            </TouchableOpacity>
            
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