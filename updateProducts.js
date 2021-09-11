import { db } from "./db.js";

(async function () {
  try {
    await db.from("productos").update("id",3).where('id',4);
    console.log("Producto actualizado");
  } catch (error) {
    console.log("Error al actualizar el producto", error);
  } finally {
    db.destroy();
  }
})();
