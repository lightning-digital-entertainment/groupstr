import { useEffect, useState } from "react";

const useNip07 = () => {
  const [available, setAvailable] = useState(() => {
    return window.nostr ? true : false;
  });
  useEffect(() => {
    if (window.nostr) {
      setAvailable(true)
    } else {
      const interval = setInterval(() => {
        if (window.nostr) {
          setAvailable(true)
          clearInterval(interval)
        }
      }, 1000)
    }
  }, [])

  return available;
};

export default useNip07;