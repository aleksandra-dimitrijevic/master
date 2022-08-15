import { FontAwesome } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Image } from 'react-native';
import UserInfo from './UserInfo';
import { SERVER_URL } from '../../constants/Api';
import RateComponent from './Rate';
import { request } from '../../services/request';
import { User } from '../../types/User';

type PublicProfileProps = {

}
function PublicProfile({ route }: any) {

    const { driver } = route.params;
    const [user, setUser] = useState<User>()
    
    async function init() {
        try {
            const json = await request({
                method: 'GET',
                url: `/users/${driver._id}`,
            })
            setUser(json.user);
        } catch (e) {
            console.warn(e);
        }
    }

    useEffect(() => {
        init();
    }, []);

    return (
        <View style={styles.container}>
            { user && <>
                <Image
                    source={{ uri: `${SERVER_URL}/users/picture/${user.image}` }}
                    style={user.image ? styles.image : styles.hide}

                />
                <FontAwesome size={100} name='user-o' color='black' style={!user.image ? styles.cameraIcon : styles.hide} />
                <UserInfo user={user} />
                <RateComponent user={user}/>
            </>
            }
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
    cameraIcon: {
        borderWidth: 3,
        borderColor: 'black',
        padding: 25,
        borderRadius: 100,
        opacity: 0.3,
        margin: 16
    },
    image: {
        width: 150,
        height: 150,
        borderRadius: 100,
        margin: 16
    },
    hide: {
        display: 'none'
    }
});

export default PublicProfile