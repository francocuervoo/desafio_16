import { dbSqlite } from "./dbSqlite.js";

async function createTableMessages(tableName) {
  try {
    const existTableMessages = await dbSqlite.schema.hasTable(tableName);
    if (!existTableMessages) {
      await dbSqlite.schema.createTable(tableName, (table) => {
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
    dbSqlite.destroy();
  }
}

createTableMessages("mensajes")
  .then((res) => console.log(res))
  .catch((error) => console.log(error));
