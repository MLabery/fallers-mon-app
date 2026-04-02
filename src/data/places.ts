export const localPlaces = [
  // Fallas
  { id: 'f1', name: 'Falla Mayor Logroño', detail: 'Monumento Central', type: 'falla', lat: 42.4694, lng: -2.4505, pinX: 22, pinY: 52, image: '/falla_monument_img.png' },
  { id: 'f2', name: 'Falla Infantil', detail: 'Monumento Infantil', type: 'falla', lat: 42.4663, lng: -2.4394, pinX: 25, pinY: 55, image: '/falla_monument_img.png' },
  
  // Monumentos / Iglesias
  { id: 'm1', name: 'Concatedral La Redonda', detail: 'Punto Ofrenda', type: 'church', lat: 42.4666, lng: -2.4459, pinX: 36, pinY: 40, image: '/la_redonda.png' },
  { id: 'm2', name: 'Parroquia Santiago El Real', detail: 'Iglesia Histórica', type: 'church', lat: 42.4678, lng: -2.4485, pinX: 28, pinY: 35, image: '/iglesia_santiago.png' },
  { id: 'm3', name: 'Ayuntamiento', detail: 'Sede Crida', type: 'monument', lat: 42.4663, lng: -2.4394, pinX: 70, pinY: 68, image: '/plaza_ayuntamiento.png' },
  { id: 'm4', name: 'San Bartolomé', detail: 'Iglesia Histórica', type: 'church', lat: 42.465, lng: -2.447, pinX: 58, pinY: 35, image: 'https://images.unsplash.com/photo-1548588627-f978501006a9' },
  
  // Gastronomía (Bares y Restaurantes)
  { id: 'g1', name: 'Bar Soriano (El Champi)', detail: 'Especialidad Champiñón', type: 'bar', lat: 42.4648, lng: -2.4442, pinX: 39, pinY: 57, image: '/champi_soriano.png' },
  { id: 'g6', name: 'Bar Blanco y Negro', detail: 'Tapa El Matrimonio', type: 'bar', lat: 42.4647, lng: -2.4443, pinX: 40, pinY: 58, image: '/blanco_negro_laurel.png' },
  { id: 'g3', name: 'Café Moderno', detail: 'Desayunos Históricos', type: 'gastro', lat: 42.4655, lng: -2.4450, pinX: 48, pinY: 45, image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb' },
  { id: 'g4', name: 'Calle Laurel', detail: 'Zona de Tapas y Vinos', type: 'bar', lat: 42.4652, lng: -2.4460, pinX: 38, pinY: 56, image: '/calle_laurel.png' },
  { id: 'g5', name: 'Calle San Juan', detail: 'Bares y Pinchos Típicos', type: 'bar', lat: 42.4657, lng: -2.4467, pinX: 37, pinY: 55, image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5' },
  
  // Epicentro del Evento
  { id: 'ev1', name: 'Parking Valbuena (Carpa)', detail: 'Epicentro Fallers pel Món', type: 'epicentro', lat: 42.46944, lng: -2.45055, pinX: 14, pinY: 48, image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=2070' },
  
  // Hoteles
  { id: 'h1', name: 'Hotel NH Logroño', detail: 'Hotel ****', type: 'hotel', lat: 42.4620, lng: -2.4400, pinX: 85, pinY: 80, image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945' },
  
  // Otros puntos clave del mapa
  { id: 'm5', name: 'Mercado de San Blas', detail: 'Mercado Central', type: 'monument', lat: 42.465, lng: -2.445, pinX: 60, pinY: 54, image: 'https://images.unsplash.com/photo-1533900298318-6b8da08a523e' },
  { id: 'm6', name: 'Teatro Bretón', detail: 'Teatro Histórico', type: 'monument', lat: 42.465, lng: -2.445, pinX: 78, pinY: 46, image: 'https://images.unsplash.com/photo-1503095396549-807a8bc3667c' },
  { id: 'm7', name: 'Puente de Piedra', detail: 'Puente sobre el Ebro', type: 'monument', lat: 42.465, lng: -2.445, pinX: 47, pinY: 18, image: 'https://images.unsplash.com/photo-1512100356132-83b160a22165' },
  { id: 'm8', name: 'Bodegas Franco-Españolas', detail: 'Bodegas Urbanas', type: 'bar', lat: 42.465, lng: -2.445, pinX: 82, pinY: 22, image: '/bodega_franco_logrono.png' },
  { id: 'm9', name: 'Calado de San Gregorio', detail: 'Calado Medieval', type: 'monument', lat: 42.467, lng: -2.447, pinX: 43, pinY: 28, image: '/calado_san_gregorio.png' }
];
