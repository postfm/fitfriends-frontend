import { useState } from 'react';

export const useLocalStorage = <T,>(
  keyName: string,
  defaultValue: T
): [value: T, setValue: (newValue: T) => void] => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const value = window.localStorage.getItem(keyName);
      if (value) {
        return JSON.parse(value) as T;
      } else {
        window.localStorage.setItem(keyName, JSON.stringify(defaultValue));
        return defaultValue;
      }
    } catch (err) {
      return defaultValue;
    }
  });
  const setValue = (newValue: T) => {
    try {
      window.localStorage.setItem(keyName, JSON.stringify(newValue));
    } catch (err) {
      // ignore error
    }
    setStoredValue(newValue);
  };
  return [storedValue, setValue];
};
