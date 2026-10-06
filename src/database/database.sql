
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


--
-- Base de datos: `distribuidora`
--

-- ELIMINAR TABLAS EXISTENTES EN ORDEN CORRECTO POR LAS LLAVES FORÁNEAS
DROP TABLE IF EXISTS `detalles_pedidos`;
DROP TABLE IF EXISTS `pedidos`;
DROP TABLE IF EXISTS `productos`;
DROP TABLE IF EXISTS `categorias`;
DROP TABLE IF EXISTS `clientes`;
DROP TABLE IF EXISTS `compania_envio`;
DROP TABLE IF EXISTS `empleados`;
DROP TABLE IF EXISTS `proveedores`;

-- --------------------------------------------------------
-- Estructura de tabla para la tabla `categorias`
--
CREATE TABLE `categorias` (
  `id_categoria` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `creado_en` timestamp DEFAULT current_timestamp(),
  `actualizado_en` timestamp DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------
-- Estructura de tabla para la tabla `clientes`
--
CREATE TABLE `clientes` (
  `id_cliente` int(11) NOT NULL,
  `nombre` varchar(50) DEFAULT NULL,
  `apellido` varchar(50) DEFAULT NULL,
  `cuit` varchar(11) NOT NULL,
  `razon_social` varchar(150) DEFAULT NULL,
  `direccion` varchar(255) NOT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `dni` varchar(10) DEFAULT NULL,
  `condicion_iva` enum('Consumidor Final','Responsable Inscripto','Monotributo') NOT NULL DEFAULT 'Consumidor Final',
  `creado_en` timestamp DEFAULT current_timestamp(),
  `actualizado_en` timestamp DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

INSERT INTO `clientes` (`id_cliente`, `nombre`, `apellido`, `cuit`, `razon_social`, `direccion`, `telefono`, `email`, `dni`, `condicion_iva`) VALUES
(1, 'Ayelen', 'Boock', '27291657940', 'Consumidor Final', 'Vilcapugio 123', '2944579543', 'ayelenboock@gmail.com', '29165794', 'Consumidor Final');

-- --------------------------------------------------------
-- Estructura de tabla para la tabla `compania_envio`
--
CREATE TABLE `compania_envio` (
  `id_compania` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `direccion` varchar(255) DEFAULT NULL,
  `creado_en` timestamp DEFAULT current_timestamp(),
  `actualizado_en` timestamp DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------
-- Estructura de tabla para la tabla `detalles_pedidos`
--
CREATE TABLE `detalles_pedidos` (
  `id_detalle` int(11) NOT NULL,
  `id_pedido` int(11) NOT NULL,
  `id_producto` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL CHECK (`cantidad` > 0),
  `precio_unitario` decimal(10,2) NOT NULL CHECK (`precio_unitario` >= 0),
  `creado_en` timestamp DEFAULT current_timestamp(),
  `actualizado_en` timestamp DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------
-- Estructura de tabla para la tabla `empleados`
--
CREATE TABLE `empleados` (
  `id_empleado` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `fecha_de_nac` date NOT NULL,
  `fecha_de_ingreso` date NOT NULL,
  `dni` varchar(10) NOT NULL,
  `cuil` varchar(11) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `puesto` varchar(50) NOT NULL,
  `creado_en` timestamp DEFAULT current_timestamp(),
  `actualizado_en` timestamp DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------
-- Estructura de tabla para la tabla `pedidos`
--
CREATE TABLE `pedidos` (
  `id_pedido` int(11) NOT NULL,
  `id_cliente` int(11) NOT NULL,
  `id_empleado` int(11) NOT NULL,
  `id_compania` int(11) NOT NULL,
  `fecha` timestamp NOT NULL DEFAULT current_timestamp(),
  `total` decimal(10,2) NOT NULL DEFAULT 0.00 CHECK (`total` >= 0),
  `estado` enum('Pendiente','En preparacion','Despachado','Entregado','Cancelado') NOT NULL DEFAULT 'Pendiente',
  `creado_en` timestamp DEFAULT current_timestamp(),
  `actualizado_en` timestamp DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------
-- Estructura de tabla para la tabla `productos`
--
CREATE TABLE `productos` (
  `id_producto` int(11) NOT NULL,
  `id_proveedor` int(11) NOT NULL,
  `id_categoria` int(11) NOT NULL,
  `nombre_producto` varchar(150) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `precio` decimal(10,2) NOT NULL CHECK (`precio` >= 0),
  `stock` int(11) NOT NULL DEFAULT 0 CHECK (`stock` >= 0),
  `creado_en` timestamp DEFAULT current_timestamp(),
  `actualizado_en` timestamp DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------
-- Estructura de tabla para la tabla `proveedores`
--
CREATE TABLE `proveedores` (
  `id_proveedor` int(11) NOT NULL,
  `razon_social` varchar(150) NOT NULL,
  `nombre_contacto` varchar(100) DEFAULT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `direccion` varchar(255) DEFAULT NULL,
  `condicion_iva` enum('Responsable Inscripto','Monotributo','Exento') NOT NULL,
  `creado_en` timestamp DEFAULT current_timestamp(),
  `actualizado_en` timestamp DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- Índices y Auto-incrementos obligatorios
ALTER TABLE `categorias` ADD PRIMARY KEY (`id_categoria`), ADD UNIQUE KEY `nombre` (`nombre`);
ALTER TABLE `clientes` ADD PRIMARY KEY (`id_cliente`), ADD UNIQUE KEY `cuit` (`cuit`), ADD UNIQUE KEY `email` (`email`), ADD UNIQUE KEY `dni` (`dni`);
ALTER TABLE `compania_envio` ADD PRIMARY KEY (`id_compania`), ADD UNIQUE KEY `nombre` (`nombre`);
ALTER TABLE `detalles_pedidos` ADD PRIMARY KEY (`id_detalle`), ADD KEY `id_pedido` (`id_pedido`), ADD KEY `id_producto` (`id_producto`);
ALTER TABLE `empleados` ADD PRIMARY KEY (`id_empleado`), ADD UNIQUE KEY `dni` (`dni`), ADD UNIQUE KEY `cuil` (`cuil`), ADD UNIQUE KEY `email` (`email`);
ALTER TABLE `pedidos` ADD PRIMARY KEY (`id_pedido`), ADD KEY `id_cliente` (`id_cliente`), ADD KEY `id_empleado` (`id_empleado`), ADD KEY `id_compania` (`id_compania`);
ALTER TABLE `productos` ADD PRIMARY KEY (`id_producto`), ADD KEY `id_proveedor` (`id_proveedor`), ADD KEY `id_categoria` (`id_categoria`);
ALTER TABLE `proveedores` ADD PRIMARY KEY (`id_proveedor`), ADD UNIQUE KEY `razon_social` (`razon_social`), ADD UNIQUE KEY `email` (`email`);

ALTER TABLE `categorias` MODIFY `id_categoria` int(11) NOT NULL AUTO_INCREMENT;
ALTER TABLE `clientes` MODIFY `id_cliente` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
ALTER TABLE `compania_envio` MODIFY `id_compania` int(11) NOT NULL AUTO_INCREMENT;
ALTER TABLE `detalles_pedidos` MODIFY `id_detalle` int(11) NOT NULL AUTO_INCREMENT;
ALTER TABLE `empleados` MODIFY `id_empleado` int(11) NOT NULL AUTO_INCREMENT;
ALTER TABLE `pedidos` MODIFY `id_pedido` int(11) NOT NULL AUTO_INCREMENT;
ALTER TABLE `productos` MODIFY `id_producto` int(11) NOT NULL AUTO_INCREMENT;
ALTER TABLE `proveedores` MODIFY `id_proveedor` int(11) NOT NULL AUTO_INCREMENT;

-- Claves Foráneas
ALTER TABLE `detalles_pedidos` ADD CONSTRAINT `detalles_pedidos_ibfk_1` FOREIGN KEY (`id_pedido`) REFERENCES `pedidos` (`id_pedido`) ON DELETE CASCADE, ADD CONSTRAINT `detalles_pedidos_ibfk_2` FOREIGN KEY (`id_producto`) REFERENCES `productos` (`id_producto`);
ALTER TABLE `pedidos` ADD CONSTRAINT `pedidos_ibfk_1` FOREIGN KEY (`id_cliente`) REFERENCES `clientes` (`id_cliente`), ADD CONSTRAINT `pedidos_ibfk_2` FOREIGN KEY (`id_empleado`) REFERENCES `empleados` (`id_empleado`), ADD CONSTRAINT `pedidos_ibfk_3` FOREIGN KEY (`id_compania`) REFERENCES `compania_envio` (`id_compania`);
ALTER TABLE `productos` ADD CONSTRAINT `productos_ibfk_1` FOREIGN KEY (`id_proveedor`) REFERENCES `proveedores` (`id_proveedor`), ADD CONSTRAINT `productos_ibfk_2` FOREIGN KEY (`id_categoria`) REFERENCES `categorias` (`id_categoria`);
COMMIT;

