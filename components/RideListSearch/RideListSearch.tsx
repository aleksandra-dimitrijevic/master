import { useEffect } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RideSearch } from '../../types/Rides';
import RideItemSearch from './RideItemSearch';

type RideListSearch = {
    showMap: () => void,
    rides: RideSearch[],
}

export default function RideListSearch(props: RideListSearch) {
    useEffect(() => {
        alert('RIDES:'+JSON.stringify(props.rides))
        console.log(props.rides)
      }, []);
    return (
        <View style={styles.container}>
            <View style={{ alignItems: "flex-start", width: 400, marginLeft: 16 }}>
                <TouchableOpacity
                    style={{ padding: 8, backgroundColor: "#00C897", borderRadius: 15, marginTop:16 }}
                    onPress={() => props.showMap()}
                >
                    <Text style={{ color: "white" }}> {"<- SEARCH"}</Text>
                </TouchableOpacity>
            </View>
            <Text>Search Results</Text>
            <ScrollView style={{ flex: 1 }}>
                {props.rides.map(ride =>
                    <RideItemSearch ride={ride} key={ride.ride._id} />
                )}
                <View style={{ height: 64 }}></View>
            </ScrollView>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        backgroundColor:'white'
    }
});