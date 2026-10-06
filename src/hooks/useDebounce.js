import { useEffect, useState } from "react";

// Devuelve el valor recién después de que el usuario dejó de escribir "delay" ms
export function useDebounce(valor, delay = 400) {
  const [valorDebounced, setValorDebounced] = useState(valor);

  useEffect(() => {
    const id = setTimeout(() => setValorDebounced(valor), delay);
    return () => clearTimeout(id);
  }, [valor, delay]);

  return valorDebounced;
}
