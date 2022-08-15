export const fetchAddress = async (latitude: number, longitude: number) => {
    try {
      const response = await fetch(
        `http://api.positionstack.com/v1/reverse?access_key=f1e15b07199675967ec63b981354a130&query=${latitude},${longitude}&limit=1`
      );
      const { data } = await response.json();
      alert(data[0])
      return data[0].label;
    } catch (e) {
      alert(e);
    }
  };