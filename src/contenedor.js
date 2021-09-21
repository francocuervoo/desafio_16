import knex from "knex";

// Contenedor class
class Contenedor {
  constructor(config, tabla) {
    this.knex = knex(config);
    this.tabla = tabla;
  }
  // Contenedor Methods
  async save(product) {
    // Save product
    try {
      await knex.insert(product).from(tabla);
      return "Producto guardado";
    } catch (error) {
      console.log(error);
    }
  }

  async getById(id) {
    // Get product by id
    try {
      await knex
        .select("title", "price", "id")
        .from("productos")
        .where("id", id);
      for (row of rows) {
        return `${row["id"]} ${row["title"]} ${row["price"]}`;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getAll() {
    //Get all productos
    try {
      const productos = await knex.select("*").from("productos");
      return productos;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteById(id) {
    //Delete product by id
    try {
      await knex.from("productos").del().where("id", `${id}`);
      return "Producto borrado";
    } catch (error) {
      console.log("Error al borrar el producto", error);
    }
  }

  async deleteAll() {
    // Delete all
    try {
      await knex.from("productos").del();
      return "Todos los productos borrados";
    } catch (error) {
      console.log("Error al borrar todos los productos", error);
    }
  }

  async updateById(id, newProduct) {
    let newTitle = newProduct.title;
    let newPrice = newProduct.price;
    let newThumbnail = newProduct.thumbnail;
    let newStock = newProduct.stock;
    let newDescription = newProduct.description;
    let newCode = newProduct.code;
    try {
      await knex
        .from("productos")
        .where("id", id)
        .update({
          title: newTitle,
          price: newPrice,
          thumbnail: newThumbnail,
          stock: newStock,
          description: newDescription,
          code: newCode,
        });
      return "Producto actualizado";
    } catch (error) {
      console.log("Error al actualizar los productos", error);
    }
  }
}

class Productos extends Contenedor{
}
class Mensajes extends Contenedor{
  
}


export default Contenedor;
