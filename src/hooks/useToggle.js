import { useState } from 'react';

/**
 * Hook para manejar un estado booleano de tipo toggle (activar/desactivar).
 * Se usa para el modal de favoritosy cualquier otro panel simple abierto/cerrado.
 *
 * @param {boolean} initialState - Estado inicial del toggle.
 * @returns {Array} [estado, toggle, abrir, cerrar]
 */
export function useToggle(initialState = false) {
  const [state, setState] = useState(initialState);

  const toggle = () => setState((prev) => !prev);
  const setOpen = () => setState(true);
  const setClose = () => setState(false);

  return [state, toggle, setOpen, setClose];
}
