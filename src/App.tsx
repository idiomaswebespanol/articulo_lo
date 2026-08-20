import Presentacion from "./components/Presentacion";

export default function App() {
  return (
    <div className="bg-paper font-sans text-ink antialiased">
      {/* film grain */}
      <div
        aria-hidden
        className="bg-grain pointer-events-none fixed inset-0 z-[100] opacity-[0.05]"
      />

      <main className="relative">
        <Presentacion />
      </main>
    </div>
  );
}
