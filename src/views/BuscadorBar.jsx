import { useState, useMemo } from "react";
import { useDebounce } from "../hooks/useDebounce.js";
import { useBuscarPersonajes } from "../hooks/useBuscarPersonajes.js";
import { PersonajeList } from "../components/personajes/PersonajeList.jsx";
import { Cargando } from "../components/ui/Cargando.jsx";
import { MensajeError } from "../components/ui/MensajeError.jsx";
import { translateGender } from "../constants/translations.js"; 

export function BuscadorBar() {
  const [busqueda, setBusqueda] = useState("");
  const [generoSeleccionado, setGeneroSeleccionado] = useState("Todos");
  
  const nombreDebounced = useDebounce(busqueda);
  const { personajes, loading, error } = useBuscarPersonajes(nombreDebounced);

  // Derivamos los géneros disponibles directamente de los personajes que devolvió la API
  const listaGeneros = useMemo(() => {
    if (!personajes) return ["Todos"];
    const generosUnicos = [...new Set(personajes.map((p) => p.gender).filter(Boolean))];
    return ["Todos", ...generosUnicos];
  }, [personajes]);

  // Filtramos localmente aplicando la búsqueda inteligente combinada
  const personajesFiltrados = useMemo(() => {
    if (!personajes) return [];
    
    return personajes.filter((personaje) => {
      const query = busqueda.toLowerCase();
      const generoTraducido = translateGender(personaje.gender).toLowerCase();
      const generoOriginal = (personaje.gender || "").toLowerCase();

      // Condición de búsqueda por texto: coincide con nombre OR género (en inglés o español)
      const coincideBusqueda =
        personaje.name.toLowerCase().includes(query) ||
        generoOriginal.includes(query) ||
        generoTraducido.includes(query);

      // Condición de filtro por botón de Género (Chips)
      const coincideGeneroChip =
        generoSeleccionado === "Todos" || personaje.gender === generoSeleccionado;

      return coincideBusqueda && coincideGeneroChip;
    });
  }, [busqueda, personajes, generoSeleccionado]);

  const onResetSearch = () => {
    setBusqueda("");
    setGeneroSeleccionado("Todos");
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
          Buscar por nombre o género (Rick, Femenino, Masculino...)
        </label>
        <span className="material-symbols-outlined absolute left-4 text-on-surface-variant/60 pointer-events-none">
          search
        </span>
        <input
          id="buscador-personajes"
          type="search"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          placeholder="Buscar por nombre o género (Rick, Femenino, Masculino...)"
          aria-label="Buscar personaje"
          className="w-full bg-surface-container pl-12 pr-4 py-3.5 rounded-full border border-outline-variant text-on-surface placeholder:text-on-surface-variant/50 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary shadow-inner transition-colors duration-150"
        />
      </div>

      {/* Chips de Filtro por Género (Traducidos dinámicamente) */}
      {!loading && !error && personajes.length > 0 && (
        <div className="w-full flex gap-2 overflow-x-auto py-1 scrollbar-none">
          {listaGeneros.map((gen) => {
            const isActive = generoSeleccionado === gen;
            return (
              <button
                key={gen}
                type="button"
                onClick={() => setGeneroSeleccionado(gen)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-150 cursor-pointer shrink-0 ${
                  isActive
                    ? "bg-primary/10 border border-primary text-primary"
                    : "bg-surface-container border border-outline-variant/40 text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high"
                }`}
              >
                {/* 2. Mostramos "Todos" tal cual, o el género traducido */}
                {gen === "Todos" ? "Todos" : translateGender(gen)}
              </button>
            );
          })}
        </div>
      )}

      {loading && <Cargando />}
      {error && <MensajeError mensaje={error} />}

      {/* Mensaje de Lista Vacía */}
      {!loading && !error && personajesFiltrados.length === 0 && (
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

      {/* Renderizado de la lista filtrada */}
      {!loading && !error && personajesFiltrados.length > 0 && (
        <PersonajeList personajes={personajesFiltrados} />
      )}
    </section>
  );
}
