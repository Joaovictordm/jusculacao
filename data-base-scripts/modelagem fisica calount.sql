DROP DATABASE IF EXISTS calount;
CREATE DATABASE calount;

USE calount;

DROP TABLE IF EXISTS usuario;
CREATE TABLE usuario(
id INT AUTO_INCREMENT,
nome VARCHAR(40) NOT NULL,
email VARCHAR(40) NOT NULL UNIQUE,
senha VARCHAR(40) NOT NULL,
criado_em DATETIME DEFAULT NOW(),
atualizado_em DATETIME DEFAULT NULL,

CONSTRAINT pk_usuario PRIMARY KEY(id)
);

SELECT * FROM usuario;

DROP TABLE IF EXISTS taxa_metabolica;
CREATE TABLE taxa_metabolica(
id_usuario INT,
peso DECIMAL(10,2) NOT NULL,
altura DECIMAL(10,2) NOT NULL,
idade INT NOT NULL,
sexo VARCHAR(10) NOT NULL,
atividade_fisica VARCHAR(30) NOT NULL,
objetivo VARCHAR(20) NOT NULL,
taxa_metabolica DECIMAL (10,2) NOT NULL,
criado_em DATETIME DEFAULT NOW(),
atualizado_em DATETIME DEFAULT NULL,

CONSTRAINT chk_peso CHECK (peso < 500),
CONSTRAINT chk_altura CHECK (altura < 250 && altura > 0 ),
CONSTRAINT chk_idade CHECK (idade > 5 AND idade < 100),
CONSTRAINT chk_sexo CHECK (sexo IN ("masculino", "feminino")),
CONSTRAINT chk_atividade CHECK (atividade_fisica IN ("1.2", "1.375", "1.55", "1.725")),
CONSTRAINT chk_objetivo CHECK (objetivo IN ("manter", "perder_peso", "ganhar_peso")),
CONSTRAINT pk_taxa PRIMARY KEY(id_usuario),
CONSTRAINT fk_usuario_taxa FOREIGN KEY (id_usuario) REFERENCES usuario(id)
);

DROP TABLE IF EXISTS comida;
CREATE TABLE comida(
id INT AUTO_INCREMENT,
nome VARCHAR(45) NOT NULL,
calorias_por_grama INT NOT NULL,
fk_usuario INT,
criado_em DATETIME DEFAULT NOW(),
atualizado_em DATETIME DEFAULT NULL,


CONSTRAINT pk_comida PRIMARY KEY (id),
CONSTRAINT fk_usuario_comida FOREIGN KEY (fk_usuario) REFERENCES usuario(id)
);

DROP TABLE IF EXISTS meta_dia;
CREATE TABLE meta_dia(
id_usuario INT,
id_meta DATE ,
contagem_atual INT NOT NULL,
created_at DATETIME DEFAULT NOW(),
updated_at DATETIME DEFAULT NULL,

CONSTRAINT pk_meta PRIMARY KEY (id_usuario, id_meta),
CONSTRAINT fk_usuario_meta FOREIGN KEY (id_usuario)REFERENCES usuario (id)
);


DROP TABLE IF EXISTS comidas_meta_dia;
CREATE TABLE comidas_meta_dia(
    id_comidas_meta_dia INT AUTO_INCREMENT,
    fk_usuario INT,
    fk_meta_dia DATE,
    fk_comida INT,
    peso_adicionado DECIMAL(10, 2),
    created_at DATETIME DEFAULT NOW(),
    updated_at DATETIME DEFAULT NULL,

    
    CONSTRAINT pk_comidas_meta_dia PRIMARY KEY (id_comidas_meta_dia, fk_comida, fk_meta_dia, fk_usuario),
    CONSTRAINT fk_meta_comida FOREIGN KEY (fk_usuario, fk_meta_dia) REFERENCES meta_dia(id_usuario, id_meta),
    CONSTRAINT fk_comida FOREIGN KEY (fk_comida) REFERENCES comida(id) ON DELETE CASCADE
);

SELECT * FROM meta_dia;
SELECT * FROM comidas_meta_dia;

/*View para mostrar o historico de comidas de hoje*/
CREATE OR REPLACE VIEW vw_historico_comidas
AS
SELECT us.id AS id_usuario, mt.id_meta AS dia, co.nome, co.id AS id_comida, cmd.id_comidas_meta_dia AS id_meta_comida, cmd.peso_adicionado AS peso FROM usuario AS us
JOIN meta_dia AS mt ON us.id = mt.id_usuario
JOIN comidas_meta_dia AS cmd ON cmd.fk_usuario = us.id AND cmd.fk_meta_dia = mt.id_meta
JOIN comida AS co ON  cmd.fk_comida = co.id
WHERE mt.id_meta = CURDATE();

/*View para mostrar as comidas adicionadas hoje*/
CREATE OR REPLACE VIEW vw_historico_grafico_dia_hojeD
AS
SELECT us.id AS id,us.nome AS nome_usuario, co.id AS id_comida ,co.nome AS nome_comida, co.calorias_por_grama AS calorias, mt.contagem_atual AS contagem_atual,cmd.peso_adicionado AS historico_de_calorias, mt.id_meta AS dia FROM usuario AS us 
INNER JOIN comida AS co ON us.id = co.fk_usuario
INNER JOIN meta_dia AS mt ON us.id = mt.id_usuario
INNER JOIN comidas_meta_dia AS cmd ON us.id = cmd.fk_usuario AND co.id = cmd.fk_comida AND cmd.fk_meta_dia = mt.id_meta 
WHERE mt.id_meta = CURDATE();


/*View para mostrar o historico de calorias*/
CREATE OR REPLACE VIEW vw_historico_calorias
AS
SELECT us.id AS id_usuario ,mt.id_meta AS dia, mt.contagem_atual AS calorias_dia  FROM usuario AS us 
INNER JOIN meta_dia AS mt ON us.id = mt.id_usuario
GROUP BY us.id, mt.id_meta, mt.contagem_atual;

