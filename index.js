const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
const app = express();
const PORT = 3000;

const imageRouter = require("./routes/image");

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

/**
 * Nastaví složku s názvem views pro pohledy
 * __dirname - absolutní cesta k adresáři ve kterém se nachází soubor, který __dirname používá = v našem případě __dirname používá index.js na 19 řádku - __dirname vrátí absolutní cestu k adresáři ve kterém je index.js
 * "views" - k předešlé absolutní cestě se připojí ještě adresář views - zřetězí se dohromady
 */
app.set("views", path.join(__dirname, "views"));

// Nastaví view engine na pug
app.set("view engine", "pug");

/**
 * Zdostupní obsah složky public jako veřejný
 * Adresáře css, img, js budou veřejně přístupné (společně i s jejich obsahem)
 * V URL se název hlavní složky nepíše - v tomto případě nepíšeme "public"
 * Takže místo 127.0.0.1:3000/public/img/obrazek.jpg (špatná URL adresa)
 * se píše 127.0.0.1:3000/img/obrazek.jpg (správná URL adresa - bez public)
 */
app.use(express.static(path.join(__dirname, "public")));

app.use("/", imageRouter);

app.listen(PORT, () => console.log(`App is running on ${PORT}`));