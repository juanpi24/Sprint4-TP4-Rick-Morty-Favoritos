export function Modal({ abierto, onCerrar, titulo, children }) {
  if (!abierto) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onClick={onCerrar}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={titulo}
        className="max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-default border border-outline-variant bg-surface-container p-5 text-on-surface shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">{titulo}</h2>
          <button onClick={onCerrar} aria-label="Cerrar" className="text-2xl leading-none">
            ×
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
