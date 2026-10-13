import { useEffect, useState } from "react";
import { buscarPersonajes } from "../services/personajesApi.js";

// Pide los personajes a la API cada vez que cambia "nombre", "gender" o "pagina"
export function useBuscarPersonajes(nombre, gender, pagina) {
  const [personajes, setPersonajes] = useState([]);
  const [paginas, setPaginas] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const cargarPersonajes = async () => {
      setLoading(true);
      setError(null);

      try {
        const datos = await buscarPersonajes({ nombre, gender, pagina }, controller.signal);
        setPersonajes(datos.personajes); // Actualizar la lista de personajes
        setPaginas(datos.paginas); // Actualizar el total de páginas
      } catch (err) {
        // Un abort es esperado (el usuario cambió la búsqueda): no es un error
        if (err.name !== "AbortError") {
          // El servicio ya arma un mensaje claro para cada caso (sin conexión, error HTTP, etc.)
          setError(err.message);
        }
      } finally {
        // Si la petición fue cancelada, hay otra en curso: no apagamos el loading
        if (!controller.signal.aborted) setLoading(false);
      }
    };

    cargarPersonajes();

    // Cleanup: cancela la petición anterior para que no pise a la nueva
    return () => controller.abort();
  }, [nombre, gender, pagina]);

  return { personajes, paginas, loading, error };
}
