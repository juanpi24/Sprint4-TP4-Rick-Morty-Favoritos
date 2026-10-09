const API_URL = import.meta.env.VITE_API_URL;

// GET /character/?name=...&gender=...  (sin filtros devuelve la primera página de personajes)
export async function buscarPersonajes({ nombre, gender }, signal) {
  // Validamos preventivamente si la variable de entorno está vacía
  if (!API_URL) {
    throw new Error("Error de configuración: la URL de la API (VITE_API_URL) no está definida.");
  }

  const params = new URLSearchParams();
  if (nombre.trim()) params.set("name", nombre.trim());
  if (gender) params.set("gender", gender);

  // El try/catch envuelve SOLO el fetch: así los errores HTTP de más abajo
  // conservan su propio mensaje y no se pisan con el de "sin conexión".
  let respuesta;
  try {
    respuesta = await fetch(`${API_URL}/character/?${params}`, { signal });
  } catch (err) {
    // Si el usuario canceló la petición con el AbortController, relanzamos el mismo error
    // para que el hook de React sepa que fue una cancelación intencional.
    if (err.name === "AbortError") throw err;

    // Caída de red, servidor caído o bloqueo (TypeError: Failed to fetch)
    throw new Error("No se pudo conectar con el servidor. Revisá tu conexión e intentá de nuevo.", { cause: err });
  }

  // 1. La API funciona pero no encontró resultados (comportamiento esperado de esta API)
  if (respuesta.status === 404) return [];

  // 2. El servidor respondió con un error HTTP (ej: 500, 502)
  if (!respuesta.ok) {
    throw new Error(`El servidor respondió con un error (${respuesta.status}). Intentá de nuevo en unos minutos.`);
  }

  // 3. Respuesta con formato inesperado
  try {
    const data = await respuesta.json();
    return data.results;
  } catch (err) {
    throw new Error("La respuesta del servidor no tiene un formato válido.", { cause: err });
  }
}
