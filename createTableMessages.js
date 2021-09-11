import { db } from "./db.js";

(async function () {
  try {
    const existTableMessages = await db.schema.hasTable("mensajes");
    if (!existTableMessages) {
      await db.schema.createTable("mensajes", (table) => {
        table.increments("id").primary().notNullable();
        table.string("author").notNullable();
        table.string("text", 200).notNullable();
        table.string("fyh").notNullable();
      });
      console.log("Tabla de mensajes creada");
    }
  } catch (error) {
    console.log("Error en la Tabla de mensajes", error);
  } finally {
    db.destroy();
  }
})();