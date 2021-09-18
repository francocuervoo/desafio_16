import { db } from "../dbSqlite.js";

async function createTableMessages(tableName) {
  try {
    const existTableMessages = await db.schema.hasTable(tableName);
    if (!existTableMessages) {
      await db.schema.createTable(tableName, (table) => {
        table.increments("id").primary().notNullable();
        table.string("author").notNullable();
        table.string("text", 200).notNullable();
        table.string("fyh").notNullable();
      });
      return `Tabla ${tableName} creada`;
    }
  } catch (error) {
    console.log(`Error al crear la table ${tableName}`, error);
  } finally {
    db.destroy();
  }
}

createTableMessages("test2")
  .then((res) => console.log(res))
  .catch((error) => console.log(error));
