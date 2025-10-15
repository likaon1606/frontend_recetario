import { useState, useEffect } from "react";
import { api } from "../config/api";
import FormReceta from "./FormReceta";

export default function Recetas() {
  const [recetas, setRecetas] = useState([]);
  const [ingredientes, setIngredientes] = useState([]);
  const [editId, setEditId] = useState(null);

  const fetchData = async () => {
    const [resRecetas, resIngredientes] = await Promise.all([
      api.get("/recetas"),
      api.get("/ingredientes"),
    ]);
    setRecetas(resRecetas.data);
    setIngredientes(resIngredientes.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const agregarReceta = async (nueva) => {
    const res = await api.post("/recetas", { ...nueva, ingredientes: nueva.ingredientes.map(i => ({ id_ingrediente: i.id, cantidad: i.cantidad })) });
    fetchData();
  };

  const editarReceta = async (id, actualizado) => {
    await api.put(`/recetas/${id}`, { ...actualizado, ingredientes: actualizado.ingredientes.map(i => ({ id_ingrediente: i.id, cantidad: i.cantidad })) });
    fetchData();
    setEditId(null);
  };

  const eliminarReceta = async (id) => {
    await api.delete(`/recetas/${id}`);
    fetchData();
  };

  return (
    <div className="container my-4">
      <h2 className="mb-3">Recetas</h2>
      <FormReceta
        receta={editId ? recetas.find(r => r.id_receta === editId) : null}
        onSubmit={agregarReceta}
        onEdit={editarReceta}
      />
      <div className="row g-3">
        {recetas.map((r) => (
          <div key={r.id_receta} className="col-md-6">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{r.nombre}</h5>
                <p className="card-text">{r.descripcion}</p>
                <p className="card-text"><small className="text-muted">Categoría: {r.categoria}</small></p>
                <button className="btn btn-warning btn-sm me-2" onClick={() => setEditId(r.id_receta)}>Editar</button>
                <button className="btn btn-danger btn-sm" onClick={() => eliminarReceta(r.id_receta)}>Eliminar</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
