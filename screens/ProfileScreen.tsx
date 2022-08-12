import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import LogIn from '../components/LogIn';
import MyProfile from '../components/MyProfile/MyProfile';
import { getCurrentUser, removeCurrentUser, User } from '../types/User';

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
  //   const willFocusSubscription = navigation.addListener('focus', () => {
  //     init()
  //  });
  //  return willFocusSubscription;
  }, []);


  return (
    <View style={styles.container}>
      {!currentUser && <>
        <LogIn setUser={(user) => setCurrentUser(user)} />
        <TouchableOpacity
          style={{ marginTop: 32 }}
          onPress={() => navigation.navigate('Register')}
        >
          <Text style={{ color: "#00C897" }}> Register?</Text>
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
    paddingTop: 32,
    backgroundColor: 'white',
  }
});

export default ProfileScreen