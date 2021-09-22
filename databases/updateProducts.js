import { dbMaria } from "./dbMaria.js";

async function updateById() {
  try {
    await dbMaria.from("productos").update("id", 32).where("id", 3);
    return "Producto actualizado";
  } catch (error) {
    console.log("Error al actualizar el producto", error);
  } finally {
    dbMaria.destroy();
  }
}

updateById()
  .then((res) => console.log(res))
  .catch((error) => console.log(error));