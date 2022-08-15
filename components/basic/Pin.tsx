import { Text, View, StyleSheet } from "react-native";

type PinProps = {
    label: String | number
}
export default function Pin({ label }: PinProps) {

    return (
        <View style={styles.pin}>
            <Text style={styles.textPin}>{label}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    pin: {
        backgroundColor: '#1C6F5A',
        paddingHorizontal: 8,
        borderRadius: 5
    },
    textPin: {
        fontWeight: "bold",
        color: '#58DDAE',
        fontSize: 10
    }
});
