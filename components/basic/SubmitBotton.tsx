import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { lightGreen } from "../../constants/Colors";

type SubmitButtonProps = {
    action : () => void;
    title: String;
    width: number
}
export default function SubmitButton({action, title, width}: SubmitButtonProps) {

    return (   
        <TouchableOpacity
            style={[styles.button, {width}]}
            onPress={action}
            >
            <Text style={styles.title}>{title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        padding: 8, 
        backgroundColor: lightGreen, 
        borderRadius: 5, 
        marginTop: 32
    },
    title: {
        color: "white", 
        textAlign:"center"
    }
  });