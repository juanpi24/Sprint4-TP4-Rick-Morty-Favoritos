import { useEffect, useState } from 'react';
import { buscarPersonajes } from '../services/personajesApi.js';

// Pide los personajes a la API cada vez que cambia "nombre", "gender" o "pagina"
export function useBuscarPersonajes(nombre, gender, pagina) {
  const [personajes, setPersonajes] = useState([]);
  const [paginas, setPaginas] = useState(0);
  const [total, setTotal] = useState(0); // Nuevo estado para almacenar 'data.info.count'
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect para manejar la búsqueda de personajes cada vez que cambian los parámetros
  useEffect(() => {
    // Creamos el controlador para abortar peticiones obsoletas
    const controller = new AbortController();

    // Función asíncrona para cargar los personajes
    const cargarPersonajes = async () => {
      setLoading(true);
      setError(null);

      try {
        // Llamamos a la función buscarPersonajes con los parámetros y la señal del AbortController
        const datos = await buscarPersonajes(
          { nombre, gender, pagina },
          controller.signal,
        );
        
        // Evita actualizar el estado si la petición ya fue cancelada
        if (!controller.signal.aborted) {
          setPersonajes(datos.personajes || []); // Salvaguarda por si llega undefined
          setPaginas(datos.paginas || 0);
          setTotal(datos.total || 0);
        }
      } 
      catch (err) {
        // Ignoramos el error si fue una cancelación intencional (el usuario cambió la búsqueda)
        if (err.name !== 'AbortError') {
            setError(err.message || 'Ocurrió un error inesperado');
        }
      } finally {
        // Si la petición fue cancelada, hay otra en curso: no apagamos el loading
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    // Llamamos a la función para cargar los personajes
    cargarPersonajes();

    // Cleanup: cancela la petición anterior para que no pise a la nueva
    return () => controller.abort();
    
    // Arreglo de dependencias
  }, [nombre, gender, pagina]); 

  return { personajes, paginas, total, loading, error };
}
