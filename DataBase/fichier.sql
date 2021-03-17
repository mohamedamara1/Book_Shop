-- MySQL Script generated by MySQL Workbench
-- Wed 17 Mar 2021 11:00:13 PM CET
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`Client`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Client` (
  `id_client` INT NOT NULL,
  `prenom_client` VARCHAR(45) NULL,
  `nom_client` VARCHAR(45) NULL,
  `email` VARCHAR(45) NULL,
  `ville` VARCHAR(45) NULL,
  `age` INT NULL,
  `date_naissance` DATE NULL,
  `code_postal` VARCHAR(45) NULL,
  `email` VARCHAR(45) NULL,
  PRIMARY KEY (`id_client`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`admin`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`admin` (
  `id_admin` INT NOT NULL,
  `nom_admin` VARCHAR(45) NULL,
  `prenom_admin` VARCHAR(45) NULL,
  `email` VARCHAR(45) NULL,
  PRIMARY KEY (`id_admin`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`compte`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`compte` (
  `login_id` VARCHAR(255) NOT NULL,
  `client_id` INT NOT NULL,
  `admin_id` INT NULL,
  `password` VARCHAR(32) NOT NULL,
  PRIMARY KEY (`login_id`),
  INDEX `fk_compte_1_idx` (`client_id` ASC, `admin_id` ASC) VISIBLE,
  CONSTRAINT `fk_compte_1`
    FOREIGN KEY (`client_id` , `admin_id`)
    REFERENCES `mydb`.`Client` (`id_client` , `id_client`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_compte_2`
    FOREIGN KEY ()
    REFERENCES `mydb`.`admin` ()
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table `mydb`.`Category`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Category` (
  `idCategory` INT NOT NULL,
  `category_name` VARCHAR(45) NULL,
  PRIMARY KEY (`idCategory`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`book`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`book` (
  `book_id` INT NOT NULL,
  `book_title` VARCHAR(45) NULL,
  `price` VARCHAR(45) NULL,
  `book_description` VARCHAR(45) NULL,
  `book_image` VARCHAR(45) NULL,
  `date_ajout` VARCHAR(45) NULL,
  `category_id` INT NULL,
  `book_writer` VARCHAR(45) NULL,
  PRIMARY KEY (`book_id`),
  INDEX `fk_book_1_idx` (`category_id` ASC) VISIBLE,
  CONSTRAINT `fk_book_1`
    FOREIGN KEY (`category_id`)
    REFERENCES `mydb`.`Category` (`idCategory`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Element_Panier`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Element_Panier` (
  `idElement_Panier` INT NOT NULL,
  `book_id` INT NULL,
  `quantity` INT NULL,
  PRIMARY KEY (`idElement_Panier`),
  INDEX `fk_Element_Panier_1_idx` (`book_id` ASC) VISIBLE,
  CONSTRAINT `fk_Element_Panier_1`
    FOREIGN KEY (`book_id`)
    REFERENCES `mydb`.`book` (`book_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Panier`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Panier` (
  `id_panier` INT NOT NULL,
  `client_id` INT NULL,
  `element_panier` INT NULL,
  PRIMARY KEY (`id_panier`),
  INDEX `fk_Panier_1_idx` (`client_id` ASC) VISIBLE,
  INDEX `fk_Panier_2_idx` (`element_panier` ASC) VISIBLE,
  CONSTRAINT `fk_Panier_1`
    FOREIGN KEY (`client_id`)
    REFERENCES `mydb`.`Client` (`id_client`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Panier_2`
    FOREIGN KEY (`element_panier`)
    REFERENCES `mydb`.`Element_Panier` (`idElement_Panier`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`commande`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`commande` (
  `id_comnd` INT NOT NULL,
  `date_com` VARCHAR(45) NULL,
  `est_delivrée` INT NULL,
  `panier` INT NULL,
  PRIMARY KEY (`id_comnd`),
  INDEX `fk_commande_1_idx` (`panier` ASC) VISIBLE,
  CONSTRAINT `fk_commande_1`
    FOREIGN KEY (`panier`)
    REFERENCES `mydb`.`Panier` (`id_panier`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Stock`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Stock` (
  `stock_id` INT NOT NULL,
  `book_id` INT NULL,
  `quantity` VARCHAR(45) NULL,
  PRIMARY KEY (`stock_id`),
  INDEX `fk_Stock_1_idx` (`book_id` ASC) VISIBLE,
  CONSTRAINT `fk_Stock_1`
    FOREIGN KEY (`book_id`)
    REFERENCES `mydb`.`book` (`book_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Paeiment`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Paeiment` (
  `idPaeiment` INT NOT NULL,
  `id_comnd` INT NULL,
  `type_paeiment` VARCHAR(45) NULL,
  `date_paiement` VARCHAR(45) NULL,
  `montant` VARCHAR(45) NULL,
  PRIMARY KEY (`idPaeiment`),
  INDEX `fk_Paeiment_1_idx` (`id_comnd` ASC) VISIBLE,
  CONSTRAINT `fk_Paeiment_1`
    FOREIGN KEY (`id_comnd`)
    REFERENCES `mydb`.`commande` (`id_comnd`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
