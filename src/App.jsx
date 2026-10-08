import {Navbar} from './components/layout/Navbar.jsx';
import {Footer} from './components/layout/Footer.jsx';
//import { FavoritosModal} from './components/ui/FavoritosModal.jsx';
import { FavoritosPanel } from './components/ui/FavoritosPanel.jsx';
import { Buscador } from './views/Buscador.jsx';
import { useToggle } from './hooks/useToggle.js';

export default function App() {
  // Estado de layout: el modal de favoritos se abre desde el Navbar
  //const [modalAbierto, , abrirModal, cerrarModal] = useToggle(false);
  // Estado de layout: el panel lateral se abre desde el Navbar
  const [panelAbierto, , abrirPanel, cerrarPanel] = useToggle(false);

  return (
    <div className="flex min-h-screen flex-col">
      {/*<Navbar onAbrirFavoritos={abrirModal} />*/}
      {/* 2. Pasamos la función para abrir el panel lateral */}
      <Navbar onAbrirFavoritos={abrirPanel} /> 
      <main className="mx-auto w-full max-w-6xl flex-1 p-4">
        <Buscador />
      </main>
      <Footer authorName="Juan Pablo Millicay" />
      {/* 3. Reemplazamos FavoritosModal por ListPanel con sus respectivas props */}
      <FavoritosPanel abierto={panelAbierto} onCerrar={cerrarPanel} />
      {/* <FavoritosModal abierto={modalAbierto} onCerrar={cerrarModal} /> */}
    </div>
  );
}
