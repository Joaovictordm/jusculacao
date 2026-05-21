var express = require("express");
var router = express.Router();

var comidaMetaDiaController = require("../controllers/comidaMetaDiaController")

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js


router.get("/verQuantoFalta/:id", (req, res) => {
    comidaMetaDiaController.verQuantoFalta(req, res)
} )
router.post("/adicionarComidaMetaDia", (req, res) => {
    comidaMetaDiaController.adicionarComidaMetaDiaController(req, res)
} )
router.delete("/deletarComidaMetaDia", (req, res) => {
    comidaMetaDiaController.deletarComidaMetaDiaController(req, res)
} )

module.exports = router;