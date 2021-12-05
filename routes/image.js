const express = require("express");
const router = express.Router();

const imageController = require("../controllers/image");

/**
 * Zobrazí uživateli formulář pro nahrání souboru
 * URL: /
 * Metoda: GET
 */
router.get("/", imageController.getUploadForm);

/**
 * Nahraje soubor na server (pokud jsou splněná kritéria) a zobrazí daný obrázek s tlačítkem pro stažení
 * URL: /upload
 * Metoda: POST
 */
router.post("/upload", imageController.postUploadFile);

module.exports = router;