import { useState, useEffect } from "react";
import { api } from "../config/api";

export default function Compras() {
  const [compras, setCompras] = useState([]);
  const [ingredientes, setIngredientes] = useState([]);
  const [idIngrediente, setIdIngrediente] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [fecha, setFecha] = useState("");

  const fetchData = async () => {
    const [resCompras, resIngredientes] = await Promise.all([
      api.get("/compras"),
      api.get("/ingredientes")
    ]);
    setCompras(resCompras.data);
    setIngredientes(resIngredientes.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const agregarCompra = async (e) => {
    e.preventDefault();
    if (!idIngrediente || !cantidad || !fecha) return;
    await api.post("/compras", { id_ingrediente: idIngrediente, cantidad, fecha_compra: fecha });
    fetchData();
    setIdIngrediente(""); setCantidad(""); setFecha("");
  };

  return (
    <div className="container my-4">
      <h2 className="mb-3">Compras</h2>
      <form onSubmit={agregarCompra} className="row g-2 mb-3 align-items-end">
        <div className="col-md">
          <label>Ingrediente</label>
          <select value={idIngrediente} onChange={(e) => setIdIngrediente(e.target.value)} className="form-select">
            <option value="">Selecciona</option>
            {ingredientes.map(i => <option key={i.id_ingrediente} value={i.id_ingrediente}>{i.nombre}</option>)}
          </select>
        </div>
        <div className="col-md-3">
          <label>Cantidad</label>
          <input type="number" value={cantidad} onChange={(e) => setCantidad(e.target.value)} className="form-control"/>
        </div>
        <div className="col-md-3">
          <label>Fecha</label>
          <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} className="form-control"/>
        </div>
        <div className="col-md-2">
          <button type="submit" className="btn btn-success w-100">Agregar</button>
        </div>
      </form>

      <ul className="list-group">
        {compras.map(c => (
          <li key={c.id_compra} className="list-group-item">
            {c.nombre} - {c.cantidad} - {c.fecha_compra}
          </li>
        ))}
      </ul>
    </div>
  );
}
