-- db.sql: cria e inializa o banco de dados

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- Garante que a comunicação entre o banco de dados e o backend se dará na
-- codificação correta. Não remova essa linha sob hipótese alguma!
SET CHARACTER SET utf8mb4;

-- Criação do banco de dados ---------------------------------------------------

CREATE SCHEMA IF NOT EXISTS digitovsky DEFAULT CHARACTER SET utf8mb4 ;

-- Tabela Professor ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS digitovsky.TB_Professor (
  nome VARCHAR(150) NOT NULL,
  PK_email VARCHAR(100) NOT NULL,
  senha VARCHAR(50) NOT NULL,
  PRIMARY KEY (PK_email))
ENGINE = InnoDB;

-- Tabela Avatar ---------------------------------------------------------------

CREATE TABLE IF NOT EXISTS digitovsky.TB_Avatar (
  PK_id INT NOT NULL AUTO_INCREMENT,
  nome VARCHAR(150) NOT NULL,
  avatar BLOB NOT NULL,
  PRIMARY KEY (PK_id))
ENGINE = InnoDB;

-- Tabela Relatório Indivual ---------------------------------------------------

CREATE TABLE IF NOT EXISTS digitovsky.TB_RelatorioIndividual (
  PK_id INT NOT NULL AUTO_INCREMENT,
  totalTempo INT NOT NULL,
  totalErros INT NOT NULL,
  mediaFraseSegundo DOUBLE NOT NULL,
  mediaErrosFrase DOUBLE NOT NULL,
  totalCaracteresDigitados INT NOT NULL,
  frasesPerfeitas INT NOT NULL,
  PRIMARY KEY (PK_id))
ENGINE = InnoDB;

-- Tabela Texto ----------------------------------------------------------------

CREATE TABLE IF NOT EXISTS digitovsky.TB_Textos (
  PK_id INT NOT NULL AUTO_INCREMENT,
  titulo VARCHAR(200) NOT NULL,
  texto TEXT NOT NULL,
  dificuldade ENUM('Fácil', 'Média', 'Difícil') NOT NULL,
  FK_Professor_email VARCHAR(100) NOT NULL,
  PRIMARY KEY (PK_id),
  INDEX fk_Texto_Professor_idx (FK_Professor_email ASC) VISIBLE,
  CONSTRAINT fk_Texto_Professor
    FOREIGN KEY (FK_Professor_email)
    REFERENCES TB_Professor (PK_email)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

-- Configurações finais --------------------------------------------------------

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
