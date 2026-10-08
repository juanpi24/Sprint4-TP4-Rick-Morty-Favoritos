import {PersonajeCard} from "../personajes/PersonajeCard.jsx";

export function PersonajeList({ personajes }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {personajes.map((personaje) => (
        <PersonajeCard key={personaje.id} personaje={personaje} />
      ))}
    </div>
  );
}
