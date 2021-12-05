const path = require("path");

// Modul pro nahrávání souborů
const multer = require("multer");

/**
 * Informace o ukládacím prostoru
 * destination - destinace (umístění) pro nahraný soubor či soubory
 *  path.join(__dirname - absolutní cesta k adresáři controllers - absolutní cesta k adresáři ve kterém se nachází image.js (controller image.js)
 *  "../public/img" - ../ značí, že se chceme vrátit o jednu složku zpět, /public/img - následně řekneme, že se budou ukládat soubory do složky /public/img 
 * filename - název pod kterým se soubor nebo vícero souborů uloží
 *  file.originalname - soubory se budou ukládat pod jménem pod kterým se nahrávaly na server - pokud nahraju soubor s názvem image.jpg na server se nahraje s názvem image.jpg
 *  Né vždy se vyplatí soubory pod stejným názvem ukládat, můžou vzniknout situace kdy soubor se stejným názvem na serveru již jednou je. Pak je lepší buď k názvu připojovat například časovou stopu nahrání či nějaké jiné číslo nebo náhodný řetězec
 */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/img"));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

/**
 * Filter pro soubory
 * mimetype - typ souboru
 * V našem případě filter pouští jen soubory typu jpeg, png a gif. Zbytek filtr zamítne   
 * cb(null, true) - povolení souboru
 * cb(null, false) - zamítnutí souboru
 * Také je zde využit ternární operátor
 *  podmínka ? to_co_se_stane_pokud_je_pravdivá : to_co_se_stane_pokud_není_pravdivá
 *  || - OR - nebo
 */
const filter = (req, file, cb) => {
  file.mimetype === "image/jpeg" ||
  file.mimetype === "image/png" ||
  file.mimetype === "image/gif"
    ? cb(null, true)
    : cb(null, false);
};

/**
 * Proměnná upload do které uložíme nastavený multer - následně přes proměnnou upload budeme nahrávat
 * options:
 *  storage - úložiště
 *  limits - omezení
 *    fileSize - maximální velikost souboru v bytech
 *  fileFilter - filter pro soubory
 */
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 10,
  },
  fileFilter: filter,
});

// Logika pro render pohledu upload.pug, který slouží pro nahrání souboru - obsahuje v sobě formulář pro nahrání
exports.getUploadForm = (req, res) => res.render("upload");

/**
 * Logika pro nahrání souboru
 * upload.single("avatar") - nahraje jeden soubor - tento soubor bude přejímat z inputu s názvem avatar - views/upload.pug:5
 * Následně po nahrání se vyrenderuje pohled download.pug a předá do tohoto pohledu proměnnou imageUrl, která je nastavená na cestu k nahranému souboru
 */
exports.postUploadFile = [
  upload.single("avatar"),
  (req, res) => {
    res.render("download", {
      imageUrl: `/img/${req.file.originalname}`,
    });
  },
];
