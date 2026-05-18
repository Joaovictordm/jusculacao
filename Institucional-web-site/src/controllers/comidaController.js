var comidaModel = require("../models/comidaModel")

function pegarComidaController (req, res){
    let idUser = req.params.id;

    if (idUser == undefined){
        res.status(400).json("Id do usuario está undefined")
        return console.log("Id undefined")
    }

    comidaModel.pegarComida(idUser).then((resposta) => {
        let listaComida = [];

        for (let i = 0; i < resposta.length; i++){
            listaComida[i] = resposta[i].nome;
        }
        res.status(200).json({listaComida, resposta})
    }).catch((erro) => {
        console.log(erro);
        console.log(erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    })
}

function adicionarComidaController(req, res){
    let idUsuario = req.body.idUsuarioServer;
    let caloria = req.body.caloriaServer;
    let nome = req.body.nomeServer

    if (idUsuario == undefined){
        res.status(400).json("Id do usuario está undefined")
        return console.log("Id undefined")
    }else if(caloria == undefined){
        res.status(400).json("calorias está undefined")
        return console.log("calorias undefined")
    }else if(nome == undefined){
        res.status(400).json("nome está undefined")
        return console.log("nome undefined")
    }

    comidaModel.adicionarComida(nome, caloria, idUsuario).then((resposta) => {
        res.status(200).json(resposta)
        console.log(resposta,"Comida adicionada")
    }).catch((erro) => {
        console.log(erro);
        console.log(erro.sqlMessage)
        res.status(500).json(erro.sqlMessage);
    })
}

function atualizarComidaController(req, res){
    let nome = req.body.nomeServer;
    let calorias = req.body.caloriaServer;
    let idComida = req.body.idComidaServer;
    let idUsuario = req.body.idUsuarioServer
    
    if (idComida == undefined){
        res.status(400).json("idCOmida está undefined")
        return console.log("IdComida undefined")
    }else if(idUsuario == undefined){
        res.status(400).json("idUsuario está undefined")
        return console.log("idUsuario undefined")
    }

    if (nome == undefined && calorias == undefined){
        res.status(400).json("nome e caloria está undefined")
        return console.log("nome e caloria undefined")
    }

    if (nome == undefined){
        nome = false;
    }else if(calorias == undefined){
        calorias = false;
    }
    
    comidaModel.atualizarComida(nome, calorias, idComida, idUsuario).then((resposta) => {
            res.status(200).json(resposta)
            console.log(resposta,"Comida atualizada")
        }).catch((erro) => {
            console.log(erro);
            console.log(erro.sqlMessage)
            res.status(500).json(erro.sqlMessage);
        })
}

function deletarComidaController(req, res){
    let idComida = req.body.idServer;

    if (idComida == undefined){
        res.status(400).json("idCOmida está undefined")
        return console.log("IdComida undefined")
    }

    comidaModel.deletarComida(idComida).then((resposta) => {
        res.status(200).json(resposta);
        console.log("COmida deletada com sucesso");
    }).catch((erro) => {
        console.log(erro);
        console.log(erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    })
}



module.exports = {
    pegarComidaController,
    adicionarComidaController,
    atualizarComidaController,
    deletarComidaController
}