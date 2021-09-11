import { db } from "./db.js";

(async function () {
  try {
    await db.from("productos").del().where("id", 3);
    console.log("Producto borrado");
  } catch (error) {
    console.log("Error al borrar el producto", error);
  } finally {
    db.destroy();
  }
})();
