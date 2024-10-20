-- Banco teste
SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

SET CHARACTER SET utf8mb4;
CREATE SCHEMA IF NOT EXISTS `digitovsky` DEFAULT CHARACTER SET utf8mb4 ;
USE `digitovsky`;

CREATE TABLE IF NOT EXISTS `digitovsky`.`TB_texto` (
  `PK_duduAntunesS2` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `titulo` TEXT NULL,
  `texto` TEXT NULL,
  PRIMARY KEY (`PK_duduAntunesS2`),
  UNIQUE INDEX `PK_duduAntunesS2_UNIQUE` (`PK_duduAntunesS2` ASC))
ENGINE = InnoDB;

INSERT INTO TB_texto (titulo, texto) VALUES ('Hobbit', 'Em um buraco no chão vivia um hobbit. Não um buraco sujo, úmido e desagradável, cheio de restos de minhocas e com um cheiro viscoso, nem um buraco seco, nu e arenoso, sem nada para se sentar ou comer: era um buraco de hobbit, e isso significa conforto');
INSERT INTO TB_texto (titulo, texto) VALUES ('O silmarillion','Havia Eru, o Único, que em Arda é chamado de Ilúvatar. Ele criou primeiro os Ainur, os Sagrados, gerados por seu pensamento, e eles lhe faziam companhia antes que tudo o mais fosse criado. E ele lhes falou, propondo-lhes temas musicais; e eles cantaram em sua presença, e ele se alegrou. Entretanto, durante muito tempo, eles cantaram cada um sozinho ou apenas alguns juntos, enquanto os outros escutavam, pois cada um compreendia apenas aquela parte da mente de Ilúvatar da qual havia brotado e evoluía devagar na compreensão de seus irmãos. Não obstante, de tanto escutar, chegaram a uma compreensão mais profunda, tornando-se mais consonantes e harmoniosos.' );

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
