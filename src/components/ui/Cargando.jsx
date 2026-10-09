export function Cargando() {
  return (
    <div role="status" className="py-10 text-center">
      <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-outline-variant border-t-primary" />
      <p className="mt-3">Cargando personajes...</p>
    </div>
  );
}
