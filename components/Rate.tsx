import { FontAwesome } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Rating } from 'react-native-ratings';
import { request } from '../services/request';
import { getCurrentUser, User } from '../types/User';

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
        <View style={styles.container}>
            <Text>
                Score: {score} /5 - {numberVotes} votes
            </Text>
            <Rating
                onFinishRating={ratingCompleted}
                style={{ paddingVertical: 10, paddingBottom: 32 }}
                imageSize={30}
                fractions={0}
                startingValue={user.rates.find(e => e.user==currentUser?._id)?.rate || 0}
            />
            <Button title='RATE' onPress={onRate} color='#00C897' />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: 'lightgrey',
        borderRadius: 10,
        padding: 16,
        width: 300,
        marginBottom: 16,
        alignItems: 'center'
    }
});