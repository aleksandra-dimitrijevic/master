import { useForm } from "react-hook-form";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { SERVER_URL } from "../constants/Api";
import { lightGreen } from "../constants/Colors";
import { storeCurrentUser } from "../services/asyncStorage";
import { User } from "../types/User";
import Input from "./basic/Input";

type LogInProps = {
    setUser : ( user: User) => void;
}
export default function LogIn (props: LogInProps) {

    const { control, handleSubmit } = useForm();

    const onSubmit = async (data:any) => {
        try {
            const response = await fetch(SERVER_URL+'/users/login' , {
                method:'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            const json = await response.json();
            if( response.status>399){
                alert(json.msg)
            } else {
                alert('Successful login!')
                props.setUser(json.user);
                storeCurrentUser(json.user);
            }
        } catch(error){
            alert("Error, please try again");
        }
    }

    return (
        <View style={styles.container}>
            <Input placeholder="E-mail" name="email" control={control} rules={{ required: true }}/>
            <Input placeholder="Password" name="password" secureTextEntry={true} control={control} rules={{ required: true }}/>
            <TouchableOpacity
                style={{ padding: 8, backgroundColor: lightGreen, borderRadius: 5, width:'90%' }}
                onPress={handleSubmit(onSubmit)}
                >
                <Text style={{ color: "white", textAlign:"center" }}> LOG IN</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      alignItems: "center",
      paddingTop: 32,
      backgroundColor: 'white',
      width:'100%'
    }
  });