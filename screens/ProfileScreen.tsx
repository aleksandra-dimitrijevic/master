import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import LogIn from '../components/LogIn';
import MyProfile from '../components/Profile/MyProfile';
import { lightGreen } from '../constants/Colors';
import { getCurrentUser } from '../services/asyncStorage';
import { User } from '../types/User';

function ProfileScreen({ navigation }: any) {

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


  return (
    <View style={styles.container}>
      {!currentUser && <>
        <LogIn setUser={(user) => setCurrentUser(user)} />
        <TouchableOpacity
          style={{ marginTop: 32 }}
          onPress={() => navigation.navigate('Register')}
        >
          <Text style={{ color: lightGreen }}> Register?</Text>
        </TouchableOpacity>
      </>}
      {currentUser && <MyProfile navigation={navigation} setUser={setCurrentUser}/>}
    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 16,
    backgroundColor: 'white',
  }
});

export default ProfileScreen