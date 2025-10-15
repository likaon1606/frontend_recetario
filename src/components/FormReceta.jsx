import { useState, useEffect } from "react";
import { api } from "../config/api"; // tu instancia axios

export default function FormReceta({ onSubmit, receta, onEdit }) {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [categoria, setCategoria] = useState("");
  const [ingredientes, setIngredientes] = useState([]); // ingredientes seleccionados en la receta
  const [allIngredientes, setAllIngredientes] = useState([]); // todos los ingredientes del backend

  useEffect(() => {
    // Cargar ingredientes del backend
    const fetchIngredientes = async () => {
      try {
        const res = await api.get("/ingredientes");
        setAllIngredientes(res.data); // <-- usamos esto para los checkboxes
      } catch (error) {
        console.error("Error cargando ingredientes:", error);
      }
    };
    fetchIngredientes();
  }, []);

  useEffect(() => {
    if (receta) {
      setNombre(receta.nombre);
      setDescripcion(receta.descripcion);
      setCategoria(receta.categoria);
      setIngredientes(receta.ingredientes || []);
    }
  }, [receta]);

  const toggleIngrediente = (id) => {
    if (ingredientes.find((i) => i.id === id)) {
      setIngredientes(ingredientes.filter((i) => i.id !== id));
    } else {
      setIngredientes([...ingredientes, { id, cantidad: 0 }]);
    }
  };

  const handleCantidad = (id, cantidad) => {
    setIngredientes(
      ingredientes.map((i) =>
        i.id === id ? { ...i, cantidad: Number(cantidad) } : i
      )
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nombre || !categoria) return;

    const nueva = { nombre, descripcion, categoria, ingredientes };
    if (receta && onEdit) {
      onEdit(receta.id, nueva);
    } else {
      onSubmit(nueva);
    }

    setNombre("");
    setDescripcion("");
    setCategoria("");
    setIngredientes([]);
  };

  return (
    <form onSubmit={handleSubmit} className="card p-3 mb-4 shadow-sm">
      {/* Inputs de nombre, categoría y descripción */}
      <div className="mb-2">
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="form-control"
        />
      </div>
      <div className="mb-2">
        <input
          type="text"
          placeholder="Categoría"
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          className="form-control"
        />
      </div>
      <div className="mb-2">
        <textarea
          placeholder="Descripción"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          className="form-control"
        />
      </div>

      {/* Checkboxes de ingredientes reales del backend */}
      <div className="mb-2">
        <span className="fw-semibold">Ingredientes:</span>
        <div className="d-flex flex-wrap gap-2 mt-1">
          {allIngredientes.map((ing) => (
            <div key={ing.id_ingrediente} className="form-check d-flex align-items-center gap-1">
              <input
                type="checkbox"
                checked={ingredientes.some((i) => i.id === ing.id_ingrediente)}
                onChange={() => toggleIngrediente(ing.id_ingrediente)}
                className="form-check-input"
                id={`ing-${ing.id_ingrediente}`}
              />
              <label className="form-check-label" htmlFor={`ing-${ing.id_ingrediente}`}>
                {ing.nombre}
              </label>
              {ingredientes.find((i) => i.id === ing.id_ingrediente) && (
                <input
                  type="number"
                  min="0"
                  value={ingredientes.find((i) => i.id === ing.id_ingrediente)?.cantidad}
                  onChange={(e) => handleCantidad(ing.id_ingrediente, e.target.value)}
                  className="form-control form-control-sm ms-1"
                  style={{ width: "70px" }}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <button type="submit" className="btn btn-success mt-2">
        {receta ? "Actualizar" : "Agregar"}
      </button>
    </form>
  );
}
