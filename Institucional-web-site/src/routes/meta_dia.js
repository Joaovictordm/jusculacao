var express = require("express");
var router = express.Router();

var meta_dia = require("../controllers/diaController")

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js


router.get("/pegarMeta/:id", (req, res) => {
    meta_dia.verificarSeTemController(req, res)
} )
router.post("/criarMeta_dia", (req, res) => {
    meta_dia.criarMetaDiaController(req, res)
} )
router.put("/atualizar_meta_dia", (req, res) => {
    meta_dia.atualizarMetaDiaController(req, res)
} )
router.put("/tirar_caloria_dia", (req, res) => {
    meta_dia.tirarCaloriaController(req, res)
} )

module.exports = router;