var database = require("../database/config");

function pegarComida(id){
    let instrucao = `SELECT nome, calorias, id FROM comida WHERE fk_usuario = ${id};`;
    console.log("executando instrução de pegar comida");

    return database.executar(instrucao); 
}

function adicionarComida(nome, calorias, id_usuario){
    let instrucao = `INSERT INTO comida(nome, calorias, fk_usuario) VALUES ("${nome}", ${calorias}, ${id_usuario})`;

    console.log("executando instrução de adicionar comida")
    return database.executar(instrucao);
}

function atualizarComida(nome, caloria, idComida, idUsuario){

    if (nome && caloria){
        let instrucao = `UPDATE comida SET nome = "${nome}", calorias = ${caloria}, atualizado_em = NOW() WHERE id = ${idComida} AND fk_usuario = ${idUsuario}`;

        return database.executar(instrucao)
    } else if (nome){
        let instrucao = `UPDATE comida SET nome = "${nome}", atualizado_em = NOW() WHERE id = ${idComida} AND fk_usuario = ${idUsuario}`;

        return database.executar(instrucao);
    } else if (caloria){
        let instrucao = `UPDATE comida SET calorias = ${caloria}, atualizado_em = NOW() WHERE id = ${idComida} AND fk_usuario = ${idUsuario}`;

        return database.executar(instrucao);
    }
}

function deletarComida(idComida){
    let instrucao = `DELETE FROM comida WHERE id = ${idComida}`;

    return database.executar(instrucao);
}

module.exports = {
    pegarComida,
    adicionarComida,
    atualizarComida,
    deletarComida
};