import { FontAwesome } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SERVER_URL } from '../../constants/Api';
import { request } from '../../services/request';
import { Stop } from '../../types/Rides';
import { getCurrentUser } from '../../types/User';
import RideDate from '../RideListSearch/RideDate';
import RideDriver from '../RideListSearch/RideDriver';
import RideSeats from '../RideListSearch/RideSeats';
import RideStationSearch from '../RideListSearch/RideStationSearch';
import RideTime from '../RideListSearch/RideTime';
import MapStops from './MapStops';

type RideInfoProps = {

}
export default function RideInfo({ route, navigation }: any) {
    const { ride, start, finish } = route.params;
    const driver = route.params.ride.driver;
    const [applied, setApplied] = useState(false)

    async function init() {
        try {
            const user = await getCurrentUser();
            if(route.params.ride.passengers.find( (p: { user: { _id: any; }; }) => p.user ===user._id || p.user?._id=== user._id)) setApplied(true)
            
        } catch(error){
            alert("Error, please try again");
        }
    }
    useEffect(() => {
        init()
    }, []);

    const onDecline = async () => {
        try {
            const user = await getCurrentUser();
            const data = {
              user: user._id,
              _id: ride._id
            }

            const json = await request({
                url: '/rides/remove-passenger',
                method: 'POST',
                body: data
            })
            
            alert(json.msg)
            setApplied(false)
            
        } catch(error){
            alert("Error, please try again");
        }
    }


    const onSubmit = async () => {
        try {
            const user = await getCurrentUser();
            if(!user) alert("Please log in to apply!")

            const data = {
              start,
              finish,
              user: user._id,
              _id: ride._id
            }

            const json = await request({
                url: '/rides/apply',
                method: 'POST',
                body: data
            })
            
            alert(json.msg)
            navigation.navigate('TabRides', {passenger: true})
            
        } catch(error){
            alert("Error, please try again");
        }
    }
    

    return (
        <ScrollView style={styles.container}  contentContainerStyle={{ padding: 16}}>
            <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                <View>
                    <RideDriver driver={driver} />
                    <View style={{flexDirection:'row', marginBottom:16}}>
                            <FontAwesome size={20} name='phone' color='black'/>
                            <Text style={{color:'black', marginLeft:16}}>
                                {driver.phone}
                            </Text>
                    </View>
                </View>
                <View>
                    <RideDate date={ride.date}/>
                    <RideTime time={ride.date} />
                </View>
            </View>
            
            <RideSeats passengersNumber={ride.passengersNumber} available={ride.availableSeats} />
            {ride.stops.map((stop: Stop, index: number) =>
                <RideStationSearch
                    stop={stop}
                    blur={index < start || index > finish}
                    key={stop.location.coordinates[1] + stop.location.coordinates[0]} />
            )}
            <MapStops stops={ride.stops}/>
            {!applied && <TouchableOpacity style={styles.submitButton} onPress={onSubmit}>
                <Text style={{color:'white', textAlign:'center'}}>APPLY</Text>
            </TouchableOpacity>}
            {applied && <TouchableOpacity  onPress={onDecline} style={styles.cancelButton}>
                <Text style={{color:'white', textAlign:'center'}}>CANCEL</Text>
            </TouchableOpacity>}
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
    },
    cancelButton:{
        padding:8,
        backgroundColor: 'red',
        marginTop:32
    }
});