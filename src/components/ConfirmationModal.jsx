import { Modal } from './ui/Modal.jsx';

/**
 * Adaptado del ConfirmationModal.jsx del TP2. La diferencia con esta
 * versión: en vez de tener su propio backdrop/caja duplicados, se
 * construye ARRIBA de components/ui/Modal.jsx (composición) — Modal
 * no sabe nada de "confirmar" ni "cancelar", solo sabe mostrar una
 * caja con contenido adentro.
 */
export function ConfirmationModal({ abierto, onCerrar, onConfirmar, titulo, mensaje }) {
  return (
    <Modal abierto={abierto} onCerrar={onCerrar}>
      <div className="max-w-sm w-full">
        <h3 className="text-lg font-bold text-on-surface mb-2">{titulo}</h3>
        <p className="text-sm text-on-surface-variant mb-6">{mensaje}</p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onCerrar}
            className="px-4 py-2 text-sm font-medium text-on-surface bg-surface-container-high rounded-md hover:bg-surface-container-highest cursor-pointer transition-colors duration-150"
          >
            Cancelar
          </button>
          <button
            onClick={() => {
              onConfirmar();
              onCerrar();
            }}
           className="px-4 py-2 text-sm font-medium text-on-error-container bg-error-container rounded-md hover:bg-error-container/80 cursor-pointer transition-colors duration-150"
          >
            Confirmar
          </button>
        </div>
      </div>
    </Modal>
  );
}
