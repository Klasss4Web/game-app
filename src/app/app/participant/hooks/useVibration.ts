import { useEffect, useState } from "react";

const useVibration = () => {
  const [isVibrating, setIsVibrating] = useState(false);

  useEffect(() => {
    let intervalId: any;

    const startVibration = () => {
      setIsVibrating(true);
    };

    const stopVibration = () => {
      setIsVibrating(false);
    };

    // Set interval to start and stop the vibration
    intervalId = setInterval(() => {
      startVibration();
      setTimeout(stopVibration, 100);
    }, 700);

    // Clear the interval on component unmount
    return () => {
      clearInterval(intervalId);
    };
  }, []);
  return {
    isVibrating,
  };
};

export default useVibration;
