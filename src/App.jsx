import {Navbar} from './components/layout/Navbar.jsx';
import {Footer} from './components/layout/Footer.jsx';
import { FavoritosModal} from './components/ui/FavoritosModal.jsx';
import { Buscador } from './views/Buscador.jsx';
import { useToggle } from './hooks/useToggle.js';

export default function App() {
  // Estado de layout: el modal de favoritos se abre desde el Navbar
  const [modalAbierto, , abrirModal, cerrarModal] = useToggle(false);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar onAbrirFavoritos={abrirModal} />
      <main className="mx-auto w-full max-w-6xl flex-1 p-4">
        <Buscador />
      </main>
      <Footer authorName="Juan Pablo Millicay" />
      <FavoritosModal abierto={modalAbierto} onCerrar={cerrarModal} />
    </div>
  );
}
