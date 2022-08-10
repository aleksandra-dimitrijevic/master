import { FontAwesome } from '@expo/vector-icons';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SERVER_URL } from '../../constants/Api';
import { request } from '../../services/request';
import { Stop } from '../../types/Rides';
import { User } from '../../types/User';
import RideStationSearch from '../RideListSearch/RideStationSearch';

type PassengerProps = {
    user: User,
    start: Stop,
    finish: Stop,
    rideId: number
}
export default function Passenger(props: PassengerProps) {
    const {user, start, finish, rideId} = props;
    const [ deleted, setDeleted] = useState(false);

    const onDecline = async () => {
        try {
            const data = {
              user: user._id,
              _id: rideId
            }
            
            const json = await request({
                url: '/rides/remove-passenger',
                method: 'POST',
                body: data
            })
           
            alert(json.msg)
            setDeleted(true);
           
        } catch(error){
            alert("Error, please try again");
        }
    }

    return (
        <View style={styles.passenger}>
            <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                <View style={styles.driver}>
                    <FontAwesome size={20} name='user-o' />
                    <Text style={styles.driverText}>
                        {user.firstName + ' ' + user.lastName}
                    </Text>
                </View>
                <View style={styles.driver}>
                    <FontAwesome size={20} name='phone' color='#00C897' />
                    <Text style={[styles.driverText, {color:'#00C897'}]}>
                        {user.phone}
                    </Text>
                </View>
            </View>
            
            <RideStationSearch
                    stop={start}
                    blur={false}
                    key={start.location.coordinates[1] + start.location.coordinates[0]} 
            />
            <RideStationSearch
                    stop={finish}
                    blur={false}
                    key={finish.location.coordinates[1] + finish.location.coordinates[0]} 
            />

            {!deleted && <TouchableOpacity style={styles.declineButton} onPress={onDecline}>
                <Text style={{color:'white', textAlign:'center'}}>Decline</Text>
            </TouchableOpacity>}
            { deleted && <Text style={{color:'red', textAlign:'center'}}> User Declined</Text>}
        </View>
        
    );
}

const styles = StyleSheet.create({
    passenger: {
        borderWidth: 1,
        borderColor: 'lightgrey',
        borderRadius: 10,
        padding: 16,
        marginTop:16,
    },
    driver: {
        flexDirection: 'row',
        marginBottom: 16
    },
    driverText: {
        color: 'black',
        paddingLeft: 8,
        fontWeight: 'bold'
    },
    declineButton:{
        padding:8,
        backgroundColor: 'red',
        marginTop:8
    }
});