var database = require("../database/config");

function adicionarComidaMetaDia(id_usuario, id_comida){
    let instrucao = `INSERT INTO comidas_meta_dia (fk_usuario, fk_meta_dia, fk_comida) VALUES(${id_usuario}, current_date(), ${id_comida})`

    return database.executar(instrucao);
}

function removerComidaMetaDia(id_usuario, id_comida, id_comida_meta_dia){
    let instrucao = `DELETE FROM comidas_meta_dia WHERE fk_usuario = ${id_usuario} AND fk_comida = ${id_comida} AND id_comidas_meta_dia = ${id_comida_meta_dia}`;

    return database.executar(instrucao);
}

function pegarQuantoFalta(idUsuario){
    let instrucao = `SELECT tm.taxa_metabolica AS taxa_usuario, md.id_meta AS data_meta, md.contagem_atual AS contagem_atual FROM usuario AS us
                    INNER JOIN taxa_metabolica AS tm ON us.id = tm.id_usuario
                    INNER JOIN meta_dia AS md ON us.id = md.id_usuario
                    WHERE us.id = ${idUsuario} AND md.id_meta = CURDATE()`;

    return database.executar(instrucao);
}


module.exports = {
    adicionarComidaMetaDia,
    removerComidaMetaDia,
    pegarQuantoFalta
};