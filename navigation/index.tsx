import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { Pressable } from 'react-native';
import ChangePassword from '../components/Profile/ChangePassword';
import EditUserInfo from '../components/Profile/EditUserInfo';
import PublicProfile from '../components/Profile/PublicProfile';
import Register from '../components/Register';
import PassengersRideModal from '../components/Lists/RideDetailsModals/PassengersRideModal';
import DriversRideModal from '../components/Lists/RideDetailsModals/DriversRideModal';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import ProfileScreen from '../screens/ProfileScreen';
import RidesScreen from '../screens/RidesScreen';
import TabSearchScreen from '../screens/TabSearchScreen';
import TabAddRideScreen from '../screens/TabAddRideScreen';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types/Navigation';
import LinkingConfiguration from './LinkingConfiguration';

const MyTheme = {
  dark: true,
  colors: {
    primary: 'rgb(255, 45, 85)',
    background: 'rgb(242, 242, 242)',
    card: '#00C897',
    text: 'white',
    border: 'rgb(199, 199, 204)',
    notification: 'rgb(255, 69, 58)',
  },
};
export default function Navigation() {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={ MyTheme } >
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="RideInfo" component={PassengersRideModal} />
        <Stack.Screen name="RideInfoDriver" component={DriversRideModal} />
        <Stack.Screen name="EditUserInfo" component={EditUserInfo} />
        <Stack.Screen name="ChangePassword" component={ChangePassword} />
        <Stack.Screen name="PublicProfile" component={PublicProfile} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="TabSearch"
      screenOptions={{
        tabBarStyle:{height: 60},
        tabBarActiveTintColor: Colors[colorScheme].tint,
        tabBarLabelStyle: {paddingBottom: 8, fontSize:12}
      }}
      >
      <BottomTab.Screen
        name="TabSearch"
        component={TabSearchScreen}
        options={({ navigation }: RootTabScreenProps<'TabSearch'>) => ({
          title: 'Search',
          tabBarIcon: ({ color }) => <TabBarIcon name="search" color={color}/>,
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate('Modal')}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}>
              <FontAwesome
                name="info-circle"
                size={25}
                color={Colors[colorScheme].text}
                style={{ marginRight: 15 }}
              />
            </Pressable>
          ),
        })}
      />
      <BottomTab.Screen
        name="TabAddRide"
        component={TabAddRideScreen}
        options={{
          title: 'Add Ride',
          tabBarIcon: ({ color }) => <TabBarIcon name="plus-square-o" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="TabRides"
        component={RidesScreen}
        options={{
          title: 'Rides',
          tabBarIcon: ({ color }) => <TabBarIcon name='car' color={color}/>,
        }}
      />
      <BottomTab.Screen
        name="TabThree"
        component={ProfileScreen}
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <TabBarIcon name="user-o" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}


function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props}/>;
}
