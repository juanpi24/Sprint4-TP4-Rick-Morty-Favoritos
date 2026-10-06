import { useLocalStorage } from "./useLocalStorage.js";

// Lógica de favoritos. Se guarda un resumen de cada personaje (no solo el id)
// porque al cambiar la búsqueda ese personaje ya no viene en los resultados.
export function useFavoritos() {
  const [favoritos, setFavoritos] = useLocalStorage("favoritos", []);

  const esFavorito = (id) => favoritos.some((p) => p.id === id);

  const toggleFavorito = (personaje) => {
    setFavoritos((actuales) =>
      actuales.some((p) => p.id === personaje.id)
        ? actuales.filter((p) => p.id !== personaje.id)
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
  };

  return { favoritos, esFavorito, toggleFavorito };
}
