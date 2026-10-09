import { useEffect, useState } from "react";
import { buscarPersonajes } from "../services/personajesApi.js";

// Pide los personajes a la API cada vez que cambia "nombre" o "gender"
export function useBuscarPersonajes(nombre, gender) {
  const [personajes, setPersonajes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const cargarPersonajes = async () => {
      setLoading(true);
      setError(null);

      try {
        const datos = await buscarPersonajes({ nombre, gender }, controller.signal);
        setPersonajes(datos);
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
  }, [nombre, gender]);

  return { personajes, loading, error };
}
