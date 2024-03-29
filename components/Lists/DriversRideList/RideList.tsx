import { useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import { request } from '../../../services/request';
import { Ride } from '../../../types/Rides';
import { getCurrentUser, removeCurrentUser } from '../../../services/asyncStorage';
import RideItem from './RideItem';

export default function RideList({navigation}: any) {
    const [rides, setRides] = useState<Ride[]>([]);

    async function init() {
        try {
            const user = await getCurrentUser();
            if(!user){
                Alert.alert('Not Authorized', 'Please log in to see your rides.')
            }
            else {
                const json = await request({
                    url: '/rides/driver',
                    queryParams: { driver: user._id},
                    method: 'GET'
                })
                setRides(json.rides)
            }
            
        } catch(error: any){
            setRides([])
        }
    }
    useEffect(() => {
        init();
        const willFocusSubscription = navigation.addListener('focus', () => {
           init()
        });
    
        return willFocusSubscription;
      }, []);
    return (
        <View style={styles.container}>
            <ScrollView style={{flex:1, width: '100%'}} contentContainerStyle={{ padding: 16 }}>
                { rides.map( ride => 
                    <RideItem ride={ride} key={ride._id} navigation={navigation}/>
                )}
            </ScrollView>
            
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