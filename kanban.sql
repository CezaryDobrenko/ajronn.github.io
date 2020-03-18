-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Czas generowania: 16 Mar 2020, 22:00
-- Wersja serwera: 10.4.11-MariaDB
-- Wersja PHP: 7.4.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Baza danych: `kanban`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `kolumny`
--

CREATE TABLE `kolumny` (
  `id` int(11) NOT NULL,
  `title` varchar(255) COLLATE utf8_polish_ci NOT NULL,
  `id_col` varchar(20) COLLATE utf8_polish_ci NOT NULL,
  `max_notes` varchar(255) COLLATE utf8_polish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `notki`
--

CREATE TABLE `notki` (
  `id` int(11) NOT NULL,
  `id_col` varchar(255) COLLATE utf8_polish_ci NOT NULL,
  `title` varchar(255) COLLATE utf8_polish_ci NOT NULL,
  `content` varchar(255) COLLATE utf8_polish_ci NOT NULL,
  `owner` varchar(255) COLLATE utf8_polish_ci NOT NULL,
  `progress` varchar(255) COLLATE utf8_polish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `login` varchar(255) COLLATE utf8_polish_ci NOT NULL,
  `password` varchar(255) COLLATE utf8_polish_ci NOT NULL,
  `rola` varchar(255) COLLATE utf8_polish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Zrzut danych tabeli `user`
--

INSERT INTO `user` (`id`, `login`, `password`, `rola`) VALUES
(1, 'user1', 'zaq1@WSX', 'admin'),
(2, 'user2', 'zaq1@WSX', 'member'),
(3, 'user3', 'zaq1@WSX', 'member');

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `kolumny`
--
ALTER TABLE `kolumny`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `notki`
--
ALTER TABLE `notki`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT dla tabeli `kolumny`
--
ALTER TABLE `kolumny`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6359;

--
-- AUTO_INCREMENT dla tabeli `notki`
--
ALTER TABLE `notki`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6528;

--
-- AUTO_INCREMENT dla tabeli `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
