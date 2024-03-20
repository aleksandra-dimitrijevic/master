const ACCESS_KEY = 'f1e15b07199675967ec63b981354a130'

export const fetchAddress = async (latitude: number, longitude: number) => {
    try {
      const response = await fetch(
        `http://api.positionstack.com/v1/reverse?access_key=${ACCESS_KEY}&query=${latitude},${longitude}&limit=1`
      );
      const { data } = await response.json();
      if(!data[0]){
        alert('Please, pin again!')
      }else {
        return data[0].label;
      }
      
    } catch (e) {
      alert('Error, please, pin again!')
    }
  };

  