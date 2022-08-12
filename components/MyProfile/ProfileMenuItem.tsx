import { FontAwesome } from '@expo/vector-icons';
import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { User } from '../../types/User';

type ProfileMenuItem = {
    navigation?: any,
    user: User,
    path?: string,
    icon: 'lock' | 'cog' | 'sign-out' | 'phone' | 'envelope-o' | 'star',
    title?: string | number,
    action?: () => void

}
function ProfileMenuItem({ navigation, user, path, icon, title, action }: ProfileMenuItem) {

    const handleAction = () => {
        if(action) action()
        else if(path) navigation.navigate( path, {user})
    }

  return (
    <TouchableOpacity
        style={styles.item}
        onPress={handleAction}
    >
        <FontAwesome size={18} name={icon} color='#00C897' />
        <Text style={styles.title}> {title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  item: {
    padding:16,
    flexDirection:'row',
    width:'100%'
  },
  title:{
    color:'black',
    paddingLeft: 16
  }
});

export default ProfileMenuItem