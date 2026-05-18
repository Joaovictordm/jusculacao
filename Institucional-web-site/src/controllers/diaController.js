var diaModel = require("../models/diaModel");

function criarMetaDiaController(req, res) {
    let idUser = req.body.idServer;

    if (idUser == undefined) {
        res.status(400).json("Id do usuario está undefined")
        return console.log("Id undefined")
    }


    diaModel.criarMetaDia(idUser).then((resposta) => {
        console.log("meta criada com sucesso");
        res.status(200).json("meta criada")
    }).catch((erro) => {
        console.log(erro);
        console.log(erro.sqlMessage)
        res.status(500).json(erro.sqlMessage);
    })

}

function atualizarMetaDiaController(req, res){
    let id_user = req.body.idUserServer;
    let id_meta = req.body.idMetaServer;
    let contagem = req.body.contagemServer;

    if (id_user == undefined){
        res.status(400).json("Id do usuario está undefined")
        return console.log("Id undefined")
    }else if(id_meta == undefined){
        res.status(400).json("Id meta está undefined")
        return console.log("Id meta undefined")
    }else if(contagem == undefined){
        res.status(400).json("contagem está undefined")
        return console.log("contagem undefined")
    }

    diaModel.atualizarMetaDia(id_user, id_meta, contagem).then((resposta) => {
        console.log("meta atualizada com sucesso");
        res.status(200).json("meta atualizada")
    }).catch((erro) => {
        console.log(erro);
        console.log(erro.sqlMessage)
        res.status(500).json(erro.sqlMessage);
    })

}

function tirarCaloriaController(req, res){
    let id_user = req.body.idUserServer;
    let id_meta = req.body.idMetaServer;
    let contagem = req.body.contagemServer;

    if (id_user == undefined){
        res.status(400).json("Id do usuario está undefined")
        return console.log("Id undefined")
    }else if(id_meta == undefined){
        res.status(400).json("Id meta está undefined")
        return console.log("Id meta undefined")
    }else if(contagem == undefined){
        res.status(400).json("contagem está undefined")
        return console.log("contagem undefined")
    }

    diaModel.tirarCaloria(id_user, id_meta, contagem).then((resposta) => {
        console.log("meta atualizada com sucesso");
        res.status(200).json("meta atualizada")
    }).catch((erro) => {
        console.log(erro);
        console.log(erro.sqlMessage)
        res.status(500).json(erro.sqlMessage);
    })

}
module.exports = {
    criarMetaDiaController,
    atualizarMetaDiaController,
    tirarCaloriaController
}