var express = require("express");
var router = express.Router();

var taxaController = require("../controllers/taxaController")

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js

router.post("/adicionar", (req, res) => {
    taxaController.adicionarTaxa(req, res)
} )

router.post("/verificarSeTem", (req, res) => {
    taxaController.verificarSeTemController(req, res)
} )


module.exports = router;