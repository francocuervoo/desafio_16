import { db } from "./db.js";

async function getAll() { 
  try {
    const products = await db.select().from("productos");
    console.log("Estos son los productos:", products);
    return products;
  } catch (error) {
    console.log("Error al leer los productos", error);
  }
}

getAll()
  .then((res) => console.log(res))
  .catch((error) => console.log(error));