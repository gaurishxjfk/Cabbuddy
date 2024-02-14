import { MutableRefObject, useEffect, useState } from "react";

const useClickOutside = (ref: MutableRefObject<any>) => {
  const [isOutside, setIsOutside] = useState(false);
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      //  console.log(e.target,ref?.current)
      if (ref?.current && e.target &&  ref.current.contains(e.target as Node)) {
        setIsOutside(true);
      } else {
        // setIsOutside(false);
      }
    }
    document.addEventListener("mousedown",handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [ref]);
  return isOutside;
};

export default useClickOutside;
