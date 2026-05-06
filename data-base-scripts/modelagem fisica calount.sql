DROP DATABASE IF EXISTS calount;
CREATE DATABASE calount;

USE calount;

CREATE TABLE usuario(
id INT AUTO_INCREMENT,
nome VARCHAR(40) NOT NULL,
email VARCHAR(40) NOT NULL UNIQUE,
senha VARCHAR(40) NOT NULL,
fk_taxa INT,
criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP(),
atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP(),


CONSTRAINT pk_usuario PRIMARY KEY(id),
CONSTRAINT fk_taxa FOREIGN KEY (fk_taxa) REFERENCES taxa_metabolica(id),
KEY ix_nome(nome)
);

CREATE TABLE taxa_metabolica(
id INT AUTO_INCREMENT,
peso DECIMAL(10,2) NOT NULL,
altura DECIMAL(10,2) NOT NULL,
idade INT NOT NULL,
sexo VARCHAR(10) NOT NULL,
atividade_fisica VARCHAR(30) NOT NULL,
objetivo VARCHAR(20) NOT NULL,
taxa_metabolica DECIMAL (10,2) NOT NULL,
criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP(),
atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP(),

CONSTRAINT chk_peso CHECK (peso < 500),
CONSTRAINT chk_altura CHECK (altura < 2.5 ),
CONSTRAINT chk_idade CHECK (idade > 5 AND idade < 100),
CONSTRAINT chk_sexo CHECK (sexo IN ("masculino", "feminino")),
CONSTRAINT chk_atividade CHECK (atividade_fisica IN ("sedentario", "levemente ativo", "moderadamente ativo", "muito ativo", "extremamente ativo" )),
CONSTRAINT chk_objetivo CHECK (objetivo IN ("emagrecer", "manter peso", "ganhar massa")),
CONSTRAINT pk_taxa PRIMARY KEY(id)
);

CREATE TABLE comida(
id INT AUTO_INCREMENT,
nome VARCHAR(45) NOT NULL,
calorias INT NOT NULL,
fk_usuario INT,
criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP(),
atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP(),


CONSTRAINT pk_comida PRIMARY KEY (id),
CONSTRAINT fk_usuario FOREIGN KEY (fk_usuario) REFERENCES usuario (id)
);