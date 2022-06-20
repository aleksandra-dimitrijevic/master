import React, { useEffect } from 'react'
import { Pressable } from 'react-native';
import { Text, View } from "../components/Themed";
import { RootStackScreenProps } from '../types';
//{ navigation }: any
function ProfileScreen() {

  const getMovies = async () => {
  //   try {
  //    const response = await fetch('http://192.168.0.18:8088');
  //    const json = await response.json();
  //    alert(json.success);
  //  } catch (error) {
  //    alert(error)
  //  } finally {
  //    //setLoading(false);
  //  }
 }

 useEffect(() => {
   getMovies();
 }, []);
  return (
    <View>
        <Text>Profile Screen</Text>
        {/* <Pressable  onPress={() => navigation.navigate('RegistrationModal')}>
          <Text>Register</Text>
        </Pressable> */}
    </View>
    
  )
}

export default ProfileScreen