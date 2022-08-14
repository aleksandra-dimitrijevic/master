import { Text, View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { useForm } from 'react-hook-form'
import Input from "../basic/Input";
import { request } from "../../services/request";
import { storeCurrentUser, User } from "../../types/User";
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
        setValue('model', user.car.model)
        setValue('color', user.car.color)
        setValue('registration', user.car.registration)
    }
    useEffect(() => {
        init();
    }, []);

    const onSubmit = async (data: any) => {
        try {
            const json = await request({
                method: 'PATCH',
                url: `/users/${user._id}`,
                body: {
                    ...data,
                    car:{
                        model: data.model,
                        color: data.color,
                        registration: data.registration
                    }
                }
            })
            storeCurrentUser(json.user);
            alert('Successfully changed!')
            navigation.navigate('TabThree')

        } catch (error) {
            //alert("Error, please try again");
        }
    }

    return (
        <ScrollView style={styles.container} contentContainerStyle={{ alignItems: "center"}}>
            <View style={styles.title}>
                <Text style={{color:'darkgray'}}>PERSONAL INFO</Text>
            </View>
            <Input placeholder="First Name" name="firstName" control={control} rules={{ required: true }}></Input>
            <Input placeholder="Last Name" name="lastName" control={control} rules={{ required: true }}></Input>
            <Input placeholder="E-mail" name="email" control={control} rules={{ required: true }}></Input>
            <Input placeholder="Phone number" name="phone" control={control}></Input>

            <View style={{width:'100%', alignItems: "center", paddingVertical:32}}>
                <View style={styles.title}>
                    <Text style={{color:'darkgray'}}>CAR</Text>
                </View>
                <Input placeholder="Model" name="model" control={control}></Input>
                <Input placeholder="Color" name="color" control={control}></Input>
                <Input placeholder="Registration" name="registration" control={control}></Input>
            </View>

            <TouchableOpacity
                style={{ padding: 8, backgroundColor: "#00C897", borderRadius: 5, width: '90%' }}
                onPress={handleSubmit(onSubmit)}
            >
                <Text style={{ color: "white", textAlign: "center" }}> CHANGE</Text>
            </TouchableOpacity>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 32,
        backgroundColor: 'white',
    },
    title:{
        backgroundColor:'#ececec',
        padding:8,
        width:'90%',
        marginBottom:8
    }
});