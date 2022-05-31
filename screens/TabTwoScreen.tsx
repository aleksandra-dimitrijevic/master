import { StyleSheet } from "react-native";
import { View } from "../components/Themed";
//import DatePicker from 'react-native-datepicker';
import AddRideInfo from "../components/AddRideInfo";
import Map from "../components/Map";

export default function TabTwoScreen() {
  
  return (
    <View style={styles.container}>
      <Map></Map>
     </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  }
});
