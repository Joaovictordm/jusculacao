var database = require("../database/config");

function verificarSeTemMeta(id_usuario){
    let instrucao = `SELECT id_usuario, id_meta FROM meta_dia WHERE id_usuario = ${id_usuario} AND id_meta = CURDATE()`;

    return database.executar(instrucao)
}

function criarMetaDia(id_usuario){
    let instrucao = `INSERT INTO meta_dia(id_usuario, id_meta, contagem_atual) VALUES (${id_usuario}, CURDATE(), 0)`;

    return database.executar(instrucao);
}

function atualizarMetaDia(id_usuario, id_meta, contagem){
    let instrucao = `UPDATE meta_dia SET contagem_atual = contagem_atual + ${contagem}, updated_at = NOW() WHERE id_usuario = ${id_usuario} AND id_meta = "${id_meta}"`;

    return database.executar(instrucao);
}

function tirarCaloria(id_usuario, id_meta, contagem){
    let instrucao = `UPDATE meta_dia SET contagem_atual = contagem_atual - ${contagem}, updated_at = NOW() WHERE id_usuario = ${id_usuario} AND id_meta = "${id_meta}"`;

    return database.executar(instrucao);
}

module.exports = {
    verificarSeTemMeta,
    criarMetaDia,
    atualizarMetaDia,
    tirarCaloria
};