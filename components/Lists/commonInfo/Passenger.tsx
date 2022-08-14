import { FontAwesome } from '@expo/vector-icons';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { request } from '../../../services/request';
import { Stop } from '../../../types/Rides';
import { User } from '../../../types/User';
import RideDriver from './RideDriver';
import StopComponent from './StopComponent';

type PassengerProps = {
    user: User,
    start: Stop,
    finish: Stop,
    rideId: number,
    navigation: any
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
            //alert("Error, please try again");
        }
    }

    return (
        <View style={styles.passenger}>
            <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                <RideDriver driver={user} navigation={props.navigation}/>
                <View style={styles.phone}>
                    <FontAwesome size={20} name='phone' color='#00C897' />
                    <Text style={[styles.phoneText, {color:'#00C897'}]}>
                        {user.phone}
                    </Text>
                </View>
            </View>
            
            <StopComponent
                    stop={start}
                    blur={false}
                    key={start.location.coordinates[1] + start.location.coordinates[0]} 
            />
            <StopComponent
                    stop={finish}
                    blur={false}
                    key={finish.location.coordinates[1] + finish.location.coordinates[0]} 
            />

            {!deleted && <TouchableOpacity style={styles.declineButton} onPress={onDecline}>
                <Text style={styles.redText}>Decline</Text>
            </TouchableOpacity>}
            { deleted && <Text style={styles.redText}> User Declined</Text>}
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
    phone: {
        flexDirection: 'row',
        marginBottom: 16
    },
    phoneText: {
        color: 'black',
        paddingLeft: 8,
        fontWeight: 'bold'
    },
    declineButton:{
        padding:8,
        backgroundColor: 'white',
        marginTop:8,
        borderWidth:1,
        borderColor:'red'
    },
    redText: {
        color:'red', 
        textAlign:'center'
    }
});