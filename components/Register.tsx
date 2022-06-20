import { TextInput } from "react-native";
import { Text, View } from "./Themed";

export default function Register () {

    return (
        <View>
            <Text> Registration form</Text>
            <TextInput placeholder="First Name"></TextInput>
            <TextInput placeholder="Last Name"></TextInput>
            <TextInput placeholder="Email"></TextInput>
        </View>
    )
}