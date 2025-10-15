import { useState } from "react";
import { ingredientes, recetas } from "../data/data";

export default function RecetasDisponibles() {
  const [ingredientesDisponibles, setIngredientesDisponibles] = useState([]);
  const [resultado, setResultado] = useState([]);

  const toggleIngrediente = (id) => {
    setIngredientesDisponibles((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const buscarRecetas = () => {
    const disponibles = recetas.filter((receta) =>
      receta.ingredientes.every((ing) =>
        ingredientesDisponibles.includes(ing.id)
      )
    );
    setResultado(disponibles);
  };

  return (
    <div>
      <h2 className="mb-3">Selecciona ingredientes disponibles:</h2>
      <div className="mb-3 d-flex flex-wrap gap-2">
        {ingredientes.map((ing) => (
          <button
            key={ing.id}
            className={`btn btn-sm ${
              ingredientesDisponibles.includes(ing.id)
                ? "btn-success"
                : "btn-outline-secondary"
            }`}
            onClick={() => toggleIngrediente(ing.id)}
          >
            {ing.nombre}
          </button>
        ))}
      </div>

      <button className="btn btn-primary mb-4" onClick={buscarRecetas}>
        Buscar recetas
      </button>

<div className="row g-3 justify-content-center">
  {resultado.length > 0 ? (
    resultado.map((r) => (
      <div key={r.id} className="col-md-6">
        <div className="card h-100 shadow-sm">
          <div className="card-body">
            <h5 className="card-title">{r.nombre}</h5>
            <p className="card-text">{r.descripcion}</p>
            <p className="card-text">
              <small className="text-muted">Categoría: {r.categoria}</small>
            </p>
          </div>
        </div>
      </div>
    ))
  ) : (
    <p className="text-muted">No hay recetas disponibles.</p>
  )}
</div>

    </div>
  );
}
