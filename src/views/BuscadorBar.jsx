import { useState } from "react";
import { useDebounce } from "../hooks/useDebounce.js";
import { useBuscarPersonajes } from "../hooks/useBuscarPersonajes.js";
import { PersonajeList } from "../components/personajes/PersonajeList.jsx";
import { Cargando } from "../components/ui/Cargando.jsx";
import { MensajeError } from "../components/ui/MensajeError.jsx";

// Opciones fijas del filtro. "valor" es lo que espera la API en ?gender=...
// (no se derivan de los resultados: así siempre se ven todas, sin importar la búsqueda)
const GENEROS = [
  { valor: "", etiqueta: "Todos" },
  { valor: "female", etiqueta: "Femenino" },
  { valor: "male", etiqueta: "Masculino" },
  { valor: "genderless", etiqueta: "Sin género" },
  { valor: "unknown", etiqueta: "Desconocido" },
];

export function BuscadorBar() {
  const [busqueda, setBusqueda] = useState("");
  const [genero, setGenero] = useState("");

  // Nombre y género viajan a la API: la búsqueda no filtra un lote ya traído
  const nombre = useDebounce(busqueda);
  const { personajes, loading, error } = useBuscarPersonajes(nombre, genero);

  const onResetSearch = () => {
    setBusqueda("");
    setGenero("");
  };

  return (
    <section className="space-y-6">
      <div>
        <h1 className="font-syne text-2xl font-bold text-on-surface">
          Buscar en el Multiverso
        </h1>
        <p className="text-on-surface-variant text-sm mt-1">
          Buscá tus personajes favoritos por nombre o género
        </p>
      </div>

      {/* Campo de Búsqueda por texto */}
      <div className="relative flex items-center w-full">
        <label htmlFor="buscador-personajes" className="sr-only">
          Buscar por nombre de personaje (Rick, Morty, Summer...)
        </label>
        <span className="material-symbols-outlined absolute left-4 text-on-surface-variant/60 pointer-events-none">
          search
        </span>
        <input
          id="buscador-personajes"
          type="search"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          placeholder="Buscar por nombre (Rick, Morty, Summer...)"
          aria-label="Buscar personaje"
          className="w-full bg-surface-container pl-12 pr-4 py-3.5 rounded-full border border-outline-variant text-on-surface placeholder:text-on-surface-variant/50 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary shadow-inner transition-colors duration-150"
        />
      </div>

      {/* Chips de filtro por género: se envían a la API */}
      <div
        role="group"
        aria-label="Filtrar por género"
        className="w-full flex gap-2 overflow-x-auto py-1 scrollbar-none"
      >
        {GENEROS.map(({ valor, etiqueta }) => {
          const isActive = genero === valor;
          return (
            <button
              key={valor || "todos"}
              type="button"
              aria-pressed={isActive}
              onClick={() => setGenero(valor)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-150 cursor-pointer shrink-0 ${
                isActive
                  ? "bg-primary/10 border border-primary text-primary"
                  : "bg-surface-container border border-outline-variant/40 text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high"
              }`}
            >
              {etiqueta}
            </button>
          );
        })}
      </div>

      {loading && <Cargando />}
      {error && <MensajeError mensaje={error} />}

      {/* Mensaje de Lista Vacía */}
      {!loading && !error && personajes.length === 0 && (
        <section className="flex flex-col items-center justify-center border-2 border-dashed border-outline-variant/40 rounded-2xl p-8 bg-surface-container/40 text-center my-4">
          <div className="w-14 h-14 rounded-full bg-surface-container-high flex items-center justify-center text-primary mb-3">
            👽
          </div>
          <h4 className="text-lg font-bold text-on-surface mb-1">
            No encontramos resultados para tu búsqueda
          </h4>
          <p className="text-sm text-on-surface-variant max-w-xs">
            Probá con otro nombre o seleccionando otra categoría en los botones superiores.
          </p>

          <button
            type="button"
            onClick={onResetSearch}
            className="mt-4 px-4 py-1.5 rounded-full bg-surface-container-high border border-outline-variant/40 text-primary text-xs font-semibold hover:bg-surface-container-highest transition-colors duration-150 cursor-pointer"
          >
            Ver todos los personajes
          </button>
        </section>
      )}

      {/* Renderizado de la lista */}
      {!loading && !error && personajes.length > 0 && (
        <PersonajeList personajes={personajes} />
      )}
    </section>
  );
}
