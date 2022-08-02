import { SetStateAction, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { fetchAddress, Ride, Stop } from '../../types/Rides';

type RideItemProps = {
    ride: Ride
}
export default function RideItem(props: RideItemProps) {

  // const [ stops, setStops] = useState<Stop[]>([]);

  // useEffect(() => {
  //   async function init() {
  //     try {
  //       const arr:Stop[] = [];
  //       for ( const stop of props.ride.stops) {
  //           const label = await fetchAddress(stop.location.coordinates[1], stop.location.coordinates[0]);
  //           arr.push({...stop, label})  
  //       }
  //       setStops(arr);
  //     } catch (e) {
  //       console.warn(e);
  //     } 
  //   }
  //   init();
  // }, []);
    
    return (
        <View style={styles.item}>
            <Text style={{color:'black'}}>Driver: {props.ride.driver.firstName +' '+props.ride.driver.lastName}</Text>
            <Text style={{color:'black'}}>Date: {new Date(props.ride.date).toLocaleDateString()}</Text>
            <Text style={{color:'black'}}>Time: {new Date(props.ride.date).toLocaleTimeString([],{ hour: '2-digit', minute: '2-digit'})}</Text>
            <Text style={{color:'black'}}>Passengers: {props.ride.passengersNumber}</Text>
            <Text style={{color:'black'}}>Stops: </Text>
            { props.ride.stops.map((stop, index) => <View key={''+stop.location.coordinates[1]+stop.location.coordinates[0]}>
                <Text> {index+1} {stop.label}</Text>
            </View>)}
        </View>
    );

    }

const styles = StyleSheet.create({
    item: {
        borderWidth: 1,
        borderColor: 'lightgrey',
        marginBottom: 16,
        borderRadius: 10,
        padding: 16,
        width: '90%',
    }
});