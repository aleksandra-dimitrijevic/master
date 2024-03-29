import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { useForm} from 'react-hook-form'
import Input from "./basic/Input";
import { SERVER_URL } from "../constants/Api";
import { lightGreen } from "../constants/Colors";

export default function Register({ navigation }: any) {

    const { control, handleSubmit } = useForm();

    const onSubmit = async (data:any) => {
        try {
            const response = await fetch(SERVER_URL+'/users/' , {
                method:'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            const json = await response.json();
            if( response.status>399){
                alert(json.msg)
            } else {
                alert('Successful registration, please log in!')
                navigation.navigate('TabThree')
            }
        } catch(error){
            alert("Error, please try again");
        }
    }
    return (
        <View style={styles.container}>
            <Input placeholder="First Name"  name="firstName" control={control} rules={{ required: true }}/>
            <Input placeholder="Last Name" name="lastName" control={control} rules={{ required: true }}/>
            <Input placeholder="E-mail" name="email" control={control} 
                rules={{ 
                    required: true, 
                    pattern: { 
                        value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 
                        message:'Please enter valid email!'
                    }
                }}
            />
            <Input placeholder="Phone number" name="phone" control={control}/>
            <Input placeholder="Password" name="password" secureTextEntry={true} control={control} 
                rules={{ 
                    required: true,
                    pattern: {
                        value: /^(?=.*[A-Za-z])(?=.*\d).{8,}$/,
                        message:'You need password with minimum eight caraters, at least one letter and one number!'
                    }
            }}/>
            <TouchableOpacity
                style={ styles.button }
                onPress={handleSubmit(onSubmit)}
            >
                <Text style={ styles.buttonText }> REGISTER</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        paddingTop: 32,
        backgroundColor: 'white',
    },
    button: {
        padding: 8, 
        backgroundColor: lightGreen, 
        borderRadius: 5, 
        width: '90%' 
    },
    buttonText: {
        color: "white", 
        textAlign: "center" 
    }
});