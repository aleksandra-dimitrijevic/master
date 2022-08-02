import { StyleSheet, View } from 'react-native';
import RideList from '../components/RidesList/RideList';
import { RootTabScreenProps } from '../types';

export default function RidesScreen({ navigation }: RootTabScreenProps<'TabOne'>) {

  return (
    <View style={styles.container}>
      <RideList navigation={navigation}></RideList>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width:'100%'
  }
});