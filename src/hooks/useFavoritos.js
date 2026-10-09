
import { useLocalStorage } from "./useLocalStorage.js";
import { toast } from "react-toastify";

// Lógica de favoritos con persistencia y notificaciones.
export function useFavoritos() {
  const [favoritos, setFavoritos] = useLocalStorage("favoritos", []);

  const esFavorito = (id) =>
    favoritos.some((personaje) => personaje.id === id);

  const toggleFavorito = (personaje) => {
    const yaEsFavorito = favoritos.some(
      (actual) => actual.id === personaje.id
    );

    setFavoritos((actuales) =>
      yaEsFavorito
        ? actuales.filter((actual) => actual.id !== personaje.id)
        : [
            ...actuales,
            {
              id: personaje.id,
              name: personaje.name,
              image: personaje.image,
              status: personaje.status,
              species: personaje.species,
            },
          ]
    );

    if (yaEsFavorito) {
      toast.info(`${personaje.name} se quitó de favoritos 💔`);
    } else {
      toast.success(`${personaje.name} se agregó a favoritos ⭐`);
    }
  };

  // Vacía la lista completa de favoritos.
  const vaciarFavoritos = () => {
    if (favoritos.length === 0) return;

    setFavoritos([]);
    toast.success("Se vaciaron todos los favoritos 🗑️");
  };

  return {
    favoritos,
    esFavorito,
    toggleFavorito,
    vaciarFavoritos,
  };
}
