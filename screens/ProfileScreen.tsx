import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import LogIn from '../components/LogIn';
import { User } from '../types/User';

function ProfileScreen({ navigation }: any) {
  const [currentUser, setCurrentUser] = useState<User>();
  return (
    <View style={styles.container}>
        { !currentUser && <>
          <LogIn setUser={(user) => setCurrentUser(user)}/>
          <TouchableOpacity
            style={{ marginTop:32}}
            onPress={() => navigation.navigate('Register')}
          >
            <Text style={{ color: "#00C897"}}> Register?</Text>
          </TouchableOpacity>
        </> }
        { currentUser && <>
          <Text>Welcome {currentUser.firstName+ ' '+currentUser.lastName}!</Text>
          <Text>Email: {currentUser.email}</Text>
          <Text>Phone: {currentUser.phone}</Text>
          <TouchableOpacity
            style={{ marginTop:32}}
            onPress={() => setCurrentUser(undefined)}
          >
            <Text style={{ color: "#00C897"}}> Log out</Text>
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
    backgroundColor: 'rgb(232,232,232)',
    // justifyContent: "center",
  }
});

export default ProfileScreen