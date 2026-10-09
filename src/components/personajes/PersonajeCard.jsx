import { useFavoritosContext } from "../../context/FavoritosContext.jsx";
import { translateStatus, translateSpecies, translateGender, translateOrigin } from '../../constants/translations.js';

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
      
      {/* Género */}
      {personaje.gender && (
        <div className="flex items-center gap-3 text-on-surface-variant">
          <span className="material-symbols-outlined text-[24px] select-none">
            male
          </span>
          <p className="text-sm font-medium">
            <span className="opacity-70 font-normal">Género:</span>{' '}
            {translateGender(personaje.gender)}
          </p>
        </div>
      )}

      {/* Especie */}
      {personaje.species && (
        <>
          <div className="flex items-center gap-3 text-on-surface-variant">
            <span className="material-symbols-outlined text-[24px] select-none">
              person
            </span>
            <p className="text-sm font-medium">
              <span className="opacity-70 font-normal">Especie:</span>{' '}
              {translateSpecies(personaje.species)}
            </p>
          </div>
        </>
      )}

      {/* Estado */}
      {personaje.status && (
        <>
          <div className="flex items-center gap-3 text-on-surface-variant">
            <span
              className={`material-symbols-outlined text-[24px] ${
                personaje.status === 'Alive'
                  ? 'text-primary'
                  : personaje.status === 'Dead'
                    ? 'text-error'
                    : 'text-on-surface-variant'
              }`}
            >
              {personaje.status === 'Alive' ? 'favorite' : personaje.status === 'Dead' ? 'heart_broken' : 'help'}
            </span>
            <p className="text-sm font-medium">
              <span className="opacity-70 font-normal">Estado:</span>
              <span
                className={`ml-1 px-2 py-0.5 rounded-full text-xs font-semibold ${
                  personaje.status === 'Alive'
                    ? 'text-primary bg-primary/20'
                    : personaje.status === 'Dead'
                      ? 'text-error bg-error/20'
                      : 'text-on-surface-variant bg-on-surface-variant/20'
                }`}
              >
                {translateStatus(personaje.status)}
              </span>
            </p>
          </div>
        </>
      )}

      {/* Origen */}
      {personaje.origin?.name && (
        <>
          <div className="flex items-center gap-3 text-on-surface-variant">
            <span className="material-symbols-outlined text-[24px] select-none">
              public
            </span>
            <p className="text-sm font-medium">
              <span className="opacity-70 font-normal">Origen:</span>{' '}
              {translateOrigin(personaje.origin.name)}
            </p>
          </div>
        </>
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
