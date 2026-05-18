var express = require("express");
var router = express.Router();

var taxaController = require("../controllers/taxaController")

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js

router.post("/adicionar", (req, res) => {
    taxaController.adicionarTaxa(req, res)
} )

router.get("/verificarSeTem/:idServer", (req, res) => {
    taxaController.verificarSeTemController(req, res)
} )
router.get("/pegarTaxa/:idServer", (req, res) => {
    taxaController.pegarMetaController(req, res)
} )


module.exports = router;