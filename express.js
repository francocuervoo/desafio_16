/* eslint-disable no-undef */

// Instance server (socket.io doc version)
const express = require("express"); // Import express
const app = express(); // Server app
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const PORT = 8081;

server.listen(PORT, () => {
  console.log(
    `Servidor express corriendo en el puerto http://localhost:${PORT}`
  );
});

// Contenedor Class - One instance for products and one for messages
const Contenedor = require("./src/contenedor.js");
const contProductos = new Contenedor("./src/data/productos.json"); // Nueva instancia de la clase contenedor
const contMensajes = new Contenedor("./src/data/mensajes.json"); // Nueva instancia de la clase contenedor

// Socket.io
io.on("connection", async (socket) => {
  // Productos
  const products = await contProductos.getAll();
  socket.emit("productos", products);

  // Guardar productos
  socket.on("update", async (producto) => {
    await contProductos.save(producto);
    io.emit("productos", products);
  });

  // Mensajes
  const messages = await contMensajes.getAll();

  // Emitir desde el servidor la lista de mensajes
  socket.emit("mensajes", messages);

  // Recibir nuevo mensajes y guardar
  socket.on("nuevoMensaje", async (msg) => {
    msg.fyh = new Date().toLocaleString();
    await contMensajes.save(msg); // Save también sirve para guardar mensajes, no necesariamente solo productos
    io.emit("mensajes", messages);
  });
});

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public")); // Static file folder

// Handlebars
const handlebars = require("express-handlebars");

// Seteo le engine que voy a usar y la extensión (hbs)
app.set("view engine", "hbs");
app.engine(
  // Configuración del HBS
  "hbs",
  handlebars({
    layoutsDir: __dirname + "/views",
    extname: "hbs",
    defaultLayout: "layoutFrame",
  })
);
app.get("/hbs", (req, res) => {
  // Renderiza el archivo bodyForm.hbs dentro del layout llamado 'layoutFrame'
  res.render("bodyProducts"), { layout: "layoutFrame" };
});
