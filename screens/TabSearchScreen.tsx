import { useState } from 'react';
import { StyleSheet } from 'react-native';
import RideListSearch from '../components/Lists/PassengersRideList/RideListSearch';
import { View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { RideSearch } from '../types/Rides';
import SearchRides from '../components/SearchRides/SearchRides';

export default function TabSearchScreen({ navigation }: RootTabScreenProps<'TabSearch'>) {
  const [showMap, setShowMap] = useState(true);
  const [ rides, setRides] = useState<RideSearch[]>([]);
  return (
    <View style={styles.container}>
      {showMap && (
        <SearchRides
          showMap={() => setShowMap(false)}
          setRides={(rides: RideSearch[]) => setRides(rides || [])}
        />
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
