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
atualizado_em DATETIME NOT NULL,

CONSTRAINT chk_peso CHECK (peso < 500),
CONSTRAINT chk_altura CHECK (altura < 2.5 ),
CONSTRAINT chk_idade CHECK (idade > 5 AND idade < 100),
CONSTRAINT chk_sexo CHECK (sexo IN ("masculino", "feminino")),
CONSTRAINT chk_atividade CHECK (atividade_fisica IN ("sedentario", "levemente ativo", "moderadamente ativo", "muito ativo", "extremamente ativo" )),
CONSTRAINT chk_objetivo CHECK (objetivo IN ("emagrecer", "manter peso", "ganhar massa")),
CONSTRAINT pk_taxa PRIMARY KEY(id_usuario),
CONSTRAINT fk_usuario_taxa FOREIGN KEY (id_usuario) REFERENCES usuario(id)
);

DROP TABLE IF EXISTS comida;
CREATE TABLE comida(
id INT AUTO_INCREMENT,
nome VARCHAR(45) NOT NULL,
calorias INT NOT NULL,
fk_usuario INT,
criado_em DATETIME DEFAULT CURRENT_TIMESTAMP(),
atualizado_em DATETIME  NOT NULL,


CONSTRAINT pk_comida PRIMARY KEY (id),
CONSTRAINT fk_usuario_comida FOREIGN KEY (fk_usuario) REFERENCES usuario(id)
);


DROP TABLE IF EXISTS meta_dia;
CREATE TABLE meta_dia(
id_usuario INT,
id_meta DATE UNIQUE,
contagem_atual INT NOT NULL,
created_at DATETIME DEFAULT CURRENT_TIMESTAMP(),
updated_at DATETIME NOT NULL,

CONSTRAINT pk_meta PRIMARY KEY (id_usuario, id_meta),
CONSTRAINT fk_usuario_meta FOREIGN KEY (id_usuario)REFERENCES usuario (id)
);

DROP TABLE IF EXISTS comidas_meta_dia;
CREATE TABLE comidas_meta_dia(
id_comidas_meta_dia INT AUTO_INCREMENT,
fk_meta_comida DATE,
fk_comida INT,
created_at DATETIME DEFAULT CURRENT_TIMESTAMP(),
updated_at DATETIME NOT NULL,

CONSTRAINT pk_comidas_meta_dia PRIMARY KEY (id_comidas_meta_dia, fk_comida, fk_meta_comida),
CONSTRAINT fk_meta_comida FOREIGN KEY (fk_meta_comida) REFERENCES meta_dia(id_meta),
CONSTRAINT fk_comida FOREIGN KEY (fk_comida) REFERENCES comida(id)
);

