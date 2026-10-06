import { useState } from "react";

// Estado booleano reutilizable: [estado, toggle, abrir, cerrar]
export function useToggle(initialState = false) {
  const [estado, setEstado] = useState(initialState);

  const toggle = () => setEstado((actual) => !actual);
  const abrir = () => setEstado(true);
  const cerrar = () => setEstado(false);

  return [estado, toggle, abrir, cerrar];
}
