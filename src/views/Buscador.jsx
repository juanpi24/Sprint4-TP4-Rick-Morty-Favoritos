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
      <label htmlFor="buscador-personajes" className="sr-only">
          Ingresá el nombre de un personaje (Rick, Morty, Summer...)
        </label>
      <input
        id="buscador-personajes"
        type="search"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        placeholder="Ingresá el nombre de un personaje (Rick, Morty, Summer...)"
        aria-label="Buscar personaje"
        className="w-full rounded-lg border border-outline-variant bg-surface-container p-3 text-on-surface placeholder:text-on-surface-variant"
      />

      {loading && <Cargando />}
      {error && <MensajeError mensaje={error} />}
      {!loading && !error && personajes.length === 0 && (
        <div className="rounded-lg bg-error-container p-4 text-center text-on-error-container">
          <span className="material-symbols-outlined">error</span>
          <p>No encontramos personajes con "{nombre}".</p>
        </div>
      )}
      {!loading && !error && personajes.length > 0 && (
        <PersonajeList personajes={personajes} />
      )}
    </section>
  );
}
