CREATE DATABASE Biblioteca;
USE Biblioteca;

CREATE TABLE Autores (
    id_autor INT identity(1,1) PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    nacionalidad VARCHAR(50)
);

CREATE TABLE Categorias (
    id_categoria INT identity(1,1) PRIMARY KEY,
    nombre_categoria VARCHAR(50) NOT NULL
);

CREATE TABLE Libros (
    id_libro INT identity(1,1) PRIMARY KEY,
    titulo VARCHAR(150) NOT NULL,
    id_autor INT,
    id_categoria INT,
    isbn VARCHAR(20) UNIQUE,
    anio_publicacion INT,
    estado VARCHAR(20) DEFAULT 'Disponible' CHECK (estado IN ('Disponible', 'Rentado', 'En Mantenimiento')),
    FOREIGN KEY (id_autor) REFERENCES Autores(id_autor),
    FOREIGN KEY (id_categoria) REFERENCES Categorias(id_categoria)
);

CREATE TABLE Usuarios (
    id_usuario INT identity(1,1) PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(100) UNIQUE,
    telefono VARCHAR(15),
    fecha_registro DATE DEFAULT GETDATE()
);

CREATE TABLE Prestamos (
    id_prestamo INT identity(1,1) PRIMARY KEY,
    id_libro INT,
    id_usuario INT,
    fecha_salida DATETIME DEFAULT CURRENT_TIMESTAMP,
    fecha_devolucion_prevista DATE NOT NULL,
    fecha_devolucion_real DATETIME,
    estatus varchar(20) DEFAULT 'Activo' CHECK (estatus IN ('Activo', 'Devuelto', 'Vencido')),
    FOREIGN KEY (id_libro) REFERENCES Libros(id_libro),
    FOREIGN KEY (id_usuario) REFERENCES Usuarios(id_usuario)
);

INSERT INTO Autores (nombre, nacionalidad) VALUES 
('Gabriel García Márquez', 'Colombiana'),
('Isabel Allende', 'Chilena'),
('George Orwell', 'Británica'),
('J.K. Rowling', 'Británica'),
('Isaac Asimov', 'Estadounidense');

INSERT INTO Categorias (nombre_categoria) VALUES 
('Realismo Mágico'),
('Ciencia Ficción'),
('Fantasía'),
('Distopía'),
('Novela Histórica');

INSERT INTO Libros (titulo, id_autor, id_categoria, isbn, anio_publicacion, estado) VALUES 
('Cien años de soledad', 1, 1, '978-0307474728', 1967, 'Disponible'),
('1984', 3, 4, '978-0451524935', 1949, 'Rentado'),
('La casa de los espíritus', 2, 5, '978-1501117015', 1982, 'Disponible'),
('Harry Potter y la piedra filosofal', 4, 3, '978-8478884452', 1997, 'Rentado'),
('Fundación', 5, 2, '978-0553293357', 1951, 'Disponible');

INSERT INTO Usuarios (nombre, correo, telefono) VALUES 
('Carlos Martínez', 'carlos.mtz@email.com', '6561234567'),
('Lucía Fernández', 'lucia.f@email.com', '6567654321'),
('Roberto Gómez', 'roberto.g@email.com', '6569876543'),
('Ana Karen Silva', 'ana.silva@email.com', '6561112233'),
('Diego Pineda', 'diego.p@email.com', '6564445566');

INSERT INTO Prestamos (id_libro, id_usuario, fecha_devolucion_prevista, estatus) VALUES 
(2, 1, '2026-05-05', 'Activo'),   -- Carlos rentó 1984
(4, 3, '2026-05-10', 'Activo'),   -- Roberto rentó Harry Potter
(1, 2, '2026-04-20', 'Devuelto'), -- Lucía ya regresó Cien años de soledad
(3, 4, '2026-05-01', 'Activo'),   -- Ana tiene La casa de los espíritus
(5, 5, '2026-04-15', 'Vencido');  -- Diego tiene un préstamo retrasado