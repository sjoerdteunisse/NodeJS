DROP TABLE IF EXISTS `games` ;
CREATE TABLE IF NOT EXISTS `games` (
	`ID` INT UNSIGNED NOT NULL AUTO_INCREMENT,
	`title` VARCHAR(32) NOT NULL,
	`producer` VARCHAR(32) NOT NULL,
	`year` INT UNSIGNED NOT NULL,
	`Type` ENUM(
		'FIRST_PERSON_SHOOTER',
		'THIRD_PERSON_SHOOTER',
		'ADVENTURE','PUZZLE',
		'COMBAT',
		'UNKNOWN'
	) NOT NULL DEFAULT 'UNKNOWN',
	`lastupdated` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	PRIMARY KEY (`ID`)
) 
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `users`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `users` ;
CREATE TABLE IF NOT EXISTS `users` (
	`ID` INT UNSIGNED NOT NULL AUTO_INCREMENT,
	`firstname` VARCHAR(32) NOT NULL,
	`lastname` VARCHAR(64) NOT NULL,
	`email` VARCHAR(64) NOT NULL UNIQUE,
	`password` VARCHAR(128) NOT NULL,
	`lastupdated` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	PRIMARY KEY (`ID`)
) 
ENGINE = InnoDB;

