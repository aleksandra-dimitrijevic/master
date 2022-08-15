import { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { Rating } from 'react-native-ratings';
import { request } from '../../services/request';
import { getCurrentUser } from '../../services/asyncStorage';
import ProfileMenuItem from './ProfileMenuItem';
import { User } from '../../types/User';
import { lightGreen } from '../../constants/Colors';

type RateComponentProps = {
    user: User
}
export default function RateComponent(props: RateComponentProps) {
    const { user } = props;
    const [rating, setRating] = useState(0)
    const [currentUser, setCurrentUser] = useState<User>();
    const [score, setScore] = useState(0);
    const [numberVotes, setNumberVotes] = useState(0);

    const init = async () => {
        const currentUser = await getCurrentUser()
        setCurrentUser(currentUser)
        setScore(user.score/user.ratesNumber)
        setNumberVotes(user.ratesNumber)
    }
    useEffect(() => {
        init();
    }, []);

    const ratingCompleted = (score: number) => {
        setRating(score)
    }
    
    const onRate = async () => {
        try {
            console.log(rating)
            const currentUser = await getCurrentUser()
            const json = await request({
                method: 'PATCH',
                url: `/users/rate/${user._id}`,
                body: {
                    rate: rating,
                    userRated: currentUser._id
                }
            })
            const u = json.user;
            setScore(u.score/u.ratesNumber)
            setNumberVotes(u.ratesNumber)
            alert('Thanks for rating!')

        } catch (error) {
            alert("Error, please try again");
        }
    }

    return (
        <View style={styles.menu}>
            <View style={styles.title}>
                <Text style={{color:'darkgray'}}>RATING</Text>
            </View>
            { currentUser && <ProfileMenuItem
                icon='star'
                title= {numberVotes ? Math.round(score * 100) / 100+' / 5 - '+numberVotes+' votes' : 'No votes, be the first to vote!'}
                user={currentUser}
            />}
            <Rating
                onFinishRating={ratingCompleted}
                style={{ paddingVertical: 10, paddingBottom: 32 }}
                imageSize={30}
                fractions={0}
                startingValue={user.rates.find(e => e.user==currentUser?._id)?.rate || 0}
            />
            <Button title='RATE' onPress={onRate} color={lightGreen} />
        </View>
    );
}

const styles = StyleSheet.create({
    menu:{
        width:'100%',
        padding:32,
        paddingTop:0,
    },
    title:{
        backgroundColor:'#ececec',
        padding:8
    }
});