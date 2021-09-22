import { dbMaria } from "./dbMaria.js";

async function deleteById(id) {
  try {
    await dbMaria.from("productos").del().where("id", `${id}`);
    console.log("Producto borrado");
  } catch (error) {
    console.log("Error al borrar el producto", error);
  } finally {
    dbMaria.destroy();
  }
}

deleteById(2)
  .then((res) => console.log(res))
  .catch((error) => console.log(error));