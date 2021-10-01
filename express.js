// Instance server (socket.io doc version)
import express from "express";
import faker from "faker";
faker.locale = "es";
const app = express(); // Server app
import { dbMaria } from "./databases/dbMaria.js";
import { dbSqlite } from "./databases/dbSqlite.js";
import http from "http";
const server = http.createServer(app);
import { Server } from "socket.io";
const io = new Server(server);
const PORT = 8081;

server.listen(PORT, () => {
  console.log(
    `Servidor express corriendo en el puerto http://localhost:${PORT}`
  );
});

// Contenedor Class
import Contenedor from "./src/contenedor.js";

const contProductos = new Contenedor(dbMaria, "productos"); // Nueva instancia de la clase contenedor
const contMensajes = new Contenedor(dbSqlite, "mensajes"); // Nueva instancia de la clase contenedor

// Socket.io
io.on("connection", async (socket) => {
  // Productos
  const fakerProducts = [];
  for (let i = 0; i < 5; i++) {
    const product = {};
    product.id = i + 1;
    product.title = faker.commerce.productName();
    product.price = faker.commerce.price();
    product.thumbnail = faker.random.image();
    fakerProducts.push(product);
  }
  socket.emit("productos", fakerProducts);

  // Guardar productos
  socket.on("update", async (producto) => {
    await contProductos.save(producto);
    const products = await contProductos.getAll("productos");
    io.emit("productos", products);
  });

  // Mensajes
  const messages = await contMensajes.getAll("mensajes");

  // Emitir desde el servidor la lista de mensajes
  socket.emit("mensajes", messages);

  // Recibir nuevo mensajes y guardar
  socket.on("nuevoMensaje", async (msg) => {
    msg.fyh = new Date().toLocaleString();
    await contMensajes.save(msg); // Save también sirve para guardar mensajes, no necesariamente solo productos
    const messages = await contMensajes.getAll("mensajes");
    io.emit("mensajes", messages);
  });
});

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public")); // Static file folder

// Handlebars
import handlebars from "express-handlebars";

// Seteo le engine que voy a usar y la extensión (hbs)
app.set("view engine", "hbs");
app.engine(
  // Configuración del HBS
  "hbs",
  handlebars({
    layoutsDir: "./views",
    extname: "hbs",
    defaultLayout: "layoutFrame",
  })
);
app.get("/hbs", (req, res) => {
  // Renderiza el archivo bodyForm.hbs dentro del layout llamado 'layoutFrame'
  res.render("bodyProducts"), { layout: "layoutFrame" };
});

app.get("/api/productos-test", (req, res) => {
  res.render("bodyProducts"), { layout: "layoutFrame" };
});
