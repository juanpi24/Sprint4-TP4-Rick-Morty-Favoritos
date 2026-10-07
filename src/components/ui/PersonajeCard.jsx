import { useFavoritosContext } from "../../context/FavoritosContext.jsx";

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
        <p className="text-sm text-on-surface-variant">
          {personaje.species} · {personaje.status}
        </p>
        <p className="text-sm text-on-surface-variant">
          Origen: {personaje.origin.name}
        </p>
        <button
          onClick={() => toggleFavorito(personaje)}
          aria-pressed={favorito}
          className={`mt-2 w-full rounded-lg px-3 py-2 text-sm font-semibold text-on-primary hover:opacity-90 cursor-pointer ${
               favorito ? "bg-tertiary" : "bg-primary"
            }`}>
          {favorito ? "★ En favoritos" : "☆ Agregar a favoritos"}
        </button>
      </div>
    </article>
  );
}
