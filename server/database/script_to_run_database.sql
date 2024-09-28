CREATE DATABASE  IF NOT EXISTS `capstone_database` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `capstone_database`;
-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: localhost    Database: capstone_database
-- ------------------------------------------------------
-- Server version8.0.39

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table strPRIMARYucture for table `emitter`
--

DROP TABLE IF EXISTS `emitter`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE IF NOT EXISTS `emitter` (
  `emitter_address` varchar(200) NOT NULL,
  `project_name` varchar(200) NOT NULL,
  `credit_amount` int NOT NULL,
  `date_bought` date NOT NULL,
  `verification_status` tinyint(1) NOT NULL,
  `prev_tx` varchar(200),
  `transaction_hash` varchar(200) NOT NULL,
  PRIMARY KEY (`transaction_hash`),
  UNIQUE KEY `transaction_hash_UNIQUE` (`transaction_hash`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `emitter`
--

LOCK TABLES `emitter` WRITE;
/*!40000 ALTER TABLE `emitter` DISABLE KEYS */;
/*!40000 ALTER TABLE `emitter` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `issuer`
--

DROP TABLE IF EXISTS `issuer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE IF NOT EXISTS `issuer` (
  `issuer_address` varchar(200) NOT NULL,
  `project_name` varchar(200) NOT NULL,
  `credit_amount` int NOT NULL,
  `active_status` tinyint(1) NOT NULL,
  `date_issued` date NOT NULL,
  `period_covered` varchar(200) NOT NULL,
  `verification_status` tinyint(1) NOT NULL,
  `prev_tx` varchar(200),
  `transaction_hash` varchar(200) NOT NULL,
  PRIMARY KEY (`transaction_hash`),
  UNIQUE KEY `transaction_hash_UNIQUE` (`transaction_hash`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `issuer`
--

LOCK TABLES `issuer` WRITE;
/*!40000 ALTER TABLE `issuer` DISABLE KEYS */;
/*!40000 ALTER TABLE `issuer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `verifier`
--

DROP TABLE IF EXISTS `verifier`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE IF NOT EXISTS `verifier` (
  `verifier_address` varchar(200) NOT NULL,
  `project_name` varchar(200) NOT NULL,
  `verification_date` varchar(200) NOT NULL,
  `transaction_updated` varchar(200) NOT NULL,
  `transaction_hash` varchar(200) NOT NULL,
  PRIMARY KEY (`transaction_hash`),
  UNIQUE KEY `transaction_hash_UNIQUE` (`transaction_hash`),
  UNIQUE KEY `transaction_updated_UNIQUE` (`transaction_updated`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `verifier`

-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: localhost    Database: capstone_database
-- ------------------------------------------------------
-- Server version8.0.39

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `issuer`
--

DROP TABLE IF EXISTS `issuer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `issuer` (
  `issuer_address` varchar(200) NOT NULL,
  `project_name` varchar(200) NOT NULL,
  `credit_amount` int NOT NULL,
  `active_status` tinyint(1) NOT NULL,
  `date_issued` date NOT NULL,
  `period_covered` varchar(200) NOT NULL,
  `verification_status` tinyint(1) NOT NULL,
  `prev_tx` varchar(200) DEFAULT NULL,
  `transaction_hash` varchar(200) NOT NULL,
  PRIMARY KEY (`transaction_hash`),
  UNIQUE KEY `transaction_hash_UNIQUE` (`transaction_hash`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `issuer`
--

LOCK TABLES `issuer` WRITE;
/*!40000 ALTER TABLE `issuer` DISABLE KEYS */;
INSERT INTO `issuer` VALUES ('0xf8e848edc950d1455481e7d82a80098f35d2dce6','Nagasaki Green',110,1,'2022-01-25','11/2/2024 - 11/30/2024',0,'','0x3f1c169a2f7fa624f2049031a9d5dc8996992f8df319894119e5d71a538cf4a2'),('0xf8e848edc950d1455481e7d82a80098f35d2dce6','The Solar Initiative',210,0,'2022-10-20','9/1/2024 - 10/5/2024',1,'0xa9b5b21fb26f77d0901afcd4a11791fb9a3ba687a32d1f9fe343d500dcecb013','0x4f8ae382476fa9ddf8a6cd74deebaff7359f175c28c6f7a3cfb4933b201e91ce'),('0xf8e848edc950d1455481e7d82a80098f35d2dce6','The Amazon Project',350,0,'2023-02-22','11/2/2024 - 11/30/2024',0,'','0x62c8b004ee22a2a57143bd89ea91fc11bd51c1c64bec53eaf798a09d0b5063b0'),('0xf8e848edc950d1455481e7d82a80098f35d2dce6','Agile Forestation',220,0,'2024-02-02','11/2/2024 - 11/30/2024',0,'','0xb2e23574009bc58b6227cdbf499db60c72a68bb0c59f6497e78e47ce2e2adcce'),('0xf8e848edc950d1455481e7d82a80098f35d2dce6','Greenland Forest',310,0,'2021-01-25','11/2/2024 - 11/30/2024',0,'','0xf4c339e640bcf8117de96a709365899e19aa003416862c6c39ffbf72897dfa71');
/*!40000 ALTER TABLE `issuer` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-09-21 22:26:08

-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: localhost    Database: capstone_database
-- ------------------------------------------------------
-- Server version8.0.39

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `verifier`
--

DROP TABLE IF EXISTS `verifier`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `verifier` (
  `verifier_address` varchar(200) NOT NULL,
  `project_name` varchar(200) NOT NULL,
  `verification_date` varchar(200) NOT NULL,
  `transaction_updated` varchar(200) NOT NULL,
  `transaction_hash` varchar(200) NOT NULL,
  PRIMARY KEY (`transaction_hash`),
  UNIQUE KEY `transaction_hash_UNIQUE` (`transaction_hash`),
  UNIQUE KEY `transaction_updated_UNIQUE` (`transaction_updated`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `verifier`
--

LOCK TABLES `verifier` WRITE;
/*!40000 ALTER TABLE `verifier` DISABLE KEYS */;
INSERT INTO `verifier` VALUES ('0xed1626e677ad1ad8da0cb707cd4a32a604ab0862','The Solar Initiative','20/09/2024','0xa9b5b21fb26f77d0901afcd4a11791fb9a3ba687a32d1f9fe343d500dcecb013','0x443e51fd6a9463890a745b17c7e74bf00d37ab0a6502278e613081e6335988b2');
/*!40000 ALTER TABLE `verifier` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-09-21 22:26:08

INSERT INTO emitter VALUES ('0x21b4b54911cfa548c153daa6605161cbaa1eb878','Google',100,'2021-12-02',0,'','0x1014b4a72f3a5048cdd375eab6e645ddefc2c47041b3da8f3886e37f0c124241'),('0x21b4b54911cfa548c153daa6605161cbaa1eb878','Oracle',325,'2020-03-02',0,'','0x6bf199ed6be8cdbfba8dfdf0ec5098dfde85b51cc2debaf351c208ea224c1be6'),('0x21b4b54911cfa548c153daa6605161cbaa1eb878','Amazon',125,'2024-10-20',0,'','0x8ddf048e1d09f41676662dfb50eec1eef1f16d6f71a19d80264d1113e250a8dc'),('0x21b4b54911cfa548c153daa6605161cbaa1eb878','Accenture',150,'2022-01-01',0,'','0xcf69c76ba65edeab56668f886fd5eb40c909f6bd2e0d4b9c8081f6c93a138817'),('0x21b4b54911cfa548c153daa6605161cbaa1eb878','Microsoft',300,'2023-02-25',0,'','0xf615d36be31c1ac1ae8e2f572b8149a47942490589687c19e666532a725e6857');