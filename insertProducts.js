import { db } from "./db.js";

const products = [
  {
    title: "Aire Acondicionado 1",
    price: 179999,
    thumbnail:
      "https://images.fravega.com/s500/c689af7b575f5881c219ff18f1166e11.jpg",
      stock: 20,
      description:
      "El split frío/calor Carrier tiene 4300 frigorías y 5000 watts de potencia.",
    code: "AA01",
    time: "2021-09-03T16:25:47.727Z",
  },
  {
    title: "Aire Acondicionado 2",
    price: 179999,
    thumbnail:
      "https://images.fravega.com/s500/c689af7b575f5881c219ff18f1166e11.jpg",
      stock: 20,
      description:
      "El split frío/calor Carrier tiene 4300 frigorías y 5000 watts de potencia.",
    code: "AA02",
    time: "2021-09-03T16:25:47.727Z",
  },  
  {
    title: "Aire Acondicionado 3",
    price: 179999,
    thumbnail:
      "https://images.fravega.com/s500/c689af7b575f5881c219ff18f1166e11.jpg",
    stock: 20,
    description:
      "El split frío/calor Carrier tiene 4300 frigorías y 5000 watts de potencia.",
    code: "AA02",
    time: "2021-09-03T16:25:47.727Z",
  },    
]

;(async function () {
  try {
    const response = await db.insert(products).from("productos");
    console.log("Productos insertados", response)
  } catch (error) {
    console.log("Error al insertar productos", error);
  } finally {
    db.destroy();
  }
})()
