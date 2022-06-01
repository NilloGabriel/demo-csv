DROP DATABASE IF EXISTS democsv;
CREATE DATABASE IF NOT EXISTS democsv;
USE democsv;

DROP TABLE IF EXISTS uf;
CREATE TABLE IF NOT EXISTS uf (
  id INT NOT NULL AUTO_INCREMENT,
  sigla VARCHAR(2),
  nome_uf VARCHAR(50),
  PRIMARY KEY(id)
);

DROP TABLE IF EXISTS cidade;
CREATE TABLE IF NOT EXISTS cidade (
  id INT NOT NULL AUTO_INCREMENT,
  nome VARCHAR(255),
  populacao INT,
  latitude VARCHAR(255),
  longitude VARCHAR(255),
  cod_ibge VARCHAR(255),
  cod_siafi VARCHAR(255),
  uf_id INT,
  PRIMARY KEY (id),
  CONSTRAINT fk_cidade_uf1
    FOREIGN KEY (uf_id)
    REFERENCES uf (id)
);

DROP TABLE IF EXISTS empresa;
CREATE TABLE IF NOT EXISTS empresa (
  id INT NOT NULL AUTO_INCREMENT,
  slug VARCHAR(255),
  nome_fantasia VARCHAR(255),
  dt_inicio_atividade DATE,
  cnae_fiscal VARCHAR(255),
  cep VARCHAR(255),
  porte INT,
  cidade_id INT,
  PRIMARY KEY (id),
  CONSTRAINT fk_empresa_cidade
    FOREIGN KEY (cidade_id)
    REFERENCES cidade (id)
);
