/* eslint-disable no-undef */
import express from "express";
import faker from "faker";
faker.locale = "es";
//import handlebars from "express-handlebars";

const app = express();
const PORT = 8080;

// Productos
const fakerProducts = [];
for (let i = 0; i < 100; i++) {
  const product = {};
  product.id = i + 1;
  product.title = faker.commerce.productName();
  product.price = faker.commerce.price();
  product.thumbnail = faker.random.image();
  fakerProducts.push(product);
}

//import path from "path";
//const __dirname = path.dirname(new URL(import.meta.url).pathname);

app.use(express.urlencoded({ extended: true })); // Middleware
/*app.engine(
  // Configuración del HBS
  ".hbs",
  handlebars({
    defaultLayout: "layoutFrame",
    extname: "hbs",
    layoutsDir: __dirname + "/views",
  })
);*/

//app.set("view engine", "hbs");
app.use(express.static("public"));

app.get("/api/productos-test", async (req, res) => {
  const shuffled = fakerProducts.sort(() => 0.5 - Math.random())
  let selected = shuffled.splice(0,5)
  res.status(200).send(selected);
});

/*app.get("/api/productos-test", async (req, res) => {
  res.render("bodyProducts", {
    layout: "layoutFrame",
    fakerProducts,
  });
});*/

const server = app.listen(PORT, () => {
  console.log(
    `Servidor express corriendo en el puerto http://localhost:${PORT}`
  );
});

server.on("error", (error) => console.log(`Error en servidor ${error}`));
