export function Paginacion({ pagina, paginas, onCambiar }) {
  // Con una sola página (o ninguna) no hay nada que paginar
  if (paginas <= 1) return null;

 

  return (
    <nav
      aria-label="Paginación de resultados"
      className="flex items-center justify-center gap-3 sm:gap-4"
    >
      <button
        type="button"
        onClick={() => onCambiar(pagina - 1)}
        disabled={pagina === 1}
        className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border border-outline-variant/40 bg-surface-container text-on-surface transition-colors duration-150 cursor-pointer hover:bg-surface-container-high disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-surface-container"
      >
        <span className="material-symbols-outlined text-[18px]">chevron_left</span>
        Anterior
      </button>

      <span className="text-sm text-on-surface-variant">
        Página <strong className="text-on-surface">{pagina}</strong> de {paginas}
      </span>

      <button
        type="button"
        onClick={() => onCambiar(pagina + 1)}
        disabled={pagina === paginas}
        className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border border-outline-variant/40 bg-surface-container text-on-surface transition-colors duration-150 cursor-pointer hover:bg-surface-container-high disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-surface-container"
      >
        Siguiente
        <span className="material-symbols-outlined text-[18px]">chevron_right</span>
      </button>
    </nav>
  );
}
