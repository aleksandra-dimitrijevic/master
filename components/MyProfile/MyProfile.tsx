import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { getCurrentUser, removeCurrentUser, User } from '../../types/User';
import ImagePickerComponent from './ImagePickerComponent';
import UserInfo from './UserInfo';
import ProfileMenuItem from './ProfileMenuItem';

function MyProfile({ navigation, setUser }: any) {

    const [currentUser, setCurrentUser] = useState<User>();

    async function init() {
        try {
            const user = await getCurrentUser();
            setCurrentUser(user);
        } catch (e) {
            console.warn(e);
        }
    }

    useEffect(() => {
        init();
        const willFocusSubscription = navigation.addListener('focus', () => {
            init()
        });
        return willFocusSubscription;
    }, []);

    const logout = () => {
        setCurrentUser(undefined);
        removeCurrentUser();
        setUser(undefined)
    }

    return (
        <View style={styles.container}>
            <ImagePickerComponent />
            {currentUser && <>
                <UserInfo user={currentUser} />
                <View style={styles.menu}>
                    <View style={styles.title}>
                        <Text style={{color:'darkgray'}}>PROFILE OPTIONS</Text>
                    </View>
                    <ProfileMenuItem
                        navigation={navigation}
                        user={currentUser}
                        path='EditUserInfo'
                        icon='cog'
                        title='Edit Profile'
                    />
                    <ProfileMenuItem
                        navigation={navigation}
                        user={currentUser}
                        path='ChangePassword'
                        icon='lock'
                        title='Change Password'
                    />
                    <ProfileMenuItem
                        navigation={navigation}
                        user={currentUser}
                        icon='sign-out'
                        title='Log Out'
                        action={logout}
                    />
                </View>
                
            </>}
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: 'white',
        width:"100%",
    },
    menu:{
        width:'100%',
        paddingTop:0,
        padding:32
    },
    title:{
        backgroundColor:'#ececec',
        padding:8
    }
});

export default MyProfile