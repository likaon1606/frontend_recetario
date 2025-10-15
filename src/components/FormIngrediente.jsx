import { useState, useEffect } from "react";

export default function FormIngrediente({ ingrediente, onSubmit, onEdit }) {
  const [nombre, setNombre] = useState("");
  const [unidad, setUnidad] = useState("");

  useEffect(() => {
    if (ingrediente) {
      setNombre(ingrediente.nombre);
      setUnidad(ingrediente.unidad_medida);
    }
  }, [ingrediente]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nombre || !unidad) return;

    const nuevo = { nombre, unidad_medida: unidad };

    if (ingrediente && onEdit) {
      onEdit(ingrediente.id_ingrediente, nuevo);
    } else {
      onSubmit(nuevo);
    }

    setNombre("");
    setUnidad("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-3 row g-2 align-items-end">
      <div className="col-md">
        <label>Nombre</label>
        <input
          type="text"
          className="form-control"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
      </div>
      <div className="col-md">
        <label>Unidad</label>
        <input
          type="text"
          className="form-control"
          value={unidad}
          onChange={(e) => setUnidad(e.target.value)}
        />
      </div>
      <div className="col-md-2">
        <button type="submit" className="btn btn-success w-100">
          {ingrediente ? "Actualizar" : "Agregar"}
        </button>
      </div>
    </form>
  );
}
