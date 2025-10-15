export const ingredientes = [
  { id: 1, nombre: "Huevo", unidad: "pieza" },
  { id: 2, nombre: "Harina", unidad: "gramos" },
  { id: 3, nombre: "Leche", unidad: "ml" },
  { id: 4, nombre: "Azúcar", unidad: "gramos" }
];

export const recetas = [
  {
    id: 1,
    nombre: "Hot Cakes",
    descripcion: "hot cakes caseros.",
    categoria: "Desayuno",
    ingredientes: [
      { id: 1, cantidad: 2 },
      { id: 2, cantidad: 200 },
      { id: 3, cantidad: 100 }
    ]
  },
  {
    id: 2,
    nombre: "Panques",
    descripcion: "Panque de nuez.",
    categoria: "Postre",
    ingredientes: [
      { id: 1, cantidad: 1 },
      { id: 2, cantidad: 150 },
      { id: 4, cantidad: 50 }
    ]
  }
];
