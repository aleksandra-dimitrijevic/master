import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RideSearch } from '../../../types/Rides';
import RideItem from './RideItem';

type RideListSearch = {
    showMap: () => void,
    rides: RideSearch[],
    navigation: any
}

export default function RideListSearch(props: RideListSearch) {

    return (
        <View style={styles.container}>
            <View style={{ alignItems: "flex-start", width: 400, marginLeft: 16 }}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => props.showMap()}
                >
                    <Text style={{ color: "white" }}> {"<- SEARCH"}</Text>
                </TouchableOpacity>
            </View>
        
            <ScrollView style={{ flex: 1, width:'100%' }}  contentContainerStyle={{ padding: 16 }}>
                {props.rides.map(ride =>
                    <RideItem 
                        ride={ride.ride} 
                        start={ride.start} 
                        finish={ride.finish} 
                        key={ride.ride._id} 
                        navigation={props.navigation}
                        search={true}
                        />
                )}
            </ScrollView>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    backButton: {
        padding: 8,
        backgroundColor: "#00C897",
        borderRadius: 15,
        marginTop: 16
    }
});