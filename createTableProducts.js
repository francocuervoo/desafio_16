import { db } from "./db.js";

async function createTableProducts() {
  try {
    const existTableProducts = await db.schema.hasTable("productos");
    if (!existTableProducts) {
      await db.schema.createTable("productos", (table) => {
        table.increments("id").primary().notNullable();
        table.string("title").notNullable();
        table.integer("price").notNullable();
        table.string("thumbnail").notNullable();
        table.string("stock").notNullable();
        table.string("description", 200).notNullable();
        table.string("code", 4).notNullable();
        table.string("time").notNullable();
      });
      console.log("Tabla de productos creada");
    }
  } catch (error) {
    console.log("Error en la Tabla de productos", error);
  } finally {
    db.destroy();
  }
}
