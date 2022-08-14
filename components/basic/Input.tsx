import { useController } from 'react-hook-form'
import { TextInput,StyleSheet} from "react-native";

function Input({ name, control, rules, ...rest }: any) {
    const { field, fieldState } = useController({
      control,
      name,
      rules
    })
  
    return (
      <TextInput
              {...rest}
        style={[styles.input, fieldState.error && { borderColor: 'red' }]}
        value={field.value}
        onChangeText={field.onChange}
      />
    )
  }

  const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderColor: 'lightgrey',
        marginBottom: 8,
        borderRadius: 10,
        padding: 8,
        width: '90%'
    }
});

export default Input;