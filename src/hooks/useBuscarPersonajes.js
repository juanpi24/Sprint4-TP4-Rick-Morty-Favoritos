import { useEffect, useState } from "react";
import { buscarPersonajes } from "../services/personajesApi.js";

// Pide los personajes a la API cada vez que cambia "nombre"
export function useBuscarPersonajes(nombre) {
  const [personajes, setPersonajes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const cargarPersonajes = async () => {
      setLoading(true);
      setError(null);

      try {
        const datos = await buscarPersonajes(nombre, controller.signal);
        setPersonajes(datos);
      } catch (err) {
        // Un abort es esperado (el usuario siguió escribiendo): no es un error
        if (err.name !== "AbortError") {
          setError("No pudimos cargar los personajes. Revisá tu conexión e intentá de nuevo.");
        }
      } finally {
        // Si la petición fue cancelada, hay otra en curso: no apagamos el loading
        if (!controller.signal.aborted) setLoading(false);
      }
    };

    cargarPersonajes();

    // Cleanup: cancela la petición anterior para que no pise a la nueva
    return () => controller.abort();
  }, [nombre]);

  return { personajes, loading, error };
}
