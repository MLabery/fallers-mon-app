-- Seed data for Fallers pel Món Logroño 2026

-- Limpiar tablas
TRUNCATE events, places, itineraries, itinerary_events RESTART IDENTITY;

-- Insertar Lugares Clave
INSERT INTO places (name, description, type, latitude, longitude, address) VALUES
('Plaza del Ayuntamiento', 'Centro neurálgico de actos institucionales, Crida y Mascletás.', 'monument', 42.46671, -2.44555, 'Avenida de la Paz, Logroño'),
('Parking Valbuena', 'Recinto ferial donde se realizan las comidas populares, música, monumentos y la Cremà.', 'monument', 42.46944, -2.45055, 'Calle Valbuena, Logroño'),
('Parroquia Santiago El Real', 'Lugar de custodia de las imágenes y actos religiosos iniciales.', 'monument', 42.4678, -2.4485, 'Calle del Barriocepo, 8, Logroño'),
('Concatedral Santa Maria La Redonda', 'Punto de llegada de la Ofrenda Floral a la Virgen.', 'monument', 42.4658, -2.4448, 'Plaza del Mercado, Logroño');

-- Insertar Actos (Events)
INSERT INTO events (title, description, date, start_time, location_name, latitude, longitude, category, highlight) VALUES
-- Viernes 10 Abr
('Recepción y Concurso DAMEL', 'Recorpción a los colegios de Logroño con entrega de mochilas y chuchos.', '2026-04-10', '18:30:00', 'Colegio Pelayo', 42.465, -2.447, 'Otros', false),
('Entrega de la Virgen', 'Traslado de la imagen de la Virgen al Santiago El Real.', '2026-04-10', '19:30:00', 'Parroquia Santiago El Real', 42.4678, -2.4485, 'Religioso', false),

-- Sábado 11 Abr
('Mascletá ensordecedora', 'Gran espectáculo sonoro de pólvora en el centro de la ciudad.', '2026-04-11', '13:30:00', 'Plaza del Ayuntamiento', 42.46671, -2.44555, 'Pólvora', true),
('La Crida al Balcón', 'Llamamiento oficial a la fiesta desde el balcón del Ayuntamiento.', '2026-04-11', '14:00:00', 'Plaza del Ayuntamiento', 42.46671, -2.44555, 'Otros', true),
('Ofrenda a la Virgen', 'Desfile floral hacia la Concatedral de Santa María La Redonda.', '2026-04-11', '18:00:00', 'Concatedral Santa Maria La Redonda', 42.4658, -2.4448, 'Religioso', true),
('Concurso de Paellas', 'Competición de paellas valencianas seguida de cena de hermandad.', '2026-04-11', '19:00:00', 'Parking Valbuena', 42.46944, -2.45055, 'Gastronomía', false),

-- Domingo 12 Abr
('Despertà y Desfile', 'Comienzo de la jornada con música y desfile de Moros y Cristianos.', '2026-04-12', '09:00:00', 'Plaza del Ayuntamiento', 42.46671, -2.44555, 'Otros', false),
('Degustaciones Típicas', 'Reparto gratuito de Horchata y Pólvora Líquida (Cazalla).', '2026-04-12', '11:00:00', 'Parking Valbuena', 42.46944, -2.45055, 'Gastronomía', false),
('Paella Gigante y Agua de Valencia', 'Elaboración de comida multitudinaria y 1.300L de bebida típica.', '2026-04-12', '18:00:00', 'Parking Valbuena', 42.46944, -2.45055, 'Gastronomía', true),
('Espectáculos Finales', 'Actuaciones de humor seguidas de música en directo.', '2026-04-12', '19:00:00', 'Parking Valbuena', 42.46944, -2.45055, 'Otros', false),
('La Cremà de las Fallas', 'Acto culminante donde el fuego consume las fallas, despidiendo el evento.', '2026-04-12', '22:00:00', 'Parking Valbuena', 42.46944, -2.45055, 'Fuego', true),

-- Lunes 13 Abr
('Recogida y Regreso', 'Recogida en los hoteles para el viaje de vuelta de la delegación fallera.', '2026-04-13', '09:00:00', 'Hoteles Logroño', 42.466, -2.445, 'Otros', false);

-- Insertar Itinerarios (Rutas)
INSERT INTO itineraries (title, description, duration, image_url) VALUES
('Ruta de la Pólvora', 'Los actos más intensos y ruidosos para sentir el espíritu fallero.', '4h', 'https://images.unsplash.com/photo-1498931299472-f7a63a5a1cfa'),
('Ruta Gastronómica', 'Sabor valenciano en el corazón de La Rioja.', '6h', 'https://images.unsplash.com/photo-1512058560566-d824d2894607');
