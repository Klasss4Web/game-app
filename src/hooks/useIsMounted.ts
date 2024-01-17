import { useEffect, useRef, useState } from "react";

const useIsMounted = () => {
  // const [isMounted, setIsMounted] = useState(false);
  const ref = useRef(false);

  useEffect(() => {
    // setIsMounted(true);
    if (ref.current) return;
    ref.current = true;

    // return () => {
    //   setIsMounted(false);
    // };
  }, []);
  return ref;
  // return isMounted;
};

export default useIsMounted;
