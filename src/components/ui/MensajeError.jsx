export function MensajeError({ mensaje }) {
  return (
    <p role="alert" className="rounded-lg bg-red-100 p-4 text-center text-red-800">
      {mensaje}
    </p>
  );
}
