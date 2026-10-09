import { useEffect } from 'react';
import { useToggle } from '../../hooks/useToggle.js';
import { useFavoritosContext } from '../../context/FavoritosContext.jsx';    
import { ConfirmationModal } from '../ui/ConfirmationModal.jsx';
import { translateSpecies, translateStatus } from '../../constants/translations.js';

/**
 * Componente FavoritosPanel: Panel lateral para mostrar la lista de favoritos.
 * Este componente se renderiza como un "drawer" lateral que se abre desde el lado derecho de la pantalla.
 * Permite al usuario ver sus personajes favoritos, quitar personajes individuales o vaciar toda la lista.
 * @param {boolean} abierto - Indica si el panel está abierto.
 * @param {function} onCerrar - Función para cerrar el panel.
 */
export function FavoritosPanel({abierto, onCerrar,}) {
  // Consumimos el contexto de favoritos tal como en FavoritosModal
  const { favoritos, toggleFavorito, vaciarFavoritos } = useFavoritosContext();
  
  /* Usamos useToggle local para controlar el modal de confirmación*/
   const [confirmando, , abrirConfirmacion, cerrarConfirmacion] = useToggle(false);
  
  // Bonus: Cierre del panel presionando la tecla Escape.
  // Mientras se confirma el vaciado no escuchamos Escape acá: lo maneja el ConfirmationModal,
  // así Escape cierra solo la confirmación y no las dos cosas a la vez.
  useEffect(() => {
    if (!abierto || confirmando) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onCerrar();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [abierto, confirmando, onCerrar]);

  // 1. Creamos la función para manejar la confirmación
  const handleConfirmarVaciado = () => {
    vaciarFavoritos(); // Vacía la lista
    onCerrar();        // Cierra el panel de favoritos
    // La confirmación la cierra el propio ConfirmationModal después de llamar a esta función
  };

  /* Si el panel no está abierto, no se renderiza nada. */
  if (!abierto) return null;

  return (
    <>
      {/* Backdrop con Blur */}
      <div
        onClick={onCerrar}
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-opacity"
      />

      {/* Drawer Lateral */}
      <aside className="fixed top-0 right-0 h-full w-80 max-w-[88vw] z-50 bg-surface-container border-l border-outline-variant/30 shadow-2xl flex flex-col justify-between p-6">
        <div className="flex flex-col h-full overflow-hidden">
          
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-outline-variant/30">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-xl">
                bookmark
              </span>
              <h2 className="text-lg font-bold text-on-surface">
                Mis favoritos
              </h2>
            </div>

            {/* Botón de Cierre */}
            <button
              type="button"
              onClick={onCerrar}
              aria-label="Cerrar panel"
              className="text-on-surface-variant hover:text-on-surface p-1 rounded-lg transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-2xl">close</span>
            </button>
          </div>

          {/* Subtítulo Contador */}
          <div className="flex items-center justify-between py-3">
            <span className="text-xs text-on-surface-variant">
              Personajes seleccionados
            </span>

            {/* Contador de favoritos */}
            <span className="text-xs font-bold text-primary px-2.5 py-0.5 rounded-full bg-primary/10 border border-primary/30">
              {favoritos.length}{' '}
              {favoritos.length === 1 ? 'favorito' : 'favoritos'}
            </span>
          </div>

          {/* Lista de ítems o Empty State */}
          <div className="flex flex-col gap-3 mt-2 overflow-y-auto flex-1 pr-1">
            {favoritos.length === 0 ? (
              <div className="text-center py-8 text-on-surface-variant flex flex-col items-center justify-center h-full">
                <span className="material-symbols-outlined text-4xl mb-2 text-on-surface-variant/50">
                  playlist_remove
                </span>
                <p className="text-sm max-w-50">
                  Todavía no agregaste favoritos. Buscá un personaje y tocá "Agregar a favoritos".
                </p>
              </div>
            ) : (
              favoritos.map((personaje) => (
                <div
                  key={personaje.id}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-surface-container-high border border-outline-variant/30"
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    <img
                      src={personaje.image}
                      alt={personaje.name}
                      className="w-11 h-11 rounded-lg object-cover shrink-0"
                    />
                    <div className="flex flex-col min-w-0">
                      <span className="text-xs text-on-surface font-semibold truncate">
                        {personaje.name}
                      </span>
                      <span className="text-[11px] text-on-surface-variant truncate">
                        {translateSpecies(personaje.species)} · {translateStatus(personaje.status)}
                      </span>
                    </div>
                  </div>

                  {/* Botón para quitar personaje de favoritos */}
                  <button
                    type="button"
                    onClick={() => toggleFavorito(personaje)}
                    className="ml-2 text-error border border-error/40 hover:bg-error-container/20 rounded-lg px-2 py-1 text-xs font-semibold transition-colors shrink-0 cursor-pointer"
                  >
                    Quitar
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Acciones del Footer */}
        <div className="flex flex-col gap-2.5 pt-4 border-t border-outline-variant/30 mt-auto">
          {/* Botón para vaciar la lista */}
          <button
            type="button"
            onClick={abrirConfirmacion}
            disabled={favoritos.length === 0}
            className="w-full py-2.5 rounded-xl bg-error-container text-on-error-container hover:bg-error-container/80 font-semibold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <span className="material-symbols-outlined text-sm">delete_sweep</span>
            Vaciar favoritos
          </button>
        </div>
      </aside>

      {/* Modal de Confirmación */}
      <ConfirmationModal
        abierto={confirmando}
        onCerrar={cerrarConfirmacion}
        onConfirmar={handleConfirmarVaciado}
        titulo="¿Vaciar lista de favoritos?"
        mensaje="Se eliminarán todos los personajes guardados de tu lista. Esta acción no se puede deshacer."
      />
    </>
  );
}
