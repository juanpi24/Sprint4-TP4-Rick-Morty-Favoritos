import Modal from "./Modal.jsx";
import { useFavoritosContext } from "../../context/FavoritosContext.jsx";

export function FavoritosModal({ abierto, onCerrar }) {
  const { favoritos, toggleFavorito } = useFavoritosContext();

  return (
    <Modal abierto={abierto} onCerrar={onCerrar} titulo={`Mis favoritos (${favoritos.length})`}>
      {favoritos.length === 0 ? (
        <p>Todavía no agregaste favoritos. Buscá un personaje y tocá "Agregar a favoritos".</p>
      ) : (
        <ul className="space-y-3">
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
                className="text-sm font-semibold text-error hover:underline"
              >
                Quitar
              </button>
            </li>
          ))}
        </ul>
      )}
    </Modal>
  );
}
