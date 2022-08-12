import { StyleSheet, Text, View } from 'react-native';

import { Stop } from '../../../types/Rides';

type StopComponentProps = {
    stop: Stop,
    blur: boolean
}
export default function StopComponent(props: StopComponentProps) {

    return (
        <View style={props.blur ? [styles.item, styles.blurItem] : styles.item}>
            <View style={props.blur ? [styles.circle, styles.blurItem] : styles.circle}></View>
            <Text style={props.blur ? { color: 'lightgray' } : {color:'black'}}>{props.stop.label}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    item: {
        borderLeftWidth: 3,
        borderColor: 'black',
        width: '90%',
        padding: 8,
        paddingLeft: 16,
        justifyContent: 'center'
    },
    blurItem: {
        borderColor: 'lightgray',
    },
    circle: {
        borderRadius: 50,
        height: 10,
        width: 10,
        backgroundColor: 'white',
        borderWidth: 2,
        borderColor: 'black',
        position: "absolute",
        marginLeft: -6.5,
    }

});