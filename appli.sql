-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le :  jeu. 25 oct. 2018 à 13:50
-- Version du serveur :  5.7.19
-- Version de PHP :  7.1.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `appli`
--

-- --------------------------------------------------------

--
-- Structure de la table `bureauprets`
--

DROP TABLE IF EXISTS `bureauprets`;
CREATE TABLE IF NOT EXISTS `bureauprets` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` tinytext NOT NULL,
  `agent_id` int(11) DEFAULT NULL,
  `created_at` date DEFAULT NULL,
  `updated_at` date DEFAULT NULL,
  `deleted_at` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `agentId` (`agent_id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `bureauprets`
--

INSERT INTO `bureauprets` (`id`, `nom`, `agent_id`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'IFI', 3, NULL, NULL, NULL),
(10, 'IUT', 3, NULL, NULL, NULL),
(12, 'Copernic', 3, NULL, NULL, NULL),
(13, 'Centrif', 3, NULL, NULL, NULL),
(14, 'Bois de l\'Etang', 3, NULL, NULL, NULL),
(15, 'ESIPE', 3, NULL, NULL, NULL),
(16, 'Test', 3, NULL, '2018-08-16', '2018-08-16'),
(17, 'Bureau secret qui bug', 3, '2018-06-25', '2018-08-21', NULL),
(18, 'Bureau test', NULL, '2018-08-17', '2018-08-17', '2018-08-17'),
(19, 'Bureau nouveau', NULL, '2018-08-17', '2018-08-20', '2018-08-20'),
(20, 'Bureau très très secret', NULL, '2018-08-17', '2018-08-21', NULL),
(21, 'Bureau inutile', NULL, '2018-08-21', '2018-08-21', '2018-08-21'),
(22, 'La Chambre de Bruce Willis', NULL, '2018-08-21', '2018-08-21', NULL),
(23, 'IMAC', NULL, '2018-08-22', '2018-08-22', '2018-08-22'),
(24, 'IMAC', NULL, '2018-08-22', '2018-08-22', NULL),
(25, '803ZZZ', NULL, '2018-08-22', '2018-08-22', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `conventions`
--

DROP TABLE IF EXISTS `conventions`;
CREATE TABLE IF NOT EXISTS `conventions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `num_eng` text NOT NULL,
  `nom_projet` text NOT NULL,
  `membres_equipe` text,
  `created_at` date NOT NULL,
  `date_debut` date NOT NULL,
  `date_fin` date NOT NULL,
  `date_remise` date DEFAULT NULL,
  `emprunteur_nom` tinytext NOT NULL,
  `emprunteur_prenom` tinytext NOT NULL,
  `emprunteur_adr` text NOT NULL,
  `emprunteur_ville` text NOT NULL,
  `emprunteur_postal` tinytext NOT NULL,
  `emprunteur_mail` tinytext NOT NULL,
  `emprunteur_tel` tinytext NOT NULL,
  `emprunteur_formation` text NOT NULL,
  `emprunteur_carte_num` tinytext NOT NULL,
  `assurance_nom` tinytext NOT NULL,
  `assurance_num` text NOT NULL,
  `enseignant_nom` tinytext,
  `enseignant_mail` tinytext,
  `assurance_url` text,
  `carte_etud_url` text,
  `etat_id` int(11) NOT NULL,
  `bureaupret_id` int(11) NOT NULL,
  `updated_at` date DEFAULT NULL,
  `deleted_at` date DEFAULT NULL,
  `token_convention` text NOT NULL,
  PRIMARY KEY (`id`),
  KEY `etatId` (`etat_id`),
  KEY `bureauPretId` (`bureaupret_id`)
) ENGINE=InnoDB AUTO_INCREMENT=81 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `conventions`
--

INSERT INTO `conventions` (`id`, `num_eng`, `nom_projet`, `membres_equipe`, `created_at`, `date_debut`, `date_fin`, `date_remise`, `emprunteur_nom`, `emprunteur_prenom`, `emprunteur_adr`, `emprunteur_ville`, `emprunteur_postal`, `emprunteur_mail`, `emprunteur_tel`, `emprunteur_formation`, `emprunteur_carte_num`, `assurance_nom`, `assurance_num`, `enseignant_nom`, `enseignant_mail`, `assurance_url`, `carte_etud_url`, `etat_id`, `bureaupret_id`, `updated_at`, `deleted_at`, `token_convention`) VALUES
(55, '2018-CN0001', 'Killjoys', 'Hannah John-Kamen', '2018-08-21', '2018-08-22', '2018-08-26', NULL, 'Granger', 'Hermione', '12 rue Scarbacks', 'Westeros', '99000', 'hgranger@etud.u-pem.fr', '0689097821', 'Killjoy', '670989', 'Quadd', '234', 'John Jaqobis', 'john.jaqobis@u-pem.fr', 'doc/RQDfKH4Oi7HY3EcAAAEVOarXSQjxpUTMPqT1e0zC.jpeg', 'doc/8ffT2g7XztTnhSxeSxgrB8eAHiiHL55h7wOw27yd.jpeg', 2, 1, '2018-08-27', NULL, '58418625ed746e381b150acabd471e71125f4401897a82db2a9a0fc615a3f537'),
(56, '2018-CN0002', 'Borderlands', 'Axton, Salvador, Maya, Zer0', '2018-08-21', '2018-09-05', '2018-09-21', NULL, 'Granger', 'Hermione', '87 rue Psycho', 'Sanctuary', '44890', 'hgranger@etud.u-pem.fr', '0678987653', 'Chasseur de l\'Arche', '435678', 'New-UUU', '56789', 'Handsome Jack', 'handsome.jack@u-pem.fr', 'doc/qiWHh0foFRyyqKKPxjOpPOSD7hmSkNDSvTSppJoU.pdf', 'public/doc/jMY5qBM85wekK38GCMQl6KniebEZ2BmIXxbgYY4k.jpeg', 6, 1, '2018-08-21', NULL, ''),
(57, '2018-CN0003', 'D:BH', 'Connor, Markus, Kara', '2018-08-21', '2018-08-22', '2018-08-24', NULL, 'Granger', 'Hermione', '54 rue de la Libération', 'Détroit', '98345', 'hgranger@etud.u-pem.fr', '0789487315', 'Androïd', '435691', 'Cyberlife', '546', 'David Cage', 'david.cage@u-pem.fr', NULL, 'doc/oso5rsuwKG7XbYFjuNZnBPBPTjSPrRMD7hNJZXrp.png', 7, 10, '2018-08-21', NULL, ''),
(58, '2018-CN0004', 'Kung Fury', 'Marie-Lou, Antoine, Flavie, Laure, Quentin', '2018-08-21', '2018-08-29', '2018-08-31', NULL, 'Granger', 'Hermione', '6 rue Synthwave', 'Aesthetic City', '45678', 'hgranger@etud.u-pem.fr', '0909884829', 'Kung Fu', '543678', 'Terminator', '236', 'Daniel Hasselhoff', 'daniel.hasselhoff@u-pem.fr', 'doc/CAw3fyO3liNKS0BykAAVIS8MDHnzCsSyAQPrkOuP.bin', 'doc/dFBMhi9inAkXrb5hsIut93ei4IMZ3sqAi9QvlPSp.pdf', 1, 14, '2018-08-21', NULL, ''),
(59, '2018-CN0005', 'Film', 'Marie-Lou Barbier', '2018-08-21', '2018-07-20', '2018-07-24', NULL, 'Granger', 'Hermione', '15 rue des Chenilles', 'Champs-sur-Marne', '77420', 'hgranger@etud.u-pem.fr', '0793849952', 'IMAC', '123456', 'MAIF', '12345678', 'Han Seignant', 'han.seignant@u-pem.fr', NULL, NULL, 4, 1, '2018-08-21', NULL, ''),
(60, '2018-CN0006', 'MCV', 'LOW, LED', '2018-08-21', '2018-08-22', '2018-11-11', NULL, 'Granger', 'Hermione', 'Pomelo', 'Ozoir Plage', '77330', 'hgranger@etud.u-pem.fr', '0623456891', 'MIPI', '000001', 'MAIF', '17', 'Joseph Jackson', 'prenom.nom@u-pem.fr', 'doc/89oQxozjtES6kmF1wlV8wYofsf2YyuHr0ysWeApv.jpeg', 'doc/BhxcxbFr7lF1n5nC47NJCD4seP7YfVMc6XTGdgEX.jpeg', 7, 1, '2018-08-21', NULL, ''),
(61, '2018-CN0007', 'FFFFFF', 'Ptit slash', '2018-08-21', '2018-08-23', '2018-08-25', NULL, 'Granger', 'Hermione', 'sss 4', 'ee', '34455', 'hgranger@etud.u-pem.fr', '0633333333', 'CMI', '123456', '133333', '33333333', 'Rick Sanchez', 'rick.sanchez@u-pem.fr', 'doc/pIeszRORz1PmRDjCGLnjP9VfVr3KZbdV6XZW0vhQ.jpeg', 'doc/87nZxa6iWx7yTjtwQKiJY6WklpXgnKWLxczSFqnc.jpeg', 7, 1, '2018-08-21', NULL, ''),
(62, '2018-CN0008', 'Portail Interdimmensionnel', 'Morty Sanchez', '2018-08-21', '2018-08-23', '2018-08-24', NULL, 'Granger', 'Hermione', 'Dans La Rue  Saint Michel', 'Los Angelezoses', '10011', 'hgranger@etud.u-pem.fr', '1234567890', 'Tortue de l\'Espace', '123456', 'L\'Assurance Moustachue', '123456', 'Rick Sanchez', 'rick.sanchez@u-pem.fr', 'doc/TySIdvb3PWCv5R94xUCZL2PsDyKvqyQlZMb0i36W.jpeg', 'doc/tTZSliSWGR4065IaQ8t3I8ZgBDJT7wUDhhw4QEnJ.png', 6, 1, '2018-08-21', NULL, ''),
(63, '2018-CN0009', 'Film', NULL, '2018-08-21', '2018-07-20', '2018-07-24', NULL, 'Granger', 'Hermione', '15 rue des Chenilles', 'Champs-sur-Marne', '77420', 'hgranger@etud.u-pem.fr', '0793849952', 'IMAC', '123456', 'MAIF', '12345678', 'Han Seignant', 'han.seignant@u-pem.fr', NULL, NULL, 1, 1, '2018-08-21', NULL, ''),
(64, '2018-CN0010', 'Film', 'Marie-Lou Barbier', '2018-08-22', '2018-07-20', '2018-07-24', NULL, 'Granger', 'Hermione', '15 rue des Chenilles', 'Champs-sur-Marne', '77420', 'hgranger@etud.u-pem.fr', '0793849952', 'IMAC', '123456', 'MAIF', '12345678', 'Han Seignant', 'han.seignant@u-pem.fr', NULL, NULL, 1, 13, '2018-08-22', NULL, ''),
(65, '2018-CN0011', 'Film', 'Marie-Lou Barbier', '2018-08-28', '2018-07-20', '2018-07-24', NULL, 'Granger', 'Hermione', '15 rue des Chenilles', 'Champs-sur-Marne', '77420', 'hgranger@etud.u-pem.fr', '0793849952', 'IMAC', '123456', 'MAIF', '12345678', 'Han Seignant', 'han.seignant@u-pem.fr', NULL, NULL, 7, 1, '2018-08-28', NULL, '1a10b627bbe91645bc05ffc9922e35eaf76e43f81ad5609e5832de0a7eb98550'),
(66, '2018-CN0012', 'Borderlands', 'Zer0', '2018-08-28', '2018-08-22', '2018-08-25', NULL, 'Granger', 'Hermione', 'Adresse', 'Ville', '99888', 'hgranger@etud.u-pem.fr', '0683267227', 'Chasseur de l\'arche', '123456', 'Assurance', '123', 'Handsome Jack', 'handsome.jack@u-pem.fr', NULL, NULL, 3, 1, '2018-09-10', NULL, 'dfc5362d0d8d11882a9cefc90d010bf55417b75a7e2558ee3f4b0cc2eea4303d'),
(67, '2018-CN0013', 'Star Wars', 'Marie-Lou Barbier', '2018-08-28', '2018-07-20', '2018-07-24', NULL, 'Granger', 'Hermione', '15 rue des Chenilles', 'Champs-sur-Marne', '77420', 'hgranger@etud.u-pem.fr', '0793849952', 'Jedi', '123456', 'MAIF', '12345678', 'Darth Vador', 'darth.vador@u-pem.fr', NULL, NULL, 1, 1, '2018-08-28', NULL, 'a95946e3863b615a888000142c900e8a2847e73e365684766f00e6022ef731a9'),
(71, '2018-CN0014', 'Twilight', 'Marie-Lou Barbier', '2018-08-28', '2018-08-31', '2018-09-21', NULL, 'Granger', 'Hermione', '15 rue des Chenilles', 'Champs-sur-Marne', '77420', 'hgranger@etud.u-pem.fr', '0793849952', 'Vampire', '123456', 'MAIF', '12345678', 'Edward Cullen', 'edward.cullen@u-pem.fr', NULL, NULL, 4, 1, '2018-09-04', NULL, '48f61c378cf2ff472dd726cb7db2afa5c8a00a7dedeb0bb99971602f5af61d2e'),
(72, '2018-CN0015', 'Pokémon', 'Marie-Lou Barbier', '2018-08-28', '2018-07-20', '2018-07-24', NULL, 'Granger', 'Hermione', '15 rue des Chenilles', 'Champs-sur-Marne', '77420', 'hgranger@etud.u-pem.fr', '0793849952', 'Maître Pokémon', '123456', 'MAIF', '12345678', 'Professeur Chen', 'professeur.chen@u-pem.fr', NULL, NULL, 7, 1, '2018-08-28', NULL, 'c753ae6c664b7cad3d322ffea3eca23237f5108d0c46750987ba6b3edd6dc82e'),
(73, '2018-CN0016', 'The Rift', 'Paul', '2018-08-31', '2018-09-13', '2018-09-28', NULL, 'Granger', 'Hermione', '10 rue Tom Cruise', 'Champs', '66543', 'hgranger@etud.u-pem.fr', '0939393939', 'Cthulu', '123445', 'Assurance', '23423\'', 'William Clemmons', 'william.clemmons@u-pem.fr', 'doc/Jmtb2vrwIeUY1FWRroxAw4rxn4UxzC8dKvaV2vGK.pdf', 'doc/v21yxbCp45eCaRqrwIQt9ChLuu7IufbCDAm1eImi.pdf', 5, 10, '2018-09-10', NULL, '7934b7b70fa436410617ece9f509fb6a6acca021c6c97ed3b5b9a867f6683c62'),
(74, '2018-CN0017', 'Naamah', 'Moirin, Bao', '2018-08-31', '2018-09-20', '2018-09-29', NULL, 'Granger', 'Hermione', '43 rue des Koalas Rose', 'Capuccino town', '34769', 'hgranger@etud.u-pem.fr', '3423423424', 'Sorcière', '543534', 'Chaise', '53453', 'Raphael Mereliot', 'raphael.mereliot@u-pem.fr', NULL, NULL, 2, 10, '2018-08-31', NULL, '0a1ea6694372ed5f99e69ef9fcded1559a0bde0078a4e2aca86d9c069e039f04'),
(75, '2018-CN0018', 'Nom', 'e', '2018-09-06', '2018-09-14', '2018-09-29', NULL, 'Granger', 'Hermione', 'adreess', 'zefzef', '99', 'hgranger@etud.u-pem.fr', '0999999999', 'zefzef', '123456', 'zefzef', '99', 'Prénom Nom', 'prenom.nom@u-pem.fr', NULL, NULL, 2, 12, '2018-09-06', NULL, '66a533a9298674b9f3dd79faa95a84d11e46bf886395d5b6dbb6e85690e3e838'),
(78, '2018-CN0021', 'grula le flim', 'grula l\'étudiant et crousti l\'étudiante', '2018-09-07', '2018-09-10', '2018-09-14', NULL, 'Granger', 'Hermione', 'rue des trucs marrants', 'noisy the great', '93160', 'hgranger@etud.u-pem.fr', '0606060605', 'master 42', '123456', 'la ssurance', '654321', 'Dieu', 'dieu@u-pem.fr', 'doc/K7NeJO9r88eFe2DN82nf7sbd3Yge10x4XQJHM1eV.jpeg', 'doc/nKMpgMKP22OmBNyMY3up8GPGcuRt1cebyblyJIkK.png', 6, 10, '2018-09-07', NULL, 'dd5d5ef9cf97e24cfbf60bde63d2bb51b90578a29a51dfeade4f81c0da59f54f'),
(79, '2018-CN0022', 'Film 2e année', 'Julie Barre, Alexandre Jacques', '2018-09-11', '2018-09-20', '2018-09-21', NULL, 'Granger', 'Hermione', '26 boulevard Newton', 'Champs-sur-Marne', '77420', 'hgranger@etud.u-pem.fr', '0627326990', 'IMAC', '624379', 'Direct Assurance', '72823729281741', 'Quentin Tarantino', 'quentin.tarantino@u-pem.fr', 'doc/fuaKupZ5kcspTHrIyXJngFdLoBzcOwedT6kE3umW.pdf', 'doc/NWvJvCSNpAQg9XrPpXhhhjbNWGxkZJKvwR0t4dBX.pdf', 1, 1, '2018-09-11', NULL, '1de358dc58442f6d5218481958f84f4333e3b80ec2a1e543be4e6c0e46f7453d'),
(80, '2018-CN0023', 'Film 2e année', 'Julie Barre, Alexandre Jacques', '2018-09-11', '2018-09-18', '2018-09-21', NULL, 'Granger', 'Hermione', '26 boulevard Newton', 'Champs-sur-Marne', '77420', 'hgranger@etud.u-pem.fr', '0627326890', 'IMAC', '624379', 'Direct Assurance', '765625874323', 'Quentin Tarantino', 'quentin.tarantino@u-pem.fr', 'doc/jYEYYHgVwGnf5hx2nePsDLyiVygP1d74I8uLYSGn.pdf', 'doc/Ni8DflYrpvj76HgOrh5fF6UxcEOsuj9WF3P6EVbb.pdf', 1, 1, '2018-09-11', NULL, '8fed48e88e81b241c24561d1051ac631c95da2ee271510d05d01e50f73853a93');

-- --------------------------------------------------------

--
-- Structure de la table `etatconventions`
--

DROP TABLE IF EXISTS `etatconventions`;
CREATE TABLE IF NOT EXISTS `etatconventions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` tinytext NOT NULL,
  `created_at` date DEFAULT NULL,
  `updated_at` date DEFAULT NULL,
  `deleted_at` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `etatconventions`
--

INSERT INTO `etatconventions` (`id`, `nom`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'en attente de validation par l\'enseignant', NULL, NULL, NULL),
(2, 'en attente de validation par l\'agent prêteur', NULL, NULL, NULL),
(3, 'en attente de validation par le Campus Numérique', NULL, NULL, NULL),
(4, 'validée', NULL, NULL, NULL),
(5, 'remise confirmée avec réserves', NULL, NULL, NULL),
(6, 'clôturée', NULL, NULL, NULL),
(7, 'annulée', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `materiels`
--

DROP TABLE IF EXISTS `materiels`;
CREATE TABLE IF NOT EXISTS `materiels` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `convention_id` int(11) NOT NULL,
  `nom` text NOT NULL,
  `quantite` tinyint(4) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `conventionId` (`convention_id`)
) ENGINE=InnoDB AUTO_INCREMENT=146 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `materiels`
--

INSERT INTO `materiels` (`id`, `convention_id`, `nom`, `quantite`) VALUES
(1, 1, 'Canon 5D', 1),
(2, 2, 'Caméra', 1),
(3, 2, 'Micro perche', 1),
(4, 2, 'perche', 1),
(5, 2, 'câble XLR', 1),
(6, 2, 'panneau LED', 2),
(7, 21, 'zut', 1),
(8, 22, 'zut', 1),
(14, 26, 'Caméra', 1),
(15, 26, 'Trépied', 1),
(16, 26, 'Perche', 1),
(17, 26, 'Micro perche directionnel', 1),
(18, 26, 'Projecteur LED', 2),
(19, 26, 'Câble XLR', 1),
(20, 27, 'Caméra', 1),
(21, 27, 'Trépied', 1),
(22, 27, 'Micro perche', 1),
(23, 27, 'Perche', 1),
(24, 27, 'Câble XLR', 1),
(25, 28, 'Fromage', 1),
(26, 28, 'Olives', 2),
(27, 28, 'Beurre', 1),
(28, 28, 'Pâte à pizza', 1),
(29, 29, 'Caméra', 3),
(30, 29, 'Trépied', 1),
(31, 29, 'Micro', 1),
(32, 30, 'Caméra', 1),
(33, 30, 'Grue', 1),
(34, 30, 'Micro', 1),
(35, 30, 'Câble', 1),
(36, 30, 'SteadyCam', 1),
(37, 30, 'Drône', 1),
(38, 31, 'Caméra', 1),
(39, 32, 'Caméra', 1),
(40, 33, 'Caméra', 1),
(41, 34, 'Caméra', 1),
(42, 35, 'Caméra', 1),
(43, 37, 'Caméra', 1),
(44, 41, 'Caméra', 1),
(45, 42, 'Caméra', 1),
(46, 43, 'Caméra', 1),
(47, 44, 'Caméra', 1),
(52, 45, 'Caméra de ouf malade', 1),
(67, 46, 'Caméra toute neuve et rose pailletée', 1),
(68, 47, 'Caméra', 1),
(69, 48, 'Caméra', 1),
(70, 49, 'Caméra', 1),
(71, 49, 'Eridium', 1),
(72, 55, 'Caméra', 1),
(73, 55, 'Micro', 1),
(74, 55, 'Perche', 1),
(75, 55, 'Câble XLR', 1),
(76, 55, 'LED', 2),
(77, 55, 'Enregistreur', 1),
(78, 55, 'Trépied', 1),
(82, 57, 'Caméra', 1),
(83, 57, 'Fond vert', 1),
(84, 57, 'Trépied', 1),
(85, 58, 'Caméra', 1),
(86, 58, 'Rétro-projecteur', 1),
(90, 56, 'Enregistreur', 1),
(91, 56, 'Micro Omnidirectionnel', 1),
(92, 56, 'Câble XLR', 1),
(93, 59, 'Caméra', 1),
(94, 60, 'Camérascope Sony', 20),
(95, 61, 'Pantoufles 2.0', 20),
(99, 62, 'Pierre Spectrale', 10),
(100, 62, 'Bandanas Pour Tortue Ninja', 7),
(101, 62, 'Ma Femme', 1),
(102, 62, 'Mes Enfants', 3),
(103, 63, 'Caméra', 1),
(104, 64, 'Caméra', 1),
(105, 65, 'Caméra', 1),
(106, 67, 'Caméra', 1),
(107, 70, 'Caméra', 1),
(108, 70, 'Collier d\'ail', 3),
(109, 70, 'Balles en argent', 10),
(110, 70, 'Revolver', 1),
(115, 72, 'Caméra', 1),
(116, 72, 'Pokéball', 1),
(117, 72, 'Pikachu', 1),
(118, 71, 'Caméra', 1),
(119, 71, 'Collier d\'ail', 1),
(120, 71, 'Balles en argent', 10),
(121, 71, 'Revolver', 2),
(122, 73, 'Caméra', 1),
(123, 73, 'Pamplemousse', 1),
(124, 73, 'Micro', 1),
(125, 74, 'Arc', 1),
(126, 74, 'Flèches', 10),
(127, 75, 'c', 1),
(128, 76, 'black magic', 1),
(129, 76, 'drone', 1),
(130, 77, 'black magic', 1),
(131, 77, 'drone', 1),
(132, 78, 'black magic', 1),
(133, 78, 'drone', 1),
(134, 79, 'Caméra Canon 5D', 1),
(135, 79, 'Micro perche', 1),
(136, 79, 'Perche', 1),
(137, 79, 'Enregistreur', 1),
(138, 79, 'Câble xlr', 1),
(139, 80, 'Canon 7D', 1),
(140, 80, 'Micro perche', 1),
(141, 80, 'Perche', 1),
(142, 80, 'Enregistreur', 1),
(143, 80, 'Câble XLR', 2),
(144, 66, 'Projecteur LED', 2),
(145, 66, 'Trépied', 1);

-- --------------------------------------------------------

--
-- Structure de la table `modifications`
--

DROP TABLE IF EXISTS `modifications`;
CREATE TABLE IF NOT EXISTS `modifications` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `modificationtype_id` int(11) NOT NULL,
  `convention_id` int(11) NOT NULL,
  `created_at` date NOT NULL,
  `deleted_at` date DEFAULT NULL,
  `updated_at` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `modificationtype_id` (`modificationtype_id`),
  KEY `convention_id` (`convention_id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `modifications`
--

INSERT INTO `modifications` (`id`, `user_id`, `modificationtype_id`, `convention_id`, `created_at`, `deleted_at`, `updated_at`) VALUES
(7, 46, 1, 5, '2018-07-27', NULL, '2018-07-27'),
(8, 46, 1, 5, '2018-07-27', NULL, '2018-07-27'),
(9, 46, 1, 5, '2018-07-27', NULL, '2018-07-27'),
(10, 46, 1, 5, '2018-07-27', NULL, '2018-07-27'),
(11, 46, 1, 5, '2018-07-27', NULL, '2018-07-27'),
(12, 46, 1, 5, '2018-07-27', NULL, '2018-07-27'),
(13, 5, 1, 46, '2018-07-27', NULL, '2018-07-27'),
(14, 5, 1, 46, '2018-08-13', NULL, '2018-08-13'),
(15, 5, 2, 31, '2018-08-13', NULL, '2018-08-13'),
(16, 5, 2, 34, '2018-08-13', NULL, '2018-08-13'),
(17, 0, 2, 54, '2018-08-21', NULL, '2018-08-21'),
(18, 0, 2, 53, '2018-08-21', NULL, '2018-08-21'),
(19, 0, 2, 52, '2018-08-21', NULL, '2018-08-21'),
(20, 0, 2, 51, '2018-08-21', NULL, '2018-08-21'),
(21, 0, 2, 50, '2018-08-21', NULL, '2018-08-21'),
(22, 0, 2, 49, '2018-08-21', NULL, '2018-08-21'),
(23, 0, 2, 46, '2018-08-21', NULL, '2018-08-21'),
(24, 0, 2, 57, '2018-08-21', NULL, '2018-08-21'),
(26, 5, 1, 56, '2018-08-21', NULL, '2018-08-21'),
(27, 5, 1, 56, '2018-08-21', NULL, '2018-08-21'),
(28, 0, 2, 61, '2018-08-21', NULL, '2018-08-21'),
(29, 0, 2, 60, '2018-08-21', NULL, '2018-08-21'),
(30, 5, 1, 62, '2018-08-21', NULL, '2018-08-21'),
(31, NULL, 2, 65, '2018-08-28', NULL, '2018-08-28'),
(32, NULL, 2, 72, '2018-08-28', NULL, '2018-08-28'),
(33, 69, 1, 71, '2018-08-30', NULL, '2018-08-30');

-- --------------------------------------------------------

--
-- Structure de la table `modificationtypes`
--

DROP TABLE IF EXISTS `modificationtypes`;
CREATE TABLE IF NOT EXISTS `modificationtypes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` tinytext NOT NULL,
  `created_at` date DEFAULT NULL,
  `deleted_at` date DEFAULT NULL,
  `updated_at` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `modificationtypes`
--

INSERT INTO `modificationtypes` (`id`, `nom`, `created_at`, `deleted_at`, `updated_at`) VALUES
(1, 'modification', '2018-07-26', NULL, NULL),
(2, 'suppression', '2018-07-26', NULL, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `signatures`
--

DROP TABLE IF EXISTS `signatures`;
CREATE TABLE IF NOT EXISTS `signatures` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `url` text NOT NULL,
  `user_id` int(11) NOT NULL,
  `created_at` date DEFAULT NULL,
  `updated_at` date DEFAULT NULL,
  `deleted_at` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `signatures`
--

INSERT INTO `signatures` (`id`, `url`, `user_id`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'https://image.com/signa.png', 1, NULL, NULL, NULL),
(2, 'http://2.bp.blogspot.com/-T5CaPcuZ0YI/TXIXkILF3bI/AAAAAAAABVY/1925q1dv-yw/s1600/Signature.bmp', 2, NULL, NULL, NULL),
(3, 'public/signatures/5GOZyLjYbQXQYgWhHQvh4A6bF7D4DC8G8pXcNtRx.jpeg', 13, '2018-08-16', '2018-08-16', NULL),
(4, 'signatures/txQVFo0KOKfgsDcvy9LcDAJb1KI2zAeowqxmevl5.png', 23, '2018-08-17', '2018-08-17', NULL),
(5, 'signatures/xdbQSg07uy5cSobEqMIq8NkOWlYJRfOAnpJlSscC.png', 18, '2018-08-20', '2018-08-20', NULL),
(6, 'signatures/I0EuMM0ewP5mKMf8Lctm0vQdzr82bRKdmUoCwacz.png', 18, '2018-08-20', '2018-08-20', NULL),
(7, 'signatures/Ra89P2TiYSlhdKOuiUKgGfkmtKNNnXDLgNnlIQbs.png', 18, '2018-08-20', '2018-08-20', NULL),
(8, 'signatures/aQvZrDQyesuyNEPocyY5EJPxA7hRpRANiLPe09Bq.jpeg', 30, '2018-08-20', '2018-08-20', NULL),
(9, 'signatures/RvqOfU46qIz2dnS8oRUi0Ec08Q4v0oPvooTOWoks.jpeg', 33, '2018-08-20', '2018-08-20', NULL),
(10, 'signatures/d9ZJsD3YUnghhug3sOhZAXX1J1hWooEM4i2Gq1xJ.jpeg', 42, '2018-08-21', '2018-08-21', NULL),
(11, 'signatures/0h3zqyFN6gWg5Xqfj6mtWHylkcOKY8zFAv4hhWJC.jpeg', 42, '2018-08-21', '2018-08-21', NULL),
(12, 'signatures/DKex5b8NfJWNE3yTPuzEeHxrNBJTWZcM9NPz6YI0.png', 42, '2018-08-21', '2018-08-21', NULL),
(13, 'signatures/7a8aM8Voyjvucy0nc3kaX13eI4m6zTAyy5PJEDCI.png', 42, '2018-08-21', '2018-08-21', NULL),
(14, 'signatures/9sSc8zZPJUBMQgzAIYMXjQ1IvRvW0xexkrNA64yc.png', 44, '2018-08-21', '2018-08-21', NULL),
(15, 'signatures/VcN5idogsakoK8tFbu6UDu8yQj4WFSQCO94mLqbd.png', 63, '2018-08-22', '2018-08-22', NULL),
(16, 'signatures/kri0OpIj8CbxTgFIOFVERJwTvx0DoUe86nncCfTE.png', 68, '2018-08-22', '2018-08-22', '2018-08-22'),
(17, 'signatures/aHlpBMIryBzU1exn755MqGB6kS2qshASHjXbjbRf.png', 68, '2018-08-22', '2018-08-22', '2018-08-22'),
(19, 'signatures/1FFTIOd8wJQw5Sq8ClY6ycbrrC9YhNou7EM9UQWx.png', 70, '2018-09-07', '2018-09-07', NULL),
(20, 'signatures/kpTaUPR5JGx3ni4IQjvLOmh3ApQV3erIb0wLeHgd.png', 73, '2018-09-07', '2018-09-07', NULL),
(21, 'public/signatures/l8idf4CjChu6NLCEFrIosgjUNDBRtgbLe40qCJaN.jpeg', 71, '2018-09-10', '2018-09-10', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `userbureaurels`
--

DROP TABLE IF EXISTS `userbureaurels`;
CREATE TABLE IF NOT EXISTS `userbureaurels` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `bureaupret_id` int(11) NOT NULL,
  `created_at` date DEFAULT NULL,
  `updated_at` date DEFAULT NULL,
  `deleted_at` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `bureaupret_id` (`bureaupret_id`)
) ENGINE=InnoDB AUTO_INCREMENT=117 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `userbureaurels`
--

INSERT INTO `userbureaurels` (`id`, `user_id`, `bureaupret_id`, `created_at`, `updated_at`, `deleted_at`) VALUES
(113, 69, 1, '2018-08-31', '2018-08-31', NULL),
(114, 69, 10, '2018-08-31', '2018-08-31', NULL),
(115, 72, 12, '2018-09-04', '2018-09-04', NULL),
(116, 72, 1, '2018-09-04', '2018-09-04', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` tinytext NOT NULL,
  `prenom` tinytext NOT NULL,
  `mail` tinytext NOT NULL,
  `created_at` date DEFAULT NULL,
  `updated_at` date DEFAULT NULL,
  `deleted_at` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=74 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `nom`, `prenom`, `mail`, `created_at`, `updated_at`, `deleted_at`) VALUES
(69, 'Bowie', 'David', 'david.bowie@u-pem.fr', '2018-08-29', '2018-08-31', NULL),
(70, 'Organa', 'Leia', 'leia.organa@u-pem.fr', '2018-08-29', '2018-08-31', NULL),
(71, 'Xavier', 'Charles', 'charles.xavier@u-pem.fr', '2018-08-29', '2018-08-31', NULL),
(72, 'Connor', 'Sarah', 'sarah.connor@u-pem.fr', '2018-08-31', '2018-09-04', '2018-09-04'),
(73, 'Coustillières', 'Perrine', 'perrine.courstiliieres@u-pem.fr', '2018-09-07', '2018-09-07', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `usertyperels`
--

DROP TABLE IF EXISTS `usertyperels`;
CREATE TABLE IF NOT EXISTS `usertyperels` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `usertype_id` int(11) NOT NULL,
  `created_at` date DEFAULT NULL,
  `updated_at` date DEFAULT NULL,
  `deleted_at` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`user_id`),
  KEY `userTypeId` (`usertype_id`)
) ENGINE=InnoDB AUTO_INCREMENT=134 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `usertyperels`
--

INSERT INTO `usertyperels` (`id`, `user_id`, `usertype_id`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 4, 3, NULL, NULL, NULL),
(2, 3, 1, NULL, NULL, NULL),
(3, 1, 2, NULL, NULL, NULL),
(4, 1, 3, NULL, NULL, NULL),
(5, 2, 2, NULL, NULL, NULL),
(6, 5, 1, NULL, NULL, NULL),
(7, 7, 1, '2018-08-16', '2018-08-16', NULL),
(8, 8, 1, '2018-08-16', '2018-08-16', NULL),
(9, 9, 1, '2018-08-16', '2018-08-16', NULL),
(10, 10, 1, '2018-08-16', '2018-08-20', '2018-08-20'),
(11, 11, 2, '2018-08-16', '2018-08-16', NULL),
(12, 12, 2, '2018-08-16', '2018-08-16', NULL),
(13, 13, 2, '2018-08-16', '2018-08-16', NULL),
(14, 15, 2, '2018-08-16', '2018-08-16', NULL),
(15, 16, 1, '2018-08-16', '2018-08-16', NULL),
(16, 17, 2, '2018-08-16', '2018-08-16', NULL),
(18, 19, 2, '2018-08-16', '2018-08-16', NULL),
(19, 21, 3, '2018-08-16', '2018-08-16', NULL),
(20, 21, 2, '2018-08-16', '2018-08-16', NULL),
(21, 23, 2, '2018-08-17', '2018-08-17', NULL),
(22, 24, 3, '2018-08-20', '2018-08-20', NULL),
(25, 10, 1, '2018-08-20', '2018-08-20', '2018-08-20'),
(26, 10, 1, '2018-08-20', '2018-08-20', '2018-08-20'),
(27, 10, 1, '2018-08-20', '2018-08-20', '2018-08-20'),
(28, 10, 1, '2018-08-20', '2018-08-20', NULL),
(29, 26, 1, '2018-08-20', '2018-08-20', '2018-08-20'),
(30, 26, 1, '2018-08-20', '2018-08-20', NULL),
(37, 27, 1, '2018-08-20', '2018-08-20', NULL),
(43, 25, 2, '2018-08-20', '2018-08-20', NULL),
(44, 25, 3, '2018-08-20', '2018-08-20', NULL),
(47, 18, 2, '2018-08-20', '2018-08-20', NULL),
(48, 30, 2, '2018-08-20', '2018-08-20', NULL),
(49, 30, 3, '2018-08-20', '2018-08-20', NULL),
(50, 31, 2, '2018-08-20', '2018-08-20', NULL),
(53, 33, 2, '2018-08-20', '2018-08-20', NULL),
(54, 34, 1, '2018-08-20', '2018-08-20', NULL),
(56, 36, 1, '2018-08-20', '2018-08-20', NULL),
(57, 37, 1, '2018-08-20', '2018-08-20', NULL),
(58, 38, 1, '2018-08-20', '2018-08-20', NULL),
(59, 39, 1, '2018-08-20', '2018-08-20', NULL),
(60, 40, 1, '2018-08-20', '2018-08-20', NULL),
(63, 41, 1, '2018-08-20', '2018-08-20', NULL),
(68, 43, 1, '2018-08-21', '2018-08-21', NULL),
(70, 42, 2, '2018-08-21', '2018-08-21', NULL),
(71, 42, 3, '2018-08-21', '2018-08-21', NULL),
(72, 35, 2, '2018-08-21', '2018-08-21', NULL),
(73, 35, 3, '2018-08-21', '2018-08-21', NULL),
(76, 44, 1, '2018-08-21', '2018-08-21', NULL),
(77, 45, 1, '2018-08-22', '2018-08-22', NULL),
(79, 47, 1, '2018-08-22', '2018-08-22', NULL),
(80, 48, 1, '2018-08-22', '2018-08-22', NULL),
(81, 49, 1, '2018-08-22', '2018-08-22', NULL),
(82, 50, 1, '2018-08-22', '2018-08-22', NULL),
(83, 51, 1, '2018-08-22', '2018-08-22', NULL),
(84, 52, 1, '2018-08-22', '2018-08-22', NULL),
(85, 53, 1, '2018-08-22', '2018-08-22', NULL),
(86, 54, 1, '2018-08-22', '2018-08-22', NULL),
(87, 59, 1, '2018-08-22', '2018-08-22', NULL),
(90, 61, 1, '2018-08-22', '2018-08-22', NULL),
(91, 61, 1, '2018-08-22', '2018-08-22', NULL),
(92, 62, 1, '2018-08-22', '2018-08-22', NULL),
(118, 68, 2, '2018-08-22', '2018-08-22', NULL),
(119, 68, 3, '2018-08-22', '2018-08-22', NULL),
(120, 69, 1, '2018-08-29', '2018-08-29', NULL),
(124, 72, 1, '2018-08-31', '2018-08-31', NULL),
(129, 70, 2, '2018-09-07', '2018-09-07', NULL),
(130, 73, 2, '2018-09-07', '2018-09-07', NULL),
(131, 73, 3, '2018-09-07', '2018-09-07', NULL),
(132, 71, 2, '2018-09-10', '2018-09-10', NULL),
(133, 71, 3, '2018-09-10', '2018-09-10', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `usertypes`
--

DROP TABLE IF EXISTS `usertypes`;
CREATE TABLE IF NOT EXISTS `usertypes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` tinytext NOT NULL,
  `created_at` date DEFAULT NULL,
  `updated_at` date DEFAULT NULL,
  `deleted_at` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `usertypes`
--

INSERT INTO `usertypes` (`id`, `nom`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'agent', NULL, NULL, NULL),
(2, 'delegataire', NULL, NULL, NULL),
(3, 'administrateur', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `validations`
--

DROP TABLE IF EXISTS `validations`;
CREATE TABLE IF NOT EXISTS `validations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_at` date NOT NULL,
  `convention_id` int(11) NOT NULL,
  `validationtype_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `updated_at` date DEFAULT NULL,
  `deleted_at` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `conventionId` (`convention_id`),
  KEY `validationTypeId` (`validationtype_id`),
  KEY `userId` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `validations`
--

INSERT INTO `validations` (`id`, `created_at`, `convention_id`, `validationtype_id`, `user_id`, `updated_at`, `deleted_at`) VALUES
(1, '2018-05-28', 1, 1, 3, NULL, NULL),
(2, '2018-07-13', 27, 1, NULL, NULL, NULL),
(3, '2018-07-13', 27, 2, 3, NULL, NULL),
(4, '2018-07-13', 27, 3, 2, NULL, NULL),
(5, '2018-07-23', 17, 2, 3, '2018-07-23', NULL),
(6, '2018-07-23', 17, 2, 3, '2018-07-23', NULL),
(7, '2018-07-23', 17, 2, 3, '2018-07-23', NULL),
(8, '2018-07-23', 17, 2, 3, '2018-07-23', NULL),
(9, '2018-07-23', 17, 2, 3, '2018-07-23', NULL),
(10, '2018-07-26', 2, 4, 3, '2018-07-26', NULL),
(11, '2018-08-13', 6, 3, 5, '2018-08-13', NULL),
(12, '2018-08-14', 17, 3, 2, '2018-08-14', NULL),
(13, '2018-08-21', 56, 2, 5, '2018-08-21', NULL),
(14, '2018-08-21', 59, 2, 5, '2018-08-21', NULL),
(15, '2018-08-21', 56, 3, 30, '2018-08-21', NULL),
(16, '2018-08-21', 59, 3, 30, '2018-08-21', NULL),
(17, '2018-08-21', 56, 4, 41, '2018-08-21', NULL),
(18, '2018-08-21', 62, 2, 41, '2018-08-21', NULL),
(19, '2018-08-21', 62, 3, 30, '2018-08-21', NULL),
(20, '2018-08-21', 62, 4, 41, '2018-08-21', NULL),
(24, '2018-08-27', 55, 1, NULL, '2018-08-27', NULL),
(25, '2018-08-28', 55, 1, NULL, '2018-08-28', NULL),
(26, '2018-08-28', 66, 1, NULL, '2018-08-28', NULL),
(27, '2018-08-28', 66, 1, NULL, '2018-08-28', NULL),
(28, '2018-08-28', 66, 1, NULL, '2018-08-28', NULL),
(29, '2018-08-28', 66, 1, NULL, '2018-08-28', NULL),
(30, '2018-08-28', 71, 1, NULL, '2018-08-28', NULL),
(31, '2018-08-28', 71, 1, NULL, '2018-08-28', NULL),
(32, '2018-08-28', 71, 1, NULL, '2018-08-28', NULL),
(33, '2018-08-28', 71, 1, NULL, '2018-08-28', NULL),
(34, '2018-08-28', 71, 1, NULL, '2018-08-28', NULL),
(35, '2018-08-28', 71, 1, NULL, '2018-08-28', NULL),
(36, '2018-08-31', 73, 1, NULL, '2018-08-31', NULL),
(37, '2018-08-31', 74, 1, NULL, '2018-08-31', NULL),
(38, '2018-08-31', 73, 2, 69, '2018-08-31', NULL),
(39, '2018-09-04', 71, 2, 72, '2018-09-04', NULL),
(40, '2018-09-04', 71, 3, 71, '2018-09-04', NULL),
(41, '2018-09-06', 73, 3, 71, '2018-09-06', NULL),
(42, '2018-09-06', 75, 1, NULL, '2018-09-06', NULL),
(43, '2018-09-07', 78, 1, NULL, '2018-09-07', NULL),
(44, '2018-09-07', 78, 2, 69, '2018-09-07', NULL),
(45, '2018-09-07', 78, 3, 70, '2018-09-07', NULL),
(46, '2018-09-07', 78, 4, 69, '2018-09-07', NULL),
(47, '2018-09-10', 66, 2, 69, '2018-09-10', NULL),
(48, '2018-09-10', 73, 5, 69, '2018-09-10', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `validationtypes`
--

DROP TABLE IF EXISTS `validationtypes`;
CREATE TABLE IF NOT EXISTS `validationtypes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` tinytext NOT NULL,
  `created_at` date DEFAULT NULL,
  `updated_at` date DEFAULT NULL,
  `deleted_at` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `validationtypes`
--

INSERT INTO `validationtypes` (`id`, `nom`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'enseignant', NULL, NULL, NULL),
(2, 'agent', NULL, NULL, NULL),
(3, 'delegataire', NULL, NULL, NULL),
(4, 'remise', NULL, NULL, NULL),
(5, 'reserve', NULL, NULL, NULL);

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `bureauprets`
--
ALTER TABLE `bureauprets`
  ADD CONSTRAINT `est gere par` FOREIGN KEY (`agent_id`) REFERENCES `users` (`id`);

--
-- Contraintes pour la table `conventions`
--
ALTER TABLE `conventions`
  ADD CONSTRAINT `a pour bureau` FOREIGN KEY (`bureaupret_id`) REFERENCES `bureauprets` (`id`),
  ADD CONSTRAINT `a pour etat` FOREIGN KEY (`etat_id`) REFERENCES `etatconventions` (`id`);

--
-- Contraintes pour la table `materiels`
--
ALTER TABLE `materiels`
  ADD CONSTRAINT `est inscrit dans` FOREIGN KEY (`convention_id`) REFERENCES `conventions` (`id`);

--
-- Contraintes pour la table `modifications`
--
ALTER TABLE `modifications`
  ADD CONSTRAINT `modifications_ibfk_1` FOREIGN KEY (`convention_id`) REFERENCES `conventions` (`id`),
  ADD CONSTRAINT `modifications_ibfk_2` FOREIGN KEY (`modificationtype_id`) REFERENCES `modificationtypes` (`id`);

--
-- Contraintes pour la table `signatures`
--
ALTER TABLE `signatures`
  ADD CONSTRAINT `appartient à ` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Contraintes pour la table `userbureaurels`
--
ALTER TABLE `userbureaurels`
  ADD CONSTRAINT `userbureaurels_ibfk_1` FOREIGN KEY (`bureaupret_id`) REFERENCES `bureauprets` (`id`),
  ADD CONSTRAINT `userbureaurels_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Contraintes pour la table `usertyperels`
--
ALTER TABLE `usertyperels`
  ADD CONSTRAINT `usertyperels_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `usertyperels_ibfk_2` FOREIGN KEY (`usertype_id`) REFERENCES `usertypes` (`id`);

--
-- Contraintes pour la table `validations`
--
ALTER TABLE `validations`
  ADD CONSTRAINT `concerne` FOREIGN KEY (`convention_id`) REFERENCES `conventions` (`id`),
  ADD CONSTRAINT `est de type validation` FOREIGN KEY (`validationtype_id`) REFERENCES `validationtypes` (`id`),
  ADD CONSTRAINT `est validé par` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
