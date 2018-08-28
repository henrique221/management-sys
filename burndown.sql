-- phpMyAdmin SQL Dump
-- version 4.8.2
-- https://www.phpmyadmin.net/
--
-- Host: db
-- Tempo de geração: 28/08/2018 às 16:38
-- Versão do servidor: 5.6.41
-- Versão do PHP: 7.2.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `burndown`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `progresso`
--

CREATE TABLE `progresso` (
  `id_progresso` int(11) NOT NULL PRIMARY KEY,
  `id_sprint` int(11) NOT NULL,
  `data` date DEFAULT NULL,
  `remaining_tasks` int(11) DEFAULT NULL,
  `bugs` int(11) DEFAULT NULL,
  `improvements` int(11) DEFAULT NULL,
  `extra_tasks` int(11) DEFAULT NULL,
  FOREIGN KEY (`id_sprint`) REFERENCES `sprint` (`id`));
  ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura para tabela `sprint`
--

CREATE TABLE `sprint` (
  `id` int(11) NOT NULL PRIMARY KEY,
  `nome` varchar(100) DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `days` int(11) DEFAULT NULL,
  `total_tasks` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
