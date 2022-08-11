import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import ImagePickerExample from '../components/ImagePickerExample';
import LogIn from '../components/LogIn';
import UserInfo from '../components/UserInfo';
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
          <Text style={{ color: "#00C897" }}> Register?</Text>
        </TouchableOpacity>
      </>}
      {currentUser && <>
        <ImagePickerExample />
        <UserInfo user={currentUser} />

        <TouchableOpacity
          style={{ marginTop: 32 }}
          onPress={() => navigation.navigate('EditUserInfo', {user: currentUser})}
        >
          <Text style={{ color: "#00C897" }}> Change Personal Information</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ marginTop: 32 }}
          onPress={() => navigation.navigate('ChangePassword')}
        >
          <Text style={{ color: "#00C897" }}> Change Password</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ marginTop: 32 }}
          onPress={() => {
            setCurrentUser(undefined);
            removeCurrentUser();
          }}
        >
          <Text style={{ color: "#00C897" }}> Log out</Text>
        </TouchableOpacity>
      </>}
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