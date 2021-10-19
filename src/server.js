import express from "express";
const app = express();
import faker from "faker";
faker.locale = "es";
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
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Passport
app.use(passport.initialize());
app.use(passport.session());

// Routers
app.use("/api", apiRouter).use("/", viewsRouter);

app.get("/", (req, res) => {
  //console.log(req.user);
  if (req.isAuthenticated()) {
    res.redirect("/products");
  } else {
    res.redirect("/login");
  }
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
