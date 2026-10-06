import { createContext, useContext, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage.js';

// El contexto nunca se exporta.
const ThemeContext = createContext(null);

/**
 * Provider del tema claro/oscuro. La lógica es chica
 * ("guardar un booleano y togglearlo, y reflejarlo en el DOM") y vive
 * directo en el Provider, usando useLocalStorage.
 */
export function ThemeProvider({ children }) {
  // Primera vez que entra (sin nada guardado todavía): respeta la
  // preferencia de tema del sistema operativo del usuario. Después de
  // esa primera vez, useLocalStorage toma el control y persiste lo que
  // el usuario haya elegido a mano.
  const prefiereOscuro = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [isDark, setIsDark] = useLocalStorage('theme-mode', prefiereOscuro);

  // Este useEffect habla con el DOM, no con React: agrega o saca la
  // clase 'dark' del <html>, que es el gancho que usa Tailwind
  // (@custom-variant dark en index.css) para aplicar los tokens oscuros.
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark((prev) => !prev);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * Hook consumidor, con el guardia : si se usa
 * afuera del Provider, falla explícito en vez de devolver undefined y
 * romper más adelante con un error críptico.
 */
// eslint-disable-next-line react-refresh/only-export-components
export function useThemeContext() {
  const contexto = useContext(ThemeContext);

  if (!contexto) {
    throw new Error('useThemeContext() tiene que usarse adentro de <ThemeProvider>');
  }

  return contexto;
}
