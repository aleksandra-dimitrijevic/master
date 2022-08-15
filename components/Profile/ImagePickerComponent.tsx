import React, { useState, useEffect } from 'react';
import { Image, View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { SERVER_URL } from '../../constants/Api';
import { getCurrentUser, storeCurrentUser } from '../../services/asyncStorage';
import { FontAwesome } from '@expo/vector-icons';

export default function ImagePickerComponent() {
  const [image, setImage] = useState<string>('');
  const [user, setUser] = useState();
  
  async function init() {
    try {
      const user = await getCurrentUser();
      setUser(user)
      if(user.image) setImage(user.image)

    } catch (error) {
      //alert("Error, please try again");
    }
  }
  useEffect(() => {
    init()
  }, []);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [3, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      const uri = result.uri;
      let uriParts = uri.split('.');
      let fileType = uriParts[uriParts.length - 1];

      const user = await getCurrentUser();
      let formData = new FormData();
      formData.append('avatar', {
        uri,
        name: `photo.${fileType}`,
        type: `image/${fileType}`,
      });
      formData.append('user', user._id)

      let options = {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      };

      const response = await fetch(SERVER_URL + '/users/picture', options);
      const json = await response.json();
      setImage(json.file)
      const userUpdated = user;
      userUpdated.image = json.file;
      storeCurrentUser(userUpdated)
      setUser(userUpdated)
    }
  };

  return (
    <View style={{ alignItems: 'center' }}>
      <TouchableOpacity onPress={pickImage}>
        <Text style={{ color: '#00C897' }}>Change Profile Picture</Text>
      </TouchableOpacity>
      {image!='' && <Image 
        source={{ uri: `${SERVER_URL}/users/picture/${image}`}} 
        style={image? styles.image : styles.hide}

      />}
      <FontAwesome size={100} name='camera' color='black' onPress={pickImage} style={!image? styles.cameraIcon : styles.hide}/>

    </View>
  );

}

const styles = StyleSheet.create({
  cameraIcon: {
    borderWidth: 3,
    borderColor: 'black',
    padding:25,
    borderRadius:100,
    opacity: 0.3,
    margin: 16
  },
  image:{
    width: 150,
    height: 150,
    borderRadius: 100,
    margin:16
  },
  hide: {
    display: 'none'
  }
});