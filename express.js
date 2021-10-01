/* eslint-disable no-undef */
import express from "express";
import faker from "faker";
faker.locale = "es";
import handlebars from "express-handlebars";

const app = express();
const PORT = 8081;

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

let __dirname

app.use(express.urlencoded({ extended: true })); // Middleware
app.engine(
  // Configuración del HBS
  ".hbs",
  handlebars({
    defaultLayout: "layoutFrame",
    extname: "hbs",
    layoutsDir: __dirname + "/views",
  })
);

app.set("view engine", "hbs");
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("bodyProducts"), { layout: "layoutFrame" };
});

app.get("/api/productos-test", (req, res) => {
  res.render("bodyProducts"), { layout: "layoutFrame", fakerProducts };
});

const server = app.listen(PORT, () => {
  console.log(
    `Servidor express corriendo en el puerto http://localhost:${PORT}`
  );
});

server.on("error", (error) => console.log(`Error en servidor ${error}`));
