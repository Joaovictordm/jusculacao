var database = require("../database/config");

function pegarComida(id){
    let instrucao = `SELECT nome, calorias_por_grama, id FROM comida WHERE fk_usuario = ${id}`;

    return database.executar(instrucao); 
}

function adicionarComida(nome, calorias, id_usuario){
    let instrucao = `INSERT INTO comida(nome, calorias_por_grama, fk_usuario) VALUES ("${nome}", ${calorias}, ${id_usuario})`;

    console.log("executando instrução de adicionar comida")
    return database.executar(instrucao);
}

function atualizarComida(nome, caloria, idComida, idUsuario){

    if (nome && caloria){
        let instrucao = `UPDATE comida SET nome = "${nome}", calorias_por_grama = ${caloria}, atualizado_em = NOW() WHERE id = ${idComida} AND fk_usuario = ${idUsuario}`;

        return database.executar(instrucao)
    } else if (nome){
        let instrucao = `UPDATE comida SET nome = "${nome}", atualizado_em = NOW() WHERE id = ${idComida} AND fk_usuario = ${idUsuario}`;

        return database.executar(instrucao);
    } else if (caloria){
        let instrucao = `UPDATE comida SET calorias_por_grama = ${caloria}, atualizado_em = NOW() WHERE id = ${idComida} AND fk_usuario = ${idUsuario}`;

        return database.executar(instrucao);
    }
}

function deletarComida(idComida, idUsuario){
    let instrucao = `DELETE FROM comida WHERE id = ${idComida} AND fk_usuario = ${idUsuario}`;

    return database.executar(instrucao);
}

module.exports = {
    pegarComida,
    adicionarComida,
    atualizarComida,
    deletarComida
};