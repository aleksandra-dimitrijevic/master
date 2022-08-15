import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../types/User';

export const storeCurrentUser = async (user: User) => {
    try {
      await AsyncStorage.setItem("user", JSON.stringify(user));
    } catch (error) {
      console.log(error);
    }
  };
  
export const getCurrentUser = async () => {
    try {
        const response = await AsyncStorage.getItem("user") ;
        if( !response) return null;
        return  JSON.parse(response);
    } catch (error) {
        console.log(error); 
    }
};

export const removeCurrentUser = async () => {
    try {
      await AsyncStorage.removeItem("user");
    } catch (error) {
      console.log(error);
    }
};