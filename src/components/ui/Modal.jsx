import { useEffect } from 'react';

/**
 * Modal genérico y reutilizable. No sabe nada de carrito ni de
 * productos — solo sabe mostrar una caja con children adentro, y
 * cerrarse con Escape.
 *
 */
export function Modal({ abierto, onCerrar, children }) {
  // Bonus: cerrar con Escape. Mismo patrón que ListPanel del TP2.
  useEffect(() => {
    if (!abierto) return;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onCerrar();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [abierto, onCerrar]);

  if (!abierto) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-on-surface/50">
      <div className="bg-surface-container rounded-lg p-6 shadow-xl">
        {children}
      </div>
    </div>
  );
}
