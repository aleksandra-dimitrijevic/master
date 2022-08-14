import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import RideListSearch from '../components/Lists/PassengersRideList/RideListSearch';
import { RootTabScreenProps } from '../types/Navigation';
import { RideSearch } from '../types/Rides';
import SearchRides from '../components/SearchRides/SearchRides';

function TabSearchScreen({ navigation }: RootTabScreenProps<'TabSearch'>) {
  const [showMap, setShowMap] = useState(true);
  const [ rides, setRides] = useState<RideSearch[]>([]);

  const handleSetRides = useCallback((rides: RideSearch[]) => setRides(rides || []), [setRides])

  return (
    <View style={styles.container}>
      {showMap && (
        <SearchRides
          showMap={() => setShowMap(false)}
          setRides={handleSetRides}
        />
      )}
      {!showMap && (
        <RideListSearch
          showMap={() => setShowMap(true)}
          rides = {rides}
          navigation = {navigation}
        />
      )}

    </View>
  );
}

export default React.memo(TabSearchScreen)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
