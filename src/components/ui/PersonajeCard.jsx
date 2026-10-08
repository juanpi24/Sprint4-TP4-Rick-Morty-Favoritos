import { useFavoritosContext } from "../../context/FavoritosContext.jsx";
import { translateStatus,translateSpecies,translateGender } from '../../constants/translations.js';

export function PersonajeCard({ personaje }) {

  const { esFavorito, toggleFavorito } = useFavoritosContext();
  const favorito = esFavorito(personaje.id);

  return (
    <article className="overflow-hidden rounded-default border border-outline-variant bg-surface-container">
      <img
        src={personaje.image}
        alt={personaje.name}
        loading="lazy"
        className="h-56 w-full object-cover"
      />
      <div className="space-y-1 p-4">
        <h3 className="text-lg font-bold">{personaje.name}</h3>

      {personaje.gender && (
        <p className="text-sm text-on-surface-variant">
            Género: {translateGender(personaje.gender)}
        </p>
      )}  

      {personaje.species && (
        <p className="text-sm text-on-surface-variant">
          Especie: {translateSpecies(personaje.species)}
        </p>
      )}

      {personaje.status && (
        <p className="text-sm text-on-surface-variant">
            Estado: {translateStatus(personaje.status)}
        </p>
        )}

      {personaje.origin?.name && (
        <p className="text-sm text-on-surface-variant">
            Origen: {personaje.origin.name === "unknown"  ? "Desconocido"  : personaje.origin.name}
        </p>
      )}

        {/* Botón dinámico con operador ternario basado en estado derivado */}
        <button
          type="button"
          onClick={() => toggleFavorito(personaje)}
          className={`mt-3 w-full py-2.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-colors duration-150 active:scale-95 shadow-sm cursor-pointer ${
            favorito
              ? 'bg-error-container text-on-error-container hover:bg-error-container/80'
              : 'bg-primary text-on-primary hover:bg-primary-fixed-dim'
          }`}
        >
          {/* Icono y texto dinámico basado en el estado "isInList" */}
          <span className="material-symbols-outlined text-[18px]">
            {favorito ? 'delete' : 'add'}
          </span>
          <span>{favorito ? 'Quitar de favoritos' : 'Agregar a favoritos'}</span>
        </button>

      </div>
    </article>
  );
}
