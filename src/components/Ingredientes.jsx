import { useState, useEffect } from "react";
import { api } from "../config/api"; 
import FormIngrediente from "./FormIngrediente";

export default function Ingredientes() {
  const [ingredientes, setIngredientes] = useState([]);
  const [editId, setEditId] = useState(null);

  const fetchIngredientes = async () => {
    try {
      const res = await api.get("/ingredientes");
      setIngredientes(res.data);
    } catch (error) {
      console.error("Error cargando ingredientes:", error);
    }
  };

  useEffect(() => {
    fetchIngredientes();
  }, []);

  const agregarIngrediente = async (nuevo) => {
    try {
      const res = await api.post("/ingredientes", nuevo);
      setIngredientes([...ingredientes, res.data]);
    } catch (error) {
      console.error("Error agregando ingrediente:", error);
    }
  };

  const editarIngrediente = async (id, actualizado) => {
    try {
      await api.put(`/ingredientes/${id}`, actualizado);
      setIngredientes(
        ingredientes.map((i) =>
          i.id_ingrediente === id ? { ...i, ...actualizado } : i
        )
      );
      setEditId(null);
    } catch (error) {
      console.error("Error editando ingrediente:", error);
    }
  };

  const eliminarIngrediente = async (id) => {
    try {
      await api.delete(`/ingredientes/${id}`);
      setIngredientes(ingredientes.filter((i) => i.id_ingrediente !== id));
    } catch (error) {
      console.error("Error eliminando ingrediente:", error);
    }
  };

  return (
    <div className="container my-4">
      <h2 className="mb-3">Ingredientes</h2>

      <FormIngrediente
        ingrediente={editId ? ingredientes.find((i) => i.id_ingrediente === editId) : null}
        onSubmit={agregarIngrediente}
        onEdit={editarIngrediente}
      />

      <ul className="list-group">
        {ingredientes.map((ing) => (
          <li key={ing.id_ingrediente} className="list-group-item d-flex justify-content-between align-items-center">
            {ing.nombre} ({ing.unidad_medida})
            <div>
              <button className="btn btn-warning btn-sm me-2" onClick={() => setEditId(ing.id_ingrediente)}>Editar</button>
              <button className="btn btn-danger btn-sm" onClick={() => eliminarIngrediente(ing.id_ingrediente)}>Eliminar</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
