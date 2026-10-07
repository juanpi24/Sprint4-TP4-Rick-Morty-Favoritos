import { useState } from "react";
import { useDebounce } from "../hooks/useDebounce.js";
import { useBuscarPersonajes } from "../hooks/useBuscarPersonajes.js";
import PersonajeList from "../components/ui/PersonajeList.jsx";
import Cargando from "../components/ui/Cargando.jsx";
import MensajeError from "../components/ui/MensajeError.jsx";

export function Buscador() {
  const [busqueda, setBusqueda] = useState("");
  const nombre = useDebounce(busqueda);
  const { personajes, loading, error } = useBuscarPersonajes(nombre);

  return (
    <section className="space-y-6">
      <input
        type="search"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        placeholder="Buscar personaje (Rick, Morty, Summer...)"
        aria-label="Buscar personaje"
        className="w-full rounded-lg border border-outline-variant bg-surface-container p-3 text-on-surface placeholder:text-on-surface-variant"
      />

      {loading && <Cargando />}
      {error && <MensajeError mensaje={error} />}
      {!loading && !error && personajes.length === 0 && (
        <p className="py-10 text-center">No encontramos personajes con "{nombre}".</p>
      )}
      {!loading && !error && personajes.length > 0 && (
        <PersonajeList personajes={personajes} />
      )}
    </section>
  );
}
