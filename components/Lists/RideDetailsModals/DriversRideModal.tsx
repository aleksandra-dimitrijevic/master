import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { request } from '../../../services/request';
import { Stop } from '../../../types/Rides';
import { User } from '../../../types/User';
import RideDate from '../commonInfo/RideDate';
import RideSeats from '../commonInfo/RideSeats';
import StopComponent from '../commonInfo/StopComponent';
import RideTime from '../commonInfo/RideTime';
import Passenger from '../commonInfo/Passenger';
import MapStops from './MapStops';

type DriversRideModalProps = {

}
export default function DriversRideModalDriver({ route, navigation }: any) {
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
                <View style={{flexDirection:'row'}}>
                    <RideDate date={ride.date}/>
                    <View style={{marginLeft:16}}>
                        <RideTime time={ride.date} />
                    </View>
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
                    navigation = {navigation}
                />
            )}

            <TouchableOpacity onPress={onDelete} style={styles.deleteButton}>
                <Text style={{color:'white', textAlign:'center'}}>Delete Ride</Text>
            </TouchableOpacity>
            
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'white'
    },
    deleteButton:{
        padding:8,
        backgroundColor: 'red',
        marginTop:32
    }
});