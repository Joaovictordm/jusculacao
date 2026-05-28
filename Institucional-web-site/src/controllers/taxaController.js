var taxaModel = require("../models/taxaModel")

function adicionarTaxa(req, res){ 
    let id = req.body.idServer;
    var peso = req.body.pesoServer;
    var altura = req.body.alturaServer;
    var idade = req.body.idadeServer;
    var sexo = req.body.sexoServer;
    var atividade_fisica = req.body.atividadeServer;
    var objetivo = req.body.objetivoServer;

    if (id == undefined){
        return console.log("Id undefined")
    }else if (peso == undefined){
        return console.log("peso undefined")
    }else if (altura == undefined){
        return console.log("altura undefined")
    }else if (idade == undefined){
        return console.log("idade undefined")
    }else if (sexo == undefined){
        return console.log("sexo undefined")
    }else if (atividade_fisica == undefined){
        return console.log("atividade_fisica undefined")
    }else if(objetivo == undefined){
        return console.log("objetivo undefined")
    }

    if (sexo == "feminino"){
        var taxa = ((10 * peso) + (6.25 * altura) - (5 * idade) - 161 ) * atividade_fisica;
    }else if (sexo == "masculino"){
        var taxa = ((10 * peso) + (6.25 * altura) - (5 * idade) + 5) * atividade_fisica;
    }

// Para homens: 

// TMB=10W + 6.25H − 5A + 5 

// Para mulheres: 

// TMB=10W + 6.25H − 5A − 161 

    

    //https://www.healthline.com/nutrition/calorie-deficit?utm_source=chatgpt.com#faq
    //De acordo com o site acima, fazer um deficit calorico de 300 a 500 calorias é o ideal. Aqui iremos usar o meio termo, 400 calorias a menos para o deficit calorico
    //https://blognutricaointeligente.com.br/deficit-calorico-como-calcular/?utm_source=chatgpt.com
    //o site acima monta uma tablea para o deficit calorico. nela vamos usar um valor de 300 a 500.


    //https://portaldascontas.com.br/artigos/saude/superavit-calorico?utm_source=chatgpt.com
    //O artigo acima cita para um superavit saúdavel, cerca de 200 a 400 calorias a mais para o ganho muscular.
    //Para nossa calculadora, vamos usar cerca de 250 calorias a mais 
    if (objetivo == "perder_peso"){
        taxa = taxa - 400
    }else if (objetivo == "ganhar_peso"){
        taxa = taxa + 250
    }
        taxaModel.adicionarTaxa(id, peso, altura, idade, sexo, atividade_fisica, objetivo, taxa).then((resultado) => {
        console.log("taxa cadastrada")
        res.json(resultado)
    }).catch((erro) => {
        console.log(erro);
        console.log(erro.sqlMessage)
        res.status(500).json(erro.sqlMessage);
    })
      
}

function verificarSeTemController(req, res){
    let id = req.params.idServer;
   
    if (id == undefined){
        return console.log("Id undefined")
    }

    taxaModel.verificarSeTem(id).then((resultado) => {
        console.log(resultado)
        let resposta = resultado;

        res.status(200).json(resposta[0].situacao)
    }).catch((erro) => {
        console.log(erro.sqlMessage);
        res.status(500).json(erro.sqlMessage)
    })
}

function pegarMetaController(req, res){
    let id = req.params.idServer;
    // if (id == undefined){
    //      res.status(400).json("Id está undefined")
    //     return console.log("Id undefined")
    // }

    taxaModel.pegarMeta(id).then((resultado) => {
        res.status(200).json(resultado[0].taxa_metabolica)
        console.log("deu certo")
    }).catch((erro) => {
        res.status(400).json("deu erro")
        console.log(erro);
        console.log(erro.sqlMessage)
        res.status(500).json(erro.sqlMessage);
    })
}

module.exports = {
    adicionarTaxa,
    verificarSeTemController,
    pegarMetaController
}