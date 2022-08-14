import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type NewStopProps = {
    address: string,
    index: number,
    deleteMarker: (i: number) => void
}
export default function NewStop({ address, index, deleteMarker }: NewStopProps) {

    return (
        <View style={styles.stop}>
            <View
                style={styles.stopNumber}
            >
                <Text style={{ color: 'white' }}>{index + 1}</Text>
            </View>
            <Text numberOfLines={1} style={{ maxWidth: '85%' }}>{address}</Text>
            {address && <TouchableOpacity onPress={() => deleteMarker(index)} style={styles.stopNumber}>
                <Text style={{ color: 'white' }}>X</Text>
            </TouchableOpacity>}
        </View>
    );
}

const styles = StyleSheet.create({
    stop: {
        flexDirection: "row",
        borderWidth: 1,
        borderColor: 'lightgrey',
        marginBottom: 8,
        borderRadius: 10,
        padding: 8,
        width: '100%',
        justifyContent:'space-between'
    },
    stopNumber: {
        backgroundColor: "#00C897",
        paddingLeft: 8,
        paddingRight: 8,
        borderRadius: 10,
        marginRight: 8,
        textAlign: 'center',
        justifyContent: 'center'
    }
});