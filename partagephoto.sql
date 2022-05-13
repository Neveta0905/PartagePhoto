-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema partage_photo
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema partage_photo
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `partage_photo` DEFAULT CHARACTER SET utf8 ;
USE `partage_photo` ;

-- -----------------------------------------------------
-- Table `partage_photo`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `partage_photo`.`users` (
  `iduser` INT NOT NULL AUTO_INCREMENT,
  `mail` VARCHAR(45) NOT NULL,
  `password` VARCHAR(200) NOT NULL,
  `biographie` MEDIUMTEXT NULL DEFAULT NULL,
  `nickname` VARCHAR(45) NOT NULL,
  `role` TINYINT(1) NULL DEFAULT '0' COMMENT '0 : basic\\n1 : admin',
  PRIMARY KEY (`iduser`),
  UNIQUE INDEX `idusers_UNIQUE` (`iduser` ASC) VISIBLE,
  UNIQUE INDEX `email_UNIQUE` (`mail` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 17
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `partage_photo`.`events`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `partage_photo`.`events` (
  `idevent` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `begin_date` DATE NOT NULL,
  `end_date` DATE NOT NULL,
  `country` VARCHAR(45) NOT NULL,
  `city` VARCHAR(45) NOT NULL,
  `creator` INT NOT NULL,
  PRIMARY KEY (`idevent`),
  UNIQUE INDEX `idevent_UNIQUE` (`idevent` ASC) VISIBLE,
  INDEX `fk_events_users1_idx` (`creator` ASC) VISIBLE,
  CONSTRAINT `fk_events_users1`
    FOREIGN KEY (`creator`)
    REFERENCES `partage_photo`.`users` (`iduser`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `partage_photo`.`multimedias`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `partage_photo`.`multimedias` (
  `idMultimedia` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `creation_date` DATE NULL DEFAULT NULL,
  `type` TINYINT NOT NULL COMMENT '0 : image\\n1 : video\\n',
  `idevent` INT NOT NULL,
  `creator` INT NOT NULL,
  `url` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idMultimedia`),
  UNIQUE INDEX `idMultimedias_UNIQUE` (`idMultimedia` ASC) VISIBLE,
  INDEX `fk_multimedias_events_idx` (`idevent` ASC) VISIBLE,
  INDEX `fk_multimedias_users1_idx` (`creator` ASC) VISIBLE,
  CONSTRAINT `fk_multimedias_events`
    FOREIGN KEY (`idevent`)
    REFERENCES `partage_photo`.`events` (`idevent`),
  CONSTRAINT `fk_multimedias_users1`
    FOREIGN KEY (`creator`)
    REFERENCES `partage_photo`.`users` (`iduser`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `partage_photo`.`events_subscribers`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `partage_photo`.`events_subscribers` (
  `events_id` INT NOT NULL,
  `users_id` INT NOT NULL,
  PRIMARY KEY (`events_id`, `users_id`),
  INDEX `fk_events_has_users_users1_idx` (`users_id` ASC) VISIBLE,
  INDEX `fk_events_has_users_events1_idx` (`events_id` ASC) VISIBLE,
  CONSTRAINT `fk_events_has_users_events1`
    FOREIGN KEY (`events_id`)
    REFERENCES `partage_photo`.`events` (`idevent`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_events_has_users_users1`
    FOREIGN KEY (`users_id`)
    REFERENCES `partage_photo`.`users` (`iduser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
