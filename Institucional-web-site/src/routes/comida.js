var express = require("express");
var router = express.Router();

var comidaController = require("../controllers/comidaController")

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js


router.get("/pegarComida/:id", (req, res) => {
    comidaController.pegarComidaController(req, res)
} )
router.post("/adicionarComida", (req, res) => {
    comidaController.adicionarComidaController(req, res)
} )
router.put("/atualizarComida", (req, res) => {
    comidaController.atualizarComidaController(req, res)
} )
router.delete("/deletarComida", (req, res) => {
    comidaController.deletarComidaController(req, res)
} )


module.exports = router;