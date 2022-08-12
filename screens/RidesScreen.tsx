import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import RidePassengerListSearch from '../components/Lists/PassengersRideList/RideListPassenger';
import RideList from '../components/Lists/DriversRideList/RideList';


export default function RidesScreen({ navigation, route }: any) {

  const [isDriver, setIsDriver] = useState(true);

  return (
    <View style={styles.container}>
      <View style={styles.tabs}>
        <TouchableOpacity onPress={() => setIsDriver(true)} style={ isDriver ? styles.selectedTab : styles.tab}>
          <Text style={ styles.text}>Driver</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setIsDriver(false)} style={ !isDriver ? styles.selectedTab : styles.tab}>
          <Text style={ styles.text}>Passenger</Text>
        </TouchableOpacity>
      </View>
      {isDriver && <RideList navigation={navigation}/>}
      {!isDriver && <RidePassengerListSearch navigation={navigation}/>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width:'100%'
  },
  tabs: {
    flexDirection: 'row',
    width:'100%',
    marginBottom:16
  },
  selectedTab:{
    backgroundColor:'white',
    width: '50%',
    padding:8,
    borderBottomWidth: 3,
    borderColor: '#00C897',
  },
  tab:{
    backgroundColor:'white',
    width: '50%',
    padding:8
  },
  text: {
    color: '#00C897',
    textAlign:'center'
  }
});