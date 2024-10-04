CREATE DATABASE  IF NOT EXISTS `capstone_database` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `capstone_database`;
-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: localhost    Database: capstone_database
-- ------------------------------------------------------
-- Server version	8.0.39

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
-- Table structure for table `all_transactions`
--

DROP TABLE IF EXISTS `all_transactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `all_transactions` (
  `transaction_hash` varchar(126) NOT NULL,
  `address` varchar(126) NOT NULL,
  `date_added` datetime NOT NULL,
  `type` varchar(45) NOT NULL,
  PRIMARY KEY (`transaction_hash`),
  UNIQUE KEY `transaction_hash_UNIQUE` (`transaction_hash`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `emitter`
--

DROP TABLE IF EXISTS `emitter`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `emitter` (
  `emitter_address` varchar(126) NOT NULL,
  `project_name` varchar(126) NOT NULL,
  `credit_amount` int NOT NULL,
  `date_bought` datetime NOT NULL,
  `transaction_hash` varchar(126) NOT NULL,
  PRIMARY KEY (`transaction_hash`),
  UNIQUE KEY `transaction_hash_UNIQUE` (`transaction_hash`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `issuer`
--

DROP TABLE IF EXISTS `issuer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `issuer` (
  `issuer_address` varchar(126) NOT NULL,
  `project_name` varchar(126) NOT NULL,
  `credit_amount` int NOT NULL,
  `active_status` tinyint(1) NOT NULL,
  `date_issued` date NOT NULL,
  `country` varchar(126) NOT NULL, 
  `period_covered` varchar(126) NOT NULL,
  `verification_status` tinyint(1) NOT NULL,
  `timestamp` datetime NOT NULL,
  `prev_tx` varchar(200) DEFAULT NULL,
  `bought_by` varchar(200) DEFAULT NULL,
  `transaction_hash` varchar(200) NOT NULL,
  PRIMARY KEY (`transaction_hash`),
  UNIQUE KEY `transaction_hash_UNIQUE` (`transaction_hash`),
  UNIQUE KEY `project_name` (`project_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `verifier`
--

DROP TABLE IF EXISTS `verifier`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `verifier` (
  `verifier_address` varchar(126) NOT NULL,
  `project_name` varchar(126) NOT NULL,
  `verification_date` datetime NOT NULL,
  `transaction_updated` varchar(126) NOT NULL,
  `transaction_hash` varchar(126) NOT NULL,
  PRIMARY KEY (`transaction_hash`),
  UNIQUE KEY `transaction_hash_UNIQUE` (`transaction_hash`),
  UNIQUE KEY `transaction_updated_UNIQUE` (`transaction_updated`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-10-02 19:13:11
