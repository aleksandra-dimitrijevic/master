import { FontAwesome } from '@expo/vector-icons';
import React from 'react'
import { View, StyleSheet, Image } from 'react-native';
import UserInfo from './UserInfo';
import { SERVER_URL } from '../../constants/Api';
import RateComponent from './Rate';

type PublicProfileProps = {

}
function PublicProfile({ route }: any) {

    const { driver } = route.params;
    const image = driver.image;    

    return (
        <View style={styles.container}>
            <Image
                source={{ uri: `${SERVER_URL}/users/picture/${image}` }}
                style={image ? styles.image : styles.hide}

            />
            <FontAwesome size={100} name='user-o' color='black' style={!image ? styles.cameraIcon : styles.hide} />
            <UserInfo user={driver} />
            <RateComponent user={driver}/>
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