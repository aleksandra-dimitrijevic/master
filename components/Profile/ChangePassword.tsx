import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { useForm } from 'react-hook-form'
import Input from "../basic/Input";
import { request } from "../../services/request";
import { useState } from "react";
import { lightGreen } from "../../constants/Colors";

type ChangePasswordProps = {
    route: any,
    navigation: any,
}

export default function ChangePassword(props: ChangePasswordProps) {
    const { user } = props.route.params;
    const { control, handleSubmit } = useForm();
    const [msg, setMsg] = useState('')

    const onSubmit = async (data: any) => {
        try {
            if (data.password !== data.repeat_password) {
                setMsg('Passwords not match!')
                return
            } else setMsg('');
            
            const json = await request({
                method: 'PATCH',
                url: `/users/password/${user._id}`,
                body: data
            })
            alert('Successfully changed!')
            props.navigation.navigate('TabThree')

        } catch (error) {
            //alert("Error, please try again");
        }
    }

    return (
        <View style={styles.container}>
            <Input placeholder="Password" name="password" secureTextEntry={true} control={control} 
                 rules={{ 
                    required: true,
                    pattern: {
                        value: /^(?=.*[A-Za-z])(?=.*\d).{8,}$/,
                        message:'You need password with minimum eight caraters, at least one letter and one number!'
                    }
                }}
            />
            <Input placeholder="Repeat Password" name="repeat_password" secureTextEntry={true} control={control} 
                rules={{ 
                    required: true,
                    pattern: {
                        value: /^(?=.*[A-Za-z])(?=.*\d).{8,}$/,
                        message:'You need password with minimum eight caraters, at least one letter and one number!'
                    }
                }}
            />
            <TouchableOpacity
                style={{ padding: 8, backgroundColor: lightGreen, borderRadius: 5, width: '90%' }}
                onPress={handleSubmit(onSubmit)}
            >
                <Text style={{ color: "white", textAlign: "center" }}> CHANGE PASSWORD</Text>
            </TouchableOpacity>
            <Text style={{ color: 'red' }}>{msg}</Text>
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