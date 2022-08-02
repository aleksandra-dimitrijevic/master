import { StyleSheet, Text, View } from 'react-native';

import { Ride, RideSearch } from '../../types/Rides';

type RideItemSearchProps = {
    ride: RideSearch
}
export default function RideItemSearch(props: RideItemSearchProps) {
    
    return (
        <View style={styles.item}>
            <Text style={{color:'black'}}>Driver: {props.ride.ride.driver.firstName +' '+props.ride.ride.driver.lastName}</Text>
            <Text style={{color:'black'}}>Date: {new Date(props.ride.ride.date).toLocaleDateString()}</Text>
            <Text style={{color:'black'}}>Time: {new Date(props.ride.ride.date).toLocaleTimeString([],{ hour: '2-digit', minute: '2-digit'})}</Text>
            <Text style={{color:'black'}}>Passengers: {props.ride.ride.passengersNumber}</Text>
            <Text style={{color:'black'}}>Stops: </Text>
            { props.ride.ride.stops.map((stop, index) => <View key={''+stop.location.coordinates[1]+stop.location.coordinates[0]}>
                { index === props.ride.start && <Text style={styles.stationStart}> {index+1} {stop.label}</Text>}
                { index === props.ride.finish && <Text style={styles.stationEnd}> {index+1} {stop.label}</Text>}
                { index !== props.ride.start && index !== props.ride.finish && <Text style={{color:'black'}}> {index+1} {stop.label}</Text>}
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
    },
    stationStart: {
        color:'green'
    },
    stationEnd:{
        color:'red'
    }
});