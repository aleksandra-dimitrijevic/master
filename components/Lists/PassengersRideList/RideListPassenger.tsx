import { useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import { request } from '../../../services/request';
import { Ride } from '../../../types/Rides';
import { getCurrentUser } from '../../../services/asyncStorage';
import RideItem from './RideItem';
import { User } from '../../../types/User';


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
            if(!user) Alert.alert('Not Authorized', 'Please log in to see rides.')
            else {
                const json = await request({
                    url: '/rides/passenger',
                    queryParams: { passenger: user._id},
                    method: 'GET'
                })
                setRides(json.rides)
            }
            
        } catch(error){
            setRides([])
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
                    <RideItem  
                        ride={ride} 
                        start={ride.passengers.find( (p: any) => p.user._id === user._id)?.start || 0} 
                        finish={ride.passengers.find( (p: any) => p.user._id === user._id)?.finish || 0} 
                        key={ride._id} 
                        navigation={props.navigation}
                        search={false}
                        />
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