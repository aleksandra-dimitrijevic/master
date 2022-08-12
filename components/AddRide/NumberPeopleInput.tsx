import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type NumberPeopleInputProps = {
    count: number,
    setCount: (c: number) => void,
    style: any
}
export default function NumberPeopleInput({ count, setCount, style }: NumberPeopleInputProps) {

    return (
        <View style={style}>
            <Text style={styles.label}>Number of people:</Text>
            <View style={styles.wrapper}>
                <TouchableOpacity
                    onPress={() => setCount(count >= 2 ? count - 1 : 1)}
                    style={styles.roundButton}
                >
                    <Text style={{ color: 'white' }}>-</Text>
                </TouchableOpacity>

                <Text style={styles.count}>{count}</Text>

                <TouchableOpacity
                    onPress={() => setCount(count >= 4 ? 4 : count + 1)}
                    style={styles.roundButton}
                >
                    <Text style={{ color: 'white' }}>+</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    label: {
        marginBottom: 8,
        color: 'black'
    },
    wrapper: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    roundButton: {
        justifyContent: "center",
        alignItems: "center",
        padding: 0,
        borderRadius: 100,
        width: 60,
        height: 30,
        backgroundColor: "#00C897",
    },
    count: {
        marginLeft: 16,
        marginRight: 16,
        color: 'black'
    },
});