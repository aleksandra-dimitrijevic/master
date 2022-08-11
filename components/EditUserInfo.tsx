import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { useForm } from 'react-hook-form'
import Input from "./Input";
import { request } from "../services/request";
import { storeCurrentUser, User } from "../types/User";
import { useEffect } from "react";

type EditInfoProps = {
    route: any,
    navigation: any
}
export default function EditUserInfo(props: EditInfoProps) {
    const { navigation } = props;
    const { user } = props.route.params;
    const { control, handleSubmit, setValue } = useForm({ defaultValues: { ...user } });

    const init = async () => {
        setValue('firstName', user.firstName)
    }
    useEffect(() => {
        init();
    }, []);

    const onSubmit = async (data: any) => {
        try {
            const json = await request({
                method: 'PATCH',
                url: `/users/${user._id}`,
                body: data
            })
            storeCurrentUser(json.user);
            alert('Successfully changed!')
            navigation.navigate('TabThree')

        } catch (error) {
            alert("Error, please try again");
        }
    }

    return (
        <View style={styles.container}>
            <Input placeholder="First Name" name="firstName" control={control} rules={{ required: true }}></Input>
            <Input placeholder="Last Name" name="lastName" control={control} rules={{ required: true }}></Input>
            <Input placeholder="E-mail" name="email" control={control} rules={{ required: true }}></Input>
            <Input placeholder="Phone number" name="phone" control={control}></Input>
            <TouchableOpacity
                style={{ padding: 8, backgroundColor: "#00C897", borderRadius: 5, width: '90%' }}
                onPress={handleSubmit(onSubmit)}
            >
                <Text style={{ color: "white", textAlign: "center" }}> CHANGE</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        paddingTop: 32,
        backgroundColor: 'rgb(232,232,232)',
    }
});