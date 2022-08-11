import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { request } from '../../services/request';
import { Ride } from '../../types/Rides';
import { getCurrentUser, User } from '../../types/User';
import RideItemSearch from '../RideListSearch/RideItemSearch';


type RidePassengerListSearch = {
    navigation: any
}

export default function RidePassengerListSearch(props: RidePassengerListSearch) {

    const [rides, setRides] = useState<Ride[]>([]);
    const [ user, setUser] = useState<User>();

    async function init() {
        try {
            const user = await getCurrentUser();
            setUser(user);
            if(!user) alert('Please log in, to see your rides.')
            else {
                const json = await request({
                    url: '/rides/passenger',
                    queryParams: { passenger: user._id},
                    method: 'GET'
                })
                setRides(json.rides)
            }
            
        } catch(error){
            alert("Error, please try again");
        }
    }
    useEffect(() => {
        init();
        const willFocusSubscription = props.navigation.addListener('focus', () => {
           init()
        });
    
        return willFocusSubscription;
      }, []);
    return (
        <View style={styles.container}>
            {user && <ScrollView style={{flex:1, width: '100%'}} contentContainerStyle={{ padding: 16 }}>
                { rides.map( ride => 
                    <RideItemSearch  
                        ride={ride} 
                        start={ride.passengers.find( (p: any) => p.user._id === user._id)?.start || 0} 
                        finish={ride.passengers.find( (p: any) => p.user._id === user._id)?.finish || 0} 
                        key={ride._id} 
                        navigation={props.navigation}/>
                )}
            </ScrollView>}
            
        </View>
    );
    }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width:'100%',
        alignItems: 'center',
    }
});