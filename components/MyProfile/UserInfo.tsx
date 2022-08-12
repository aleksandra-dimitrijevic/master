import { StyleSheet, Text, View } from 'react-native';
import { User } from '../../types/User';
import { Rating } from 'react-native-ratings';
import { useEffect, useState } from 'react';
import ProfileMenuItem from './ProfileMenuItem';

type UserInfoProps = {
    user: User
}
export default function UserInfo(props: UserInfoProps) {
    const { user } = props;
    const [rating, setRating] = useState(0)

    useEffect(() => {
        const r = user.score / user.ratesNumber;
        setRating(r)
    }, []);


    return (
        <View style={{ width:'100%' }}>
            <View style={{ alignItems: 'center' }}>
                <Text style={styles.name}>
                    {user.firstName + ' ' + user.lastName}
                </Text>
                <Rating
                    imageSize={16}
                    fractions={1}
                    startingValue={rating || 0}
                    readonly={true}
                    ratingColor='#00C897'
                />
                <Text style={styles.votes}>{user.ratesNumber || 0} votes</Text>
            </View>

            <View style={styles.menu}>
                    <View style={styles.title}>
                        <Text style={{color:'darkgray'}}>CONTACT</Text>
                    </View>
                    <ProfileMenuItem
                        user={user}
                        icon='phone'
                        title={user.phone}
                    />
                    <ProfileMenuItem
                        user={user}
                        icon='envelope-o'
                        title={user.email}
                    />
                    <ProfileMenuItem
                        user={user}
                        icon='car'
                        title={user.car.model+', '+user.car.color}
                    />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    name: {
        fontWeight: 'bold',
        color: '#00C897',
        fontSize: 20,
    },
    votes: {
        color: 'darkgray',
        fontSize: 12
    },
    menu:{
        width:'100%',
        paddingHorizontal:32,
        paddingBottom:0,
        paddingTop:8
    },
    title:{
        backgroundColor:'#ececec',
        padding:8
    }
});