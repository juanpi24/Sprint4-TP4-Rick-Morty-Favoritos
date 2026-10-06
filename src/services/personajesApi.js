const API_URL = import.meta.env.VITE_API_URL;

// GET /character/?name=...  (sin nombre devuelve la primera página de personajes)
export async function buscarPersonajes(nombre, signal) {
  const params = new URLSearchParams();
  if (nombre.trim()) params.set("name", nombre.trim());

  // Validamos preventivamente si la variable de entorno está vacía
  if (!API_URL) {
    throw new Error("Error de configuración: La URL de la API (VITE_API_URL) no está definida.");
  }

  try {
    const respuesta = await fetch(`${API_URL}/character/?${params}`, { signal });

    // 1. La API funciona pero no encontró resultados (Comportamiento esperado de esta API)
    if (respuesta.status === 404) return [];

    // 2. El servidor respondió pero con un error HTTP (ej: 500 Internal Server Error, 502 Bad Gateway)
    if (!respuesta.ok) {
      throw new Error(`El servidor respondió con un código de error: ${respuesta.status}`);
    }

    const data = await respuesta.json();
    return data.results;

  } catch (err) {
    // Si el usuario canceló la petición con el AbortController, relanzamos el mismo error 
    // para que el hook de React sepa que fue una cancelación intencional.
    if (err.name === "AbortError") {
      throw err;
    }

    // 3. CAPTURA CRÍTICA: Caída de servidor, URL rota o bloqueos de red (TypeError: Failed to fetch)
    // Personalizamos el mensaje para que el usuario o el Hook entiendan qué pasó.
    throw new Error(
      "No se pudo establecer conexión con el servidor. Es posible que la API esté caída o la URL configurada sea incorrecta.",
      { cause: err }
    );
  }
}
