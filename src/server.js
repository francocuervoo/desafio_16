import express from "express";
import faker from "faker"; faker.locale = "es";
import cors from "cors";
import { auth } from "./middlewares/auth.middleware.js";


const app = express();
const PORT = 8080;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set(express.static("public"));

// Genero Productos
const fakerProducts = [];
for (let i = 0; i < 100; i++) {
  const product = {};
  product.id = i + 1;
  product.title = faker.commerce.productName();
  product.price = faker.commerce.price();
  product.thumbnail = faker.random.image();
  fakerProducts.push(product);
}

app.get("/api/productos-test", async (req, res) => {
  const shuffled = fakerProducts.sort(() => 0.5 - Math.random());
  let selected = shuffled.splice(0, 5);
  res.status(200).send(selected);
});

app.get("/api/user", (req, res) => {
  res.send({
    nombre: req.session.nombre,
  });
});

app.get("/login", (req, res) => {
  res.sendFile("login.html", {
    root: "./public",
  });
});

app.post("/login", async (req, res) => {
  req.session.nombre = req.body.nombre;
  res.redirect("/products");
});

app.get("/products", auth, (req, res) => {
  res.sendFile("productos.html", {
    root: "./public",
  });
});

const server = app.listen(PORT, () => {
  console.log(
    `Servidor express corriendo en el puerto http://localhost:${PORT}`
  );
});

server.on("error", (error) => console.log(`Error en servidor ${error}`));
