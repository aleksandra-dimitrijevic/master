import { SetStateAction, useState } from 'react';
import { StyleSheet } from 'react-native';
import MapSearch from '../components/MapSearch';
import RideListSearch from '../components/Lists/PassengersRideList/RideListSearch';
import { View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { RideSearch } from '../types/Rides';

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  const [showMap, setShowMap] = useState(true);
  const [ rides, setRides] = useState<RideSearch[]>([]);
  return (
    <View style={styles.container}>
      {showMap && (
        <MapSearch
          showMap={() => setShowMap(false)}
          setRides={(rides: RideSearch[]) => setRides(rides || [])}
        ></MapSearch>
      )}
      {!showMap && (
        <RideListSearch
          showMap={() => setShowMap(true)}
          rides = {rides}
          navigation = {navigation}
        ></RideListSearch>
      )}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
