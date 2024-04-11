import {useEffect} from "react";

export const useOnClickOutside = (ref: any, onClose: any) => {
  useEffect(() => {
    const handleClick = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        onClose?.(-1);
      }
    };
    document.addEventListener("click", handleClick,true);
    return () => {
      document.removeEventListener("click", handleClick,true);
    };
  }, [ref, onClose]);
};

export default useOnClickOutside;
