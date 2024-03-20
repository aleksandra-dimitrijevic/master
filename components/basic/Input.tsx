import { useController } from 'react-hook-form'
import { TextInput,StyleSheet, View, Text} from "react-native";

function Input({ name, control, rules, ...rest }: any) {
    const { field, fieldState } = useController({
      control,
      name,
      rules
    })
   
    return (
      <View style={styles.inputWrapper}>
        <TextInput
          {...rest}
          style={[styles.input, fieldState.error && { borderColor: 'red' }]}
          value={field.value}
          onChangeText={field.onChange}
        />
        {fieldState.error && <View>
          <Text style={styles.errorMessage}>{fieldState.error.message || 'This field is required!'}</Text>
        </View>
        }
       
      </View>
    )
  }

  const styles = StyleSheet.create({
    inputWrapper:{
      marginBottom: 8,
      width:'90%'
    },
    input: {
        borderWidth: 1,
        borderColor: 'lightgrey',
        borderRadius: 10,
        paddingVertical: 8,
        paddingHorizontal:16,
        width: '100%'
    },
    errorMessage:{
      fontSize:12,
      color:'red',
      paddingHorizontal:8
    }
});

export default Input;