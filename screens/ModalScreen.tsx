import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, Text, View } from 'react-native';


export default function ModalScreen() {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.text}>
          Find rides:
        </Text>
        <View style={styles.steps}>
          <Text style={styles.step}>
            <Text style={styles.stepNumber}>1.  </Text>
            Pin the pick up location using the START pin
          </Text>
          <Text style={styles.step}>
            <Text style={styles.stepNumber}>2.  </Text>
            Pin the dropp off location using the FINISH pin
          </Text>
          <Text style={styles.step}>
            <Text style={styles.stepNumber}>3.  </Text>
            Select DATE
          </Text>
          <Text style={styles.step}>
            <Text style={styles.stepNumber}>4.  </Text>
            Click the SEARCH button
          </Text>
        </View>
        <Text style={styles.step}>
          Rides with stops not farther than 500m from your START and FINISH location will be shown.
        </Text>
        <Text style={styles.step}>Click on the ride that best suites you and APPLY. </Text>
        <Text style={styles.step}>Enjoy the ride!</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 32
  },
  steps: {
    paddingVertical: 16,
    paddingLeft: 32
  },
  step: {
    paddingVertical: 8
  },
  stepNumber: {
    fontWeight: 'bold',
  },
  text: {
    color: 'black'
  }
});
