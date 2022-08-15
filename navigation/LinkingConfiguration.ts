import { LinkingOptions } from '@react-navigation/native';
import * as Linking from 'expo-linking';

import { RootStackParamList } from '../types/Navigation';

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          TabSearch: {
            screens: {
              TabSearchScreen: 'search',
            },
          },
          TabAddRide: {
            screens: {
              TabAddRideScreen: 'add',
            },
          },
          TabThree: {
            screens: {
              ProfileScreen: 'profile',
            },
          },
          TabRides: {
            screens: {
              TabAddRideScreen: 'rides',
            },
          },
        },
      },
      Info: 'info',
      Register: 'register',
      RideInfo: 'rideinfo',
      RideInfoDriver: 'rideinfodriver',
      EditUserInfo: 'edituserinfo',
      ChangePassword: 'changepassword',
      PublicProfile: 'publicprofile',
      NotFound: '*',
    },
  },
};

export default linking;
