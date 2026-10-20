const API_URL = import.meta.env.VITE_API_URL;

// GET /character/?name=...&gender=...&page=...
// Devuelve un objeto con la lista de personajes, el total de páginas y el total de personajes.
export async function buscarPersonajes({ nombre = '', gender = '', pagina = 1 } = {}, signal) {

  // Validación de la URL de la API
  if (!API_URL) {
    throw new Error(
      'Error de configuración: la URL de la API (VITE_API_URL) no está definida.',
    );
  }

  const params = new URLSearchParams();
  
  // Agregamos validación para evitar errores si 'nombre' no es un string
  if (nombre && typeof nombre === 'string' && nombre.trim()) {
    params.set('name', nombre.trim());
  }
  
  if (gender) {
    params.set('gender', gender);
  }
  
  params.set('page', pagina);

  //  Hacemos la petición a la API con fetch y el AbortController para poder cancelarla si el usuario cambia de búsqueda antes de que termine.
  let respuesta;
  try {
    respuesta = await fetch(`${API_URL}/character/?${params}`, { signal });
  } catch (err) {
    // Si la petición fue abortada por el AbortController (el usuario cambió de búsqueda antes de que termine), lanzamos el error.
    if (err.name === 'AbortError') throw err;

    // Error de red o conectividad (no se pudo conectar con el servidor), lanzamos un error con mensaje amigable.
    throw new Error(
      'No se pudo conectar con el servidor. Revisá tu conexión e intentá de nuevo.',
      { cause: err },
    );
  }

  // 1. La API respondió con 404: no hay personajes que coincidan con la búsqueda
  if (respuesta.status === 404) return { personajes: [], paginas: 0, total: 0 };

  // 2. La API funciona pero respondió con un error (500, 403, etc.)
  if (!respuesta.ok) {
    throw new Error(
      `El servidor respondió con un error (${respuesta.status}). Intentá de nuevo en unos minutos.`,
    );
  }

  // 1. La API respondió con 404: sin resultados
  if (respuesta.status === 404) {
    return { personajes: [], paginas: 0, total: 0 };
  }

  // 2. Error del servidor (500, 403, etc.)
  if (!respuesta.ok) {
    throw new Error(
      `El servidor respondió con un error (${respuesta.status}). Intentá de nuevo en unos minutos.`,
    );
  }

  // 3. Respuesta exitosa: parseo y mapeo de la estructura típica de esta API
  try {
    const data = await respuesta.json();
    return {
      personajes: data.results || [],
      paginas: data.info?.pages || 0,
      total: data.info?.count || 0,
    };
  } catch (err) {
    throw new Error('Error al procesar los datos del servidor.', { cause: err });
  }
}