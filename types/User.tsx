import AsyncStorage from '@react-native-async-storage/async-storage';

export type User = {
    _id?: any
    firstName: string;
    lastName: string;
    password: number;
    phone?: string;
    email:string;
    token: string;
    image?: string;
    score: number;
    ratesNumber: number;
    rates: {
      user: string,
      rate: number
    }[],
    car: {
      model: string,
      registration: string,
      color: string
    }
}

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