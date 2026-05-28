var historicoModel = require("../models/historicoModel")

function historicoUsuarioController(req, res){
     let idUser = req.params.id;

    if (idUser == undefined){
        res.status(400).json(`Id do usuário undefined`)
        return console.log(`Id do usuario undefined`)
    }

    historicoModel.historicoUsuario(idUser).then((resposta) => {
        if (resposta.length > 0){
            res.status(200).json(resposta);
            console.log("resposta: ", resposta)
        }else {
            res.status(200).json("Não tem nada")
            console.log("Não tem nada")
        }
    }).catch((erro) => {
            console.log(erro)
            console.log(erro.sqlMessage)
            res.status(500).json("Deu ruim")
    })
}

function historicoSemanaUsuarioController(req, res){
    let idUser = req.params.id;

    if (idUser == undefined){
        res.status(400).json(`Id do usuário undefined`)
        return console.log(`Id do usuario undefined`)
    }

    historicoModel.historicoUsuario(idUser).then((resposta) => {
        if (resposta.length > 0){
            let ultimosSete = [];
            let contador = 0;
            let cont = 0;

            
            for (let i = resposta.length - 1; i >= 0; i--){
                contador += 1;
                for (let u = cont; u < resposta.length; u++){
                    cont += 1;
                    ultimosSete[u] = resposta[i]
                    break;
                }
                if (contador == 7){
                    break;
                }
            }

            if (ultimosSete.length < 7){
                res.status(200).json("Não tem 7 registros")
                console.log("não tem 7 registros")
                return false
            }

            res.status(200).json(ultimosSete)
            console.log("Historico de dias: ", ultimosSete)
            return;
        }else {
            res.status(200).json("Não tem nada")
            console.log("Não tem nada")
            return;
        }
    }).catch((erro) => {
            console.log(erro)
            console.log(erro.sqlMessage)
            res.status(500).json("Deu ruim")
    })

}
function historicoMesUsuarioController(req, res){
    let idUser = req.params.id;

    if (idUser == undefined){
        res.status(400).json(`Id do usuário undefined`)
        return console.log(`Id do usuario undefined`)
    }

    historicoModel.historicoUsuario(idUser).then((resposta) => {
        console.log( "resposta", resposta)
        if (resposta.length > 0){
            let ultimosTrinta = [];
            let contador = 0;
            let cont = 0;

            for (let i = resposta.length - 1; i >= 0; i--){
                contador += 1;
                for (let u = cont; u < resposta.length; u++){
                    cont += 1;
                    ultimosTrinta[u] = resposta[i]
                    break;
                }
                if (contador == 30){
                    break;
                }
            }

            if (ultimosTrinta.length < 30){
                res.status(200).json("Não tem 30 registros")
                console.log("não tem 30 registros")
                return false
            }

            res.status(200).json(ultimosTrinta)
            console.log("Historico de dias: ", ultimosTrinta)
            return;
        }else {
            res.status(200).json("Não tem nada")
            console.log("Não tem nada")
            return;
        }
    }).catch((erro) => {
            console.log(erro)
            console.log(erro.sqlMessage)
            res.status(500).json("Deu ruim")
    })

}

function historicoComidasHojeController(req, res){
    let id_user = req.params.id

    if (id_user == undefined){
        res.status(400).json("Id do usuario undefined")
        return console.log("id undefined")
    }

    historicoModel.historicoComidasHoje(id_user).then((resposta) => {
        if (resposta.length > 0){
            res.status(200).json(resposta)
        }else{
            res.status(204).json("Não teve resultado")
            console.log(resposta)
        }
    }).catch((erro) => {
        console.log(erro)
        console.log(erro.sqlMessage)
    })
}


module.exports = {
   historicoUsuarioController,
   historicoSemanaUsuarioController,
   historicoMesUsuarioController,
   historicoComidasHojeController
}