import { FontAwesome } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import { User } from '../types/User';

type UserInfoProps = {
    user: User
}
export default function UserInfo(props: UserInfoProps) {
    const { user } = props
    return (
        <View style={{alignItems:'center'}}>
            <Text style={styles.name}>
                {user.firstName + ' ' + user.lastName}
            </Text>
            <View style={styles.container}>
                <Text>
                    <Text style={{fontWeight:'bold'}}>Phone: </Text>
                     {user.phone}
                </Text>
                <Text>
                    <Text style={{fontWeight:'bold'}}>Email: </Text>
                    {user.email}
                </Text>
            </View>
            
        </View>
    );
}

const styles = StyleSheet.create({
    name: {
        fontWeight: 'bold',
        color:'#00C897',
        fontSize: 20,
        paddingBottom: 16
    },
    container: {
        borderWidth: 1,
        borderColor: 'lightgrey',
        borderRadius: 10,
        padding: 16,
        width: 300
    }
});