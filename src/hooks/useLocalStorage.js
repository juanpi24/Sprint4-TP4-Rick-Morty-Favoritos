import { useState, useEffect } from 'react';

export function useLocalStorage(key, initialValue) {

  // 1. Usar una función dentro de useState para que solo se ejecute UNA vez al montar
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);

      // 📌 Si el item existe en localStorage, lo parsea. 
      // Si NO existe (devuelve null), usa el initialValue que le paso.
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error leyendo localStorage en clave "${key}":`, error);
      return initialValue;
    }
  });

  // 2. Mantener actualizado el localStorage cada vez que cambia el estado
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error(`Error guardando en localStorage clave "${key}":`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}
