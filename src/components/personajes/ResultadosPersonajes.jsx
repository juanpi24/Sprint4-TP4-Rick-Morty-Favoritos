import { useState } from 'react';
import { useBuscarPersonajes } from '../../hooks/useBuscarPersonajes.js';
import { PersonajeList } from './PersonajeList.jsx';
import { Paginacion } from '../ui/Paginacion.jsx';
import { Cargando } from '../ui/Cargando.jsx';
import { MensajeError } from '../ui/MensajeError.jsx';

// BuscadorBar lo monta con una key que cambia con el nombre y el género:
// cada búsqueda nueva crea una instancia nueva y "pagina" vuelve a 1 sola.
export function ResultadosPersonajes({ nombre, genero, onLimpiar }) {
  const [pagina, setPagina] = useState(1);
  const { personajes, paginas, total, loading, error } = useBuscarPersonajes(
    nombre,
    genero,
    pagina,
  );

  const cambiarPagina = (nueva) => {
    setPagina(nueva);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) return <Cargando />;
  if (error) return <MensajeError mensaje={error} />;

  // Mensaje de Lista Vacía
  if (personajes.length === 0) {
    return (
      <section className="flex flex-col items-center justify-center border-2 border-dashed border-outline-variant/40 rounded-2xl p-8 bg-surface-container/40 text-center my-4">
        <div className="w-14 h-14 rounded-full bg-surface-container-high flex items-center justify-center text-primary mb-3">
          👽
        </div>
        <h4 className="text-lg font-bold text-on-surface mb-1">
          No encontramos resultados para tu búsqueda
        </h4>
        <p className="text-sm text-on-surface-variant max-w-xs">
          Probá con otro nombre o seleccionando otra categoría en los botones
          superiores.
        </p>

        <button
          type="button"
          onClick={onLimpiar}
          className="mt-4 px-4 py-1.5 rounded-full bg-surface-container-high border border-outline-variant/40 text-primary text-xs font-semibold hover:bg-surface-container-highest transition-colors duration-150 cursor-pointer"
        >
          Ver todos los personajes
        </button>
      </section>
    );
  }

  // Renderizado de la lista + paginación
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <span className="material-symbols-outlined">person_search</span>
        <h2 className="text-lg font-bold text-primary">
          {total} {total === 1 ? 'personaje encontrado' : 'personajes encontrados'}
        </h2>
      </div>
      <PersonajeList personajes={personajes} />
      <Paginacion pagina={pagina} paginas={paginas} onCambiar={cambiarPagina} />
    </div>
  );
}
