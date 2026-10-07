export function MensajeError({ mensaje }) {
  return (
    <p role="alert" className="rounded-lg bg-error-container p-4 text-center text-on-error-container">
      {mensaje}
    </p>
  );
}
