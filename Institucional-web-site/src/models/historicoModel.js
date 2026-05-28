var database = require("../database/config");

function historicoUsuario(id){
    let instrucao = `SELECT id_usuario, DATE_FORMAT(dia, '%Y/%m/%d') AS dia, calorias_dia FROM vw_historico_calorias WHERE id_usuario = ${id}`;

    return database.executar(instrucao);
}

function historicoComidasHoje(id){
    let instrucao = `SELECT * FROM vw_historico_comidas WHERE id_usuario = ${id}`;

    return database.executar(instrucao)
}

module.exports = {
   historicoUsuario,
   historicoComidasHoje
};