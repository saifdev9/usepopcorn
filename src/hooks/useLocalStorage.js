import { useEffect, useState } from "react";

function useLocalStorage(initialstate, keyName) {
  const [data, setdata] = useState(function () {
    const storedValue = localStorage.getItem(keyName);
    return storedValue ? JSON.parse(storedValue) : initialstate;
  });

  useEffect(() => {
    localStorage.setItem(keyName, JSON.stringify(data));
  }, [data, keyName]);

  return [data, setdata];
}

export default useLocalStorage;
