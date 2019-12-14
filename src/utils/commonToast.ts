import Toast from "react-native-root-toast";

const commonToast = {
  show: (msg: string) => {
    Toast.show(msg, {
      duration: Toast.durations.SHORT,
      position: Toast.positions.CENTER,
      animation: true,
      hideOnPress: true,
      delay: 0
    });
  }
};

export default commonToast;
