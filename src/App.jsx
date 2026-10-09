import { Navbar } from './components/layout/Navbar.jsx';
import { Footer } from './components/layout/Footer.jsx';
import { FavoritosPanel } from './components/favoritos/FavoritosPanel.jsx';
import { BuscadorBar } from './views/BuscadorBar.jsx';
import { useToggle } from './hooks/useToggle.js';

export default function App() {
  // Estado de layout: el panel lateral de favoritos se abre desde el Navbar
  const [panelAbierto, , abrirPanel, cerrarPanel] = useToggle(false);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar onAbrirFavoritos={abrirPanel} />
      <main className="mx-auto w-full max-w-6xl flex-1 p-4">
        <BuscadorBar />
      </main>
      <Footer authorName="Juan Pablo Millicay" />
      <FavoritosPanel abierto={panelAbierto} onCerrar={cerrarPanel} />
    </div>
  );
}
