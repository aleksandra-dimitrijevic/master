import { StyleSheet, Text, View } from 'react-native';
import { lightGreen } from '../../constants/Colors';

type StopInputProps = {
    title: string,
    address: string
}
export default function StopInput({title, address}: StopInputProps) {

    return (
        <View style={styles.stop}>
            <View style={styles.inputLabel}>
                <Text style={{ color: 'white' }}>{title}</Text>
            </View>
            <Text numberOfLines={1} style={{ maxWidth: '85%' }}>{address}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    stop: {
        flexDirection: "row",
        borderWidth:1,
        borderColor: 'lightgrey',
        marginBottom: 8,
        borderRadius: 10,
        padding: 8,
        width:'100%'
      },
      inputLabel: {
        backgroundColor: lightGreen,
        paddingLeft: 8,
        paddingRight: 8,
        borderRadius: 10,
        marginRight:8,
        textAlign:'center',
        justifyContent:'center'
      }
});