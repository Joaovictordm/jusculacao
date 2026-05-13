create database if not exists sprint3;

use sprint3;

create table curso(
id               int not null auto_increment,
curso            varchar(20) not null,
periodo_inicio  date,
primary key(id),
unique key(curso));

insert into curso(curso, periodo_inicio)
values ('1CCOA', '2025-02-01'),
       ('1CCOB', '2025-02-01'),
       ('1ADSA', '2025-02-01'),
       ('1ADSB', '2025-02-01'),
       ('1SIS', '2025-02-01'),
       ('2ADSA', '2024-07-01'),
       ('2ADSB', '2024-07-01');

create table aluno(
id      int not null auto_increment,
ra      char(08) not null,
nome    varchar(100) not null,
fkcurso  int,
primary key (id),
unique key uk_ra(ra));


insert into aluno(ra, nome, fkcurso)
VALUES
('20251001', 'Ana Silva', 1),
('20251002', 'Pedro Souza', 2),
('20251003', 'Carla Oliveira', 3),
('20251004', 'Lucas Santos', 4),
('20251005', 'Mariana Costa', 5),
('20242001', 'Gabriel Pereira', 6),
('20242002', 'Beatriz Rodrigues', 7),
('20251006', 'Fernando Almeida', 1),
('20251007', 'Juliana Ferreira', 2),
('20251008', 'Ricardo Martins', 3),
('20242003', 'Amanda Lima', 4),
('20251009', 'Rafael Castro', 5),
('20242004', 'Isabela Gomes', 6),
('20242005', 'Thiago Nunes', 7),
('20251010', 'Letícia Barbosa', 1);

create table materia(
id     int not null auto_increment,
nome   varchar(50),
primary key(id));

insert into materia(nome)
values ('BD'),
       ('LP'),
       ('AS'),
       ('TI'),
       ('PI');

create table sprint(
id int not null auto_increment,
descricao   varchar(20) not null,
peso        decimal(7,1) not null,
primary key (id));

insert into sprint(descricao, peso)
values ('SP-1', 25),
       ('SP-2', 35),
       ('SP-3', 40);

create table avaliacao(
id int not null auto_increment,
descricao    varchar(20) not null,
primary key (id));

insert into avaliacao (descricao)
values ('AVALIAÇÃO CONTINUADA'),
       ('INTEGRADA'),
       ('PRATICA');
     
create table sprint_avaliacao(
fksprint   int not null ,      
fkavaliacao int not null,
peso        int not null,
primary key(fksprint, fkavaliacao));

insert into sprint_avaliacao(fksprint, fkavaliacao, peso)
select sp.id, av.id, case when locate('CONT', av.descricao) > 0 then 40
                          when locate('INTE', av.descricao) > 0 then 30
                          else 30 end peso
from sprint sp, avaliacao av;    

create table sprint_curso_materia(
fkcurso   int not null,
fksprint  int not null,
fkavaliacao int not null,
fkmateria  int not null,
primary key(fkcurso, fksprint, fkavaliacao, fkmateria));


insert into sprint_curso_materia(fkcurso, fksprint, fkavaliacao, fkmateria)
select cur.id, sa.fksprint, sa.fkavaliacao, ma.id
from curso cur, sprint_avaliacao sa, materia ma;

create table nota(
fkcurso   int not null,
fksprint  int not null,
fkavaliacao int not null,
fkmateria  int not null,
fkaluno    int not null,
nota       decimal(7,1),
primary key (fkcurso, fksprint, fkavaliacao, fkmateria, fkaluno));

alter table aluno add constraint fk_aluno_curso foreign key(fkcurso) references curso(id);

alter table sprint_avaliacao add constraint fk_spav_sprint foreign key(fksprint) references sprint(id),
                             add  constraint fk_spav_avaliacao foreign key(fkavaliacao) references avaliacao(id);

alter table sprint_curso_materia add constraint fk_spcm_curso foreign key(fkcurso) references curso(id),
                             add  constraint fk_spcm_spav foreign key(fksprint, fkavaliacao) references sprint_avaliacao(fksprint, fkavaliacao),
                             add  constraint fk_spcm_materi foreign key(fkmateria) references materia(id);

alter table nota add constraint fk_nota_spcm foreign key(fkcurso, fksprint, fkavaliacao, fkmateria) references sprint_curso_materia(fkcurso, fksprint, fkavaliacao, fkmateria),
                             add  constraint fk_spcm_aluno foreign key(fkaluno) references aluno(id);

insert into nota(fkcurso, fksprint, fkavaliacao, fkmateria, fkaluno, nota)
select sc.fkcurso, fksprint, fkavaliacao, fkmateria, al.id fkaluno, 
       case when fksprint+fkavaliacao+fkmateria > 10 then 10 
            else fksprint+fkavaliacao+fkmateria end nota
from sprint_curso_materia sc
inner join aluno al on al.fkcurso = sc.fkcurso;

 
CREATE VIEW vw_notas 
AS 
SELECT al.nome AS aluno, 
	ma.nome AS diciplina, 
	ta.nota, 
	spr.descricao AS sprint, 
	ava.descricao AS avaliacao, 
	ava.id AS id_avaliacao, 
	spr.id AS id_sprint, 
	al.id AS aluno_id, 
	ma.id AS id_diciplina
FROM curso AS cur
INNER JOIN aluno AS al ON al.fkcurso = cur.id
INNER JOIN nota AS ta ON ta.fkaluno = al.id
INNER JOIN materia AS ma ON ta.fkmateria = ma.id
INNER JOIN avaliacao AS ava ON ta.fkavaliacao = ava.id
INNER JOIN sprint AS spr ON ta.fksprint = spr.id;

DROP VIEW vw_notas;

SELECT * FROM vw_notas;


/*1) Listar alunos, disciplinas e notas de cada sprint e avaliação*/
SELECT aluno, diciplina, nota, sprint, avaliacao 
FROM vw_notas;
/*2) Listar nome com a média de suas notas na avaliação 1, 2 e 3*/
/*SELECT aluno, ROUND(AVG(nota), 2) AS media, avaliacao, sprint
FROM vw_notas
GROUP BY aluno, avaliacao, sprint
ORDER BY aluno;*/
SELECT aluno, ROUND(AVG(nota), 2) AS media
FROM vw_notas
GROUP BY aluno;
/*3) Listar alunos com maiores notas em cada sprint, matéria e avaliação*/

/*4) Listar a média de notas em cada turma, por sprint, matéria considerando somente a 
nota final*/
/*5) Listar alunos que não tenham feito alguma avaliação*/