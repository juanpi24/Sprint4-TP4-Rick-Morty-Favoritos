import { useFavoritosContext } from "../../context/FavoritosContext.jsx";

export function PersonajeCard({ personaje }) {
  const { esFavorito, toggleFavorito } = useFavoritosContext();
  const favorito = esFavorito(personaje.id);

  return (
    <article className="overflow-hidden rounded-xl bg-white shadow dark:bg-slate-800">
      <img
        src={personaje.image}
        alt={personaje.name}
        loading="lazy"
        className="h-56 w-full object-cover"
      />
      <div className="space-y-1 p-4">
        <h3 className="text-lg font-bold">{personaje.name}</h3>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          {personaje.species} · {personaje.status}
        </p>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          Origen: {personaje.origin.name}
        </p>
        <button
          onClick={() => toggleFavorito(personaje)}
          aria-pressed={favorito}
          className={`mt-2 w-full rounded-lg px-3 py-2 text-sm font-semibold ${
            favorito
              ? "bg-amber-400 text-slate-900 hover:bg-amber-300"
              : "bg-emerald-600 text-white hover:bg-emerald-700"
          }`}
        >
          {favorito ? "★ En favoritos" : "☆ Agregar a favoritos"}
        </button>
      </div>
    </article>
  );
}
