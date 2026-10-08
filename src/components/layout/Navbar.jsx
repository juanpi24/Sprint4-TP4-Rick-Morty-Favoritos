import { useThemeContext } from "../../context/ThemeContext.jsx";
import { useFavoritosContext } from "../../context/FavoritosContext.jsx";

export function Navbar({ onAbrirFavoritos }) {
  const { isDark, toggleTheme } = useThemeContext();
  const { favoritos } = useFavoritosContext();

  return (
    <header className="sticky top-0 z-40 bg-surface-container/90 backdrop-blur border-b border-outline-variant/30">
      <nav className="max-w-5xl mx-auto flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <img
            src="/logo.png"
            alt="Logo de Rick y Morty"
            className="h-9 w-9 object-contain rounded-full"
          />
          <span className="font-syne font-bold text-lg text-on-surface">
            Rick y Morty <span className="text-primary">Favoritos</span>
          </span>
        </div>
                
      <div className="flex items-center gap-2">
         
        <button
            onClick={toggleTheme}
            aria-label={isDark ? 'Activar modo claro' : 'Activar modo oscuro'}
            className="flex items-center justify-center w-9 h-9 rounded-full bg-surface-container-high border border-outline-variant/40 hover:bg-surface-container-highest transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-on-surface text-lg">
              {isDark ? 'light_mode' : 'dark_mode'}
            </span>
        </button>

          <button
            onClick={onAbrirFavoritos}
            aria-label="Abrir favoritos"
            className="relative flex items-center gap-2 bg-surface-container-high px-3.5 py-1.5 rounded-full border border-outline-variant/40 hover:bg-surface-container-highest transition-colors duration-150 active:scale-95 cursor-pointer"
          >
            <span className="material-symbols-outlined text-primary text-[20px]">favorite</span>
            <span className="font-label-md text-sm text-on-surface font-medium hidden sm:inline">
              Mis Favoritos
            </span>

             {favoritos.length > 0 && (
              <span className="bg-primary text-on-primary text-xs font-bold rounded-full min-w-5 h-5 flex items-center justify-center px-1">
                {favoritos.length}
              </span>
            )}
          </button>
        </div>
      </nav>
    </header>
  );
}
