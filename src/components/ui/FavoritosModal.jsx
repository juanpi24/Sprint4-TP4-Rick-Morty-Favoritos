import { Modal } from "./Modal.jsx";
import { ConfirmationModal } from "../ConfirmationModal.jsx";
import { useFavoritosContext } from "../../context/FavoritosContext.jsx";
import { useToggle } from "../../hooks/useToggle.js";

export  function FavoritosModal({ abierto, onCerrar }) {
  const { favoritos, toggleFavorito, vaciarFavoritos } = useFavoritosContext();
  const [confirmando, , abrirConfirmacion, cerrarConfirmacion] = useToggle(false);
  const favoritosVacio = favoritos.length === 0;

  // 1. Creamos la función para manejar la confirmación
  const handleConfirmarVaciado = () => {
    vaciarFavoritos();     // Vacía la lista
    cerrarConfirmacion();  // Cierra el modal de confirmación
    onCerrar();            // Cierra el modal de favoritos principal
  };

  return (
    <>
      <Modal abierto={abierto} onCerrar={onCerrar}>
        <div className="w-80 max-w-full flex flex-col max-h-[70vh]">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-syne font-bold text-on-surface">Mis favoritos ({favoritos.length})</h2>
            <button
              onClick={onCerrar}
              aria-label="Cerrar"
              className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-surface-container-high text-on-surface-variant cursor-pointer"
            >
              ✕
            </button>
          </div>

          {favoritosVacio ? (
            <p className="text-sm text-on-surface-variant py-8 text-center">
              Todavía no agregaste favoritos. Buscá un personaje y tocá "Agregar a favoritos".
            </p>
          ) : (
            <>
              <ul className="overflow-y-auto flex-1">
                {favoritos.map((personaje) => (
                  <li key={personaje.id} className="flex items-center gap-3">
                    <img
                      src={personaje.image}
                      alt={personaje.name}
                      className="h-14 w-14 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <p className="font-semibold">{personaje.name}</p>
                      <p className="text-sm text-on-surface-variant">
                        {personaje.species} · {personaje.status}
                      </p>
                    </div>
                    <button
                      onClick={() => toggleFavorito(personaje)}
                      className="text-xs text-error hover:underline cursor-pointer"
                    >
                      Quitar
                    </button>
                  </li>
                ))}
              </ul>
            <div className="flex gap-2">
              <button
                onClick={abrirConfirmacion}
                className="mt-5 w-full rounded-lg border border-error px-3 py-2 text-sm font-semibold text-error hover:bg-error-container hover:text-on-error-container cursor-pointer"
              >
                Vaciar favoritos
              </button>
            </div>
            </>
          )}
          </div>
        
      </Modal>

      {/* 2. Pasamos la nueva función al onConfirmar */}  
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