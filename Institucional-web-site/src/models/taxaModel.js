var database = require("../database/config");

function adicionarTaxa(id, peso, altura, idade, sexo, atividade_fisica, objetivo, taxa_metabolica){
    console.log(`Adicionando uma taxa_metabolica para o usuário`)

    var instrucaoSql = `
    INSERT INTO taxa_metabolica (id_usuario, peso, altura, idade, sexo, atividade_fisica, objetivo, taxa_metabolica) 
                                VALUES (${id}, ${peso}, ${altura}, ${idade}, "${sexo}", "${atividade_fisica}", "${objetivo}", ${taxa_metabolica})`

    return database.executar(instrucaoSql);
}

function verificarSeTem(id){
    let instrucao = `
    SELECT 
    CASE WHEN id_usuario IS NULL THEN false
	WHEN id_usuario IS NOT NULL THEN true
    END AS situacao 
    FROM usuario AS us
    LEFT JOIN taxa_metabolica AS tx ON tx.id_usuario = us.id
    WHERE  id = ${id};`;

    console.log(database.executar(instrucao));
    return database.executar(instrucao)
}

module.exports = {
    adicionarTaxa,
    verificarSeTem
};