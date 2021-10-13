import express from "express";
import faker from "faker"; faker.locale = "es";
import cors from "cors";
import { authMiddleware , loginMiddleware } from "./middlewares/auth.middlewares.js";
import { loginView } from "./controllers/views.controllers.js";

import session from "express-session";
import MongoSession from "connect-mongodb-session";
//import cookieParser from "cookie-parser";

import dotenv from "dotenv";
dotenv.config();

const { MONGODB_URI, PORT, SECRET } = process.env;
const MongoStore = MongoSession(session);

const store = new MongoStore({
  uri: MONGODB_URI,
  collection: "sessions",
});

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set(express.static("public"));
//app.use(cookieParser())

// Midllewares de Express
app
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use(express.static('public')) 
;

// Routers
import apiRouter from './routers/apis/api.router.js';
import viewsRouter from './routers/views/views.router.js';

app
  .use('/api', apiRouter)
  .use('/', viewsRouter)
;

app.use(
  session({
    store,
    resave: true,
    saveUninitialized: true,
    secret: SECRET,
    cookie: {
      maxAge: 10 * 1000,
      sameSite: "lax",
    },
    rolling: true,
  })
);

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

//app.get("/cookieIlimitada", (req, res) => {
//   res.cookie("ilimitada", "data").send("Cookie ilimitada");
//});

app.get("/api/user", (req, res) => {
  res.send({
    userName: req.session.userName,
  });
});

// app.get("/login", (req, res) => {
//   res.sendFile("login.html", {
//     root: "./public",
//   });
// });

// app.post("/login", (req, res) => {
//   console.log("ACA", req.body);
//   req.session.userName = req.body.user;
//   res.redirect("/products");
// });

// app.get("/logout", (req, res) => {
//   req.session.destroy((error) => {
//     if (!error) {
//       res.redirect("/login");
//     } else {
//       res.send({ error });
//     }
//   });
// });

// app.get("/products", auth, (req, res) => {
//   res.sendFile("productos.html", {
//     root: "./public",
//   });
// });

const server = app.listen(PORT, () => {
  console.log(
    `Servidor express corriendo en el puerto http://localhost:${PORT}`
  );
});

server.on("error", (error) => console.log(`Error en servidor ${error}`));
