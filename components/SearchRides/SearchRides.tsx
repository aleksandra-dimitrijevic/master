import { View, Button, StyleSheet } from "react-native";
import React, { useState } from "react";
import { Location } from "../../types";
import { RideSearch } from "../../types/Rides";
import { request } from "../../services/request";
import StopInput from "./StopInput";
import DatePickerComponent from "./DatePickerComponent";
import MapSearch from "./MapSearch";

type SearchRidesProps = {
    showMap: () => void,
    setRides: (rides: RideSearch[]) => void,
}

export default function SearchRides(props: SearchRidesProps) {

    const [start, setStart] = useState<Location>({ latitude: 44.811879, longitude: 20.464239, label: '' });
    const [finish, setFinish] = useState<Location>({ latitude: 44.811879, longitude: 20.477285, label: '' });
    const [date, setDate] = useState<Date>(new Date());

    const onSearch = async () => {
        try {
            const json = await request({
                url: '/rides/search',
                method: 'GET',
                queryParams: {
                    'lat1': start.latitude,
                    'long1': start.longitude,
                    'lat2': finish.latitude,
                    'long2': finish.longitude
                }
            })
            props.setRides(json.response);
            props.showMap();

        } catch (error) {
            alert("Error, please try again");
        }
    }

    return (
        <View style={styles.container}>
            <MapSearch
                start={start}
                setStart={setStart}
                finish={finish}
                setFinish={setFinish}
            />
            <View style={styles.searchOptions}>
                <StopInput title='START' address={start.label} />
                <StopInput title='FINISH' address={finish.label} />
                <DatePickerComponent date={date} setDate={(d) => setDate(d)} />
                <View style={{ marginTop: 8 }}>
                    <Button color="#00C897" title="Search" onPress={onSearch} />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        width: "100%",
        height: "100%",
    },
    searchOptions: {
        position: "absolute",
        top: 0,
        width: '100%',
        padding: 16,
        backgroundColor: 'white'
    }
});
