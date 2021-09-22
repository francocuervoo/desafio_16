import { dbMaria } from "./db.js";

async function createTableProducts(tableName) {
  try {
    const existTableProducts = await dbMaria.schema.hasTable(tableName);
    if (!existTableProducts) {
      await dbMaria.schema.createTable(tableName, (table) => {
        table.increments("id").primary().notNullable();
        table.string("title").notNullable();
        table.integer("price").notNullable();
        table.string("thumbnail").notNullable();
        table.string("stock").notNullable();
        table.string("description", 200).notNullable();
        table.string("code", 4).notNullable();
        table.string("time").notNullable();
      });
      return `Tabla ${tableName} creada`
    }
  } catch (error) {
    console.log(`Error al crear la Tabla ${tableName}`, error);
  } finally {
    dbMaria.destroy();
  }
}

createTableProducts("productos")
  .then((res) => console.log(res))
  .catch((error) => console.log(error));