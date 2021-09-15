import { db } from "./db.js";

async function updateById() {
  try {
    await db.from("productos").update("id", 22).where("id", 2);
    console.log("Producto actualizado");
    return;
  } catch (error) {
    console.log("Error al actualizar el producto", error);
  } finally {
    db.destroy();
  }
}
