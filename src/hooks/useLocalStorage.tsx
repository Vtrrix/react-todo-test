import { useState } from "react";
import { listItem } from "../modals/interfaces";
export function useLocalStorage(
  key: string,
  initialValue: listItem[] | string
) {
  initialValue = new Object(initialValue).toString();
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);

      console.log(item);
      if (!item) {
        window.localStorage.setItem(key, JSON.stringify(initialValue));
      }
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setValue = (value: listItem[]) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.log(error);
    }
  };
  return [storedValue, setValue];
}
