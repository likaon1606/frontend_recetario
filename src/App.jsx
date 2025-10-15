import { useState } from "react";
import Ingredientes from "./components/Ingredientes";
import Recetas from "./components/Recetas";
import Compras from "./components/Compras";
import RecetasDisponibles from "./components/RecetasDisponibles";

export default function App() {
  const [view, setView] = useState("recetas");

  const buttons = [
    { id: "recetas", label: "Recetas" },
    { id: "ingredientes", label: "Ingredientes" },
    { id: "compras", label: "Compras" },
    { id: "disponibles", label: "Recetas disponibles" },
  ];

  return (
    <div className="d-flex flex-column align-items-center min-vh-100 p-4 bg-gray-50">
      <h1 className="text-center mb-4">Recetario de Cocina</h1>

      <nav className="nav nav-pills justify-content-center mb-4">
        {buttons.map((btn) => (
          <button
            key={btn.id}
            className={`nav-link ${view === btn.id ? "active" : ""}`}
            onClick={() => setView(btn.id)}
          >
            {btn.label}
          </button>
        ))}
      </nav>

      {view === "recetas" && <Recetas />}
      {view === "ingredientes" && <Ingredientes />}
      {view === "compras" && <Compras />}
      {view === "disponibles" && <RecetasDisponibles />}
    </div>
  );
}
