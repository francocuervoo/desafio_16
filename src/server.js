import express from "express"; const app = express();
import faker from "faker"; faker.locale = "es";
import cors from "cors";
import session from "express-session";
import MongoSession from "connect-mongodb-session";
import dotenv from "dotenv";
import apiRouter from "./routers/apis/api.router.js";
import viewsRouter from "./routers/views/views.router.js";
import passport from "./utils/passport.util.js";
dotenv.config();


const { MONGODB_URI, PORT, SECRET, NODE_ENV } = process.env;
const MongoStore = MongoSession(session);

const store = new MongoStore({
  uri: MONGODB_URI,
  collection: "sessions",
});

app.use(
  session({
    store,
    resave: true,
    saveUninitialized: true,
    secret: SECRET,
    cookie: {
      maxAge: 10 * 1000,
      sameSite: NODE_ENV == "development" ? "lax" : "strict",
    },
    rolling: true,
  })
);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set(express.static("public"));

// Midllewares de Express
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"));

// Passport
app.use(passport.initialize());
app.use(passport.session());

// Routers
app.use("/api", apiRouter).use("/", viewsRouter);

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

app.get("/logout", (req, res) => {
  req.session.destroy((error) => {
    if (!error) {
      res.sendFile("logout.html", {
        root: "./public",
      });
    } else {
      res.send({ error });
    }
  });
});

const server = app.listen(PORT, () => {
  console.log(
    `Servidor express corriendo en el puerto http://localhost:${PORT}`
  );
});

server.on("error", (error) => console.log(`Error en servidor ${error}`));
