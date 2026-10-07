import { createContext, useContext } from "react";
import { useFavoritos } from "../hooks/useFavoritos.js";

const FavoritosContext = createContext(null);

export function FavoritosProvider({ children }) {
  const value = useFavoritos();
  return (
    <FavoritosContext.Provider value={value}>
      {children}
    </FavoritosContext.Provider>
  );
}

//El guardia de acá abajo es lo que convierte un error silencioso en un error ruidoso: si alguien hace useFavoritosContext() fuera de <FavoritosContext.Provider>, se rompe con un mensaje claro.

// eslint-disable-next-line react-refresh/only-export-components
export function useFavoritosContext() {
  const ctx = useContext(FavoritosContext);
  if (!ctx) throw new Error("useFavoritosContext debe usarse dentro de FavoritosProvider");
  return ctx;
}
