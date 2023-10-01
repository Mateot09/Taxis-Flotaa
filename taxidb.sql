-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 08-07-2023 a las 02:22:17
-- Versión del servidor: 10.1.10-MariaDB
-- Versión de PHP: 5.5.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `taxidb`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `conductores`
--

CREATE TABLE `conductores` (
  `ID_Conductor` int(11) NOT NULL,
  `Nombre` varchar(50) DEFAULT NULL,
  `ID_Taxi` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `conductores`
--

INSERT INTO `conductores` (`ID_Conductor`, `Nombre`, `ID_Taxi`) VALUES
(1, 'Juan Pérez', 4),
(2, 'María López', 2),
(3, 'Carlos Rodríguez', 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pasajeros`
--

CREATE TABLE `pasajeros` (
  `ID_Pasajero` int(11) NOT NULL,
  `Nombre` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `pasajeros`
--

INSERT INTO `pasajeros` (`ID_Pasajero`, `Nombre`) VALUES
(1, 'Ana García'),
(2, 'Pedro Martínez'),
(3, 'Laura Jiménez');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `taxis`
--

CREATE TABLE `taxis` (
  `ID_Taxi` int(11) NOT NULL,
  `Modelo` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `taxis`
--

INSERT INTO `taxis` (`ID_Taxi`, `Modelo`) VALUES
(1, 'Toyota Corolla'),
(2, 'Honda Civic'),
(3, 'Ford Fusion'),
(4, 'Aveo Family');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `viajes`
--

CREATE TABLE `viajes` (
  `ID_Viaje` int(11) NOT NULL,
  `Origen` varchar(50) DEFAULT NULL,
  `Destino` varchar(50) DEFAULT NULL,
  `ID_Conductor` int(11) DEFAULT NULL,
  `ID_Pasajero` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `viajes`
--

INSERT INTO `viajes` (`ID_Viaje`, `Origen`, `Destino`, `ID_Conductor`, `ID_Pasajero`) VALUES
(1, 'Aeropuerto', 'Centro', 1, 2),
(2, 'Estación de tren', 'Playa', 3, 1),
(3, 'Oficina', 'Restaurante', 2, 3),
(4, 'Quito', 'Cuenca', 2, 2);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `conductores`
--
ALTER TABLE `conductores`
  ADD PRIMARY KEY (`ID_Conductor`),
  ADD KEY `ID_Taxi` (`ID_Taxi`);

--
-- Indices de la tabla `pasajeros`
--
ALTER TABLE `pasajeros`
  ADD PRIMARY KEY (`ID_Pasajero`);

--
-- Indices de la tabla `taxis`
--
ALTER TABLE `taxis`
  ADD PRIMARY KEY (`ID_Taxi`);

--
-- Indices de la tabla `viajes`
--
ALTER TABLE `viajes`
  ADD PRIMARY KEY (`ID_Viaje`),
  ADD KEY `ID_Conductor` (`ID_Conductor`),
  ADD KEY `ID_Pasajero` (`ID_Pasajero`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `conductores`
--
ALTER TABLE `conductores`
  MODIFY `ID_Conductor` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT de la tabla `pasajeros`
--
ALTER TABLE `pasajeros`
  MODIFY `ID_Pasajero` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT de la tabla `taxis`
--
ALTER TABLE `taxis`
  MODIFY `ID_Taxi` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT de la tabla `viajes`
--
ALTER TABLE `viajes`
  MODIFY `ID_Viaje` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `conductores`
--
ALTER TABLE `conductores`
  ADD CONSTRAINT `conductores_ibfk_1` FOREIGN KEY (`ID_Taxi`) REFERENCES `taxis` (`ID_Taxi`);

--
-- Filtros para la tabla `viajes`
--
ALTER TABLE `viajes`
  ADD CONSTRAINT `viajes_ibfk_1` FOREIGN KEY (`ID_Conductor`) REFERENCES `conductores` (`ID_Conductor`),
  ADD CONSTRAINT `viajes_ibfk_2` FOREIGN KEY (`ID_Pasajero`) REFERENCES `pasajeros` (`ID_Pasajero`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
