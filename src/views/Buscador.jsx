import { useState } from "react";
import { useDebounce } from "../hooks/useDebounce.js";
import { useBuscarPersonajes } from "../hooks/useBuscarPersonajes.js";
import {PersonajeList} from "../components/ui/PersonajeList.jsx";
import {Cargando} from "../components/ui/Cargando.jsx";
import {MensajeError} from "../components/ui/MensajeError.jsx";

export function Buscador() {
  const [busqueda, setBusqueda] = useState("");
  const nombre = useDebounce(busqueda);
  const { personajes, loading, error } = useBuscarPersonajes(nombre);

  const onResetSearch = () => {
    setBusqueda("");
  };

  return (
    <section className="space-y-6">
      <div>
        <h1 className="font-syne text-2xl font-bold text-on-surface">
          Buscar en el Multiverso
        </h1>
        <p className="text-on-surface-variant text-sm mt-1">
          Buscá tus personajes favoritos
        </p>
      </div>
      {/* Campo de Búsqueda por texto */}
      <div className="relative flex items-center w-full">
        <label htmlFor="buscador-personajes" className="sr-only">
          Buscar por nombre de personaje (Rick, Morty, Summer...)
        </label>
        {/* Corrección del color de ícono usando token existente */}
        <span className="material-symbols-outlined absolute left-4 text-on-surface-variant/60 pointer-events-none">
          search
        </span>
        <input
          id="buscador-personajes"
          type="search"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          placeholder="Buscar por nombre de personaje (Rick, Morty, Summer...)"
          aria-label="Buscar personaje"
          className="w-full bg-surface-container pl-12 pr-4 py-3.5 rounded-full border border-outline-variant text-on-surface placeholder:text-on-surface-variant/50 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary shadow-inner transition-colors duration-150"
        />
      </div>

      {/* Si no hay elementos que coincidan con la búsqueda, se muestra un mensaje indicando que no se encontraron resultados.
       Se proporciona un botón para restablecer la búsqueda y ver todos los personajes. */}
      {loading && <Cargando />}
      {error && <MensajeError mensaje={error} />}
      {!loading && !error && personajes.length === 0 && (
        <section className="flex flex-col items-center justify-center border-2 border-dashed border-outline-variant/40 rounded-2xl p-8 bg-surface-container/40 text-center my-4">
        <div className="w-14 h-14 rounded-full bg-surface-container-high flex items-center justify-center text-primary mb-3">
          👽
        </div>
        <h4 className="text-lg font-bold text-on-surface mb-1">
          No encontramos ese personaje "{nombre}"
        </h4>
        <p className="text-sm text-on-surface-variant max-w-xs">
          Probá con otro nombre o explora las categorías en los botones superiores.
        </p>

        {/* Botón para restablecer la búsqueda y ver todos los personajes */}
        <button
          type="button"
          onClick={onResetSearch}
          className="mt-4 px-4 py-1.5 rounded-full bg-surface-container-high border border-outline-variant/40 text-primary text-xs font-semibold hover:bg-surface-container-highest transition-colors duration-150 cursor-pointer"
        >
          Ver todos los personajes
        </button>
      </section>
      )}

      {/* Si hay elementos que coinciden con la búsqueda, se renderiza la lista de personajes utilizando el componente PersonajeList para cada elemento. */}
      {!loading && !error && personajes.length > 0 && (
        <PersonajeList personajes={personajes} />
      )}
    </section>
  );
}
