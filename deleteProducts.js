import { db } from "./db.js";

async function deleteById(id) {
  try {
    await db.from("productos").del().where("id", `${id}`);
    console.log("Producto borrado");
  } catch (error) {
    console.log("Error al borrar el producto", error);
  } finally {
    db.destroy();
  }
}
