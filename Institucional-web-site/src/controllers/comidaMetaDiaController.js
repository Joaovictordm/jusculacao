var comidaMetaDiaModel = require("../models/comidaMetaDiaModel")

function adicionarComidaMetaDiaController(req, res){
    let idUser = req.body.idUserServer;
    let idComida = req.body.idComidaServer;
    let pesoAdicionado = req.body.pesoServer;
    
    if (idUser == undefined){
        res.status(400).json(`Id do usuário undefined`)
        return console.log(`Id do usuario undefined`)
    }else if (idComida == undefined){
        res.status(400).json(`Id da comida undefined`)
        return console.log(`Id da comida undefined`)
    }


    comidaMetaDiaModel.adicionarComidaMetaDia(idUser, idComida, pesoAdicionado).then((resposta) => {
        res.status(200).json(resposta);
        console.log("comida adicionada em uma meta");
    }).catch((erro) => {
        console.log(erro);
        console.log(erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    })
}

function deletarComidaMetaDiaController(req, res){
    let idUser = req.body.idUserServer;
    let idComida = req.body.idComidaServer;
    let idComidaMetaDia = req.body.idComidaMetaDiaServer;
   
    if (idUser == undefined){
        res.status(400).json(`Id do usuário undefined`)
        return console.log(`Id do usuario undefined`)
    }else if (idComida == undefined){
        res.status(400).json(`Id da comida undefined`)
        return console.log(`Id da comida undefined`)
    }else if (idComidaMetaDia == undefined){
        res.status(400).json(`Id comida meta dia undefined`)
        return console.log(`Id da comida meta dia undefined`)
    }

    

    comidaMetaDiaModel.removerComidaMetaDia(idUser, idComida, idComidaMetaDia).then((resposta) => {
        res.status(200).json(resposta);
        console.log("comida removida da meta do dia");
    }).catch((erro) => {
        console.log(erro);
        console.log(erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    })
}

function verQuantoFalta(req, res){
    let id = req.params.id;

    if (id == undefined){
        res.status(400).json(`Id do usuário undefined`)
        return console.log(`Id do usuario undefined`)
    }

    comidaMetaDiaModel.pegarQuantoFalta(id).then((resposta) => {
        if (resposta.length > 0){
            let total = resposta[0].taxa_usuario;
            let contagem = resposta[0].contagem_atual;
            let faltam = total - contagem;

            res.status(200).json(faltam);
            console.log("Deu certo", faltam);
        }else {
            res.status(200).json("Não tem");
            console.log("Não tem");
        }
    }).catch((erro) => {
        console.log(erro);
        console.log(erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    })
}






module.exports = {
    adicionarComidaMetaDiaController,
    verQuantoFalta,
    deletarComidaMetaDiaController
}