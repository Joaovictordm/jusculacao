var express = require("express");
var router = express.Router();

var historicoController = require("../controllers/historicoController")

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js


router.get("/pegarHistorico/:id", (req, res) => {
    historicoController.historicoUsuarioController(req, res)
} )
router.get("/pegarHistoricoSemana/:id", (req, res) => {
    historicoController.historicoSemanaUsuarioController(req, res)
} )
router.get("/pegarHistoricoMes/:id", (req, res) => {
    historicoController.historicoMesUsuarioController(req, res)
} )
router.get("/pegarHistoricoComidaHoje/:id", (req, res) => {
    historicoController.historicoComidasHojeController(req, res)
} )


module.exports = router;