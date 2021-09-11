import { db } from "./db.js";

;(async function () {
  try {
    const products = await db.select().from("productos");
    console.log("Estos son los productos:", products)
  } catch (error) {
    console.log("Error al leer los productos", error);
  } finally {
    db.destroy();
  }
})()
