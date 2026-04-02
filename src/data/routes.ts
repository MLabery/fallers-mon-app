export interface RouteStop {
  name: string;
  time: string;
  desc: string;
  img?: string;
}

export interface AppRoute {
  id: number;
  title: string;
  duration: string;
  places: number;
  color: string;
  image: string;
  description: string;
  stops: RouteStop[];
}

export const localRoutes: AppRoute[] = [
  { 
    id: 1, 
    title: 'Ruta de la Pólvora', 
    duration: '4h', 
    places: 3, 
    color: 'bg-[#BF360C]', 
    image: 'https://images.unsplash.com/photo-1498931299472-f7a63a5a1cfa',
    description: 'Recorre los puntos críticos donde la pirotecnia y el fuego son los protagonistas absolutos. Vive la intensidad de las Fallas en primer plano.',
    stops: [
      { name: 'Ayuntamiento de Logroño', time: '13:00', desc: 'Lugar de la Gran Mascletá diaria. Olor a pólvora asegurado.', img: '/plaza_ayuntamiento.png' },
      { name: 'Plaza del Mercado', time: '14:30', desc: 'Traca tradicional y castillos de fuegos artificiales de día.', img: '/plaza_mercado.png' },
      { name: 'Parking Valbuena', time: '22:00', desc: 'Zona cero de la Cremà. Aquí arderá el monumento principal.', img: '/parking_valbuena.png' }
    ]
  },
  { 
    id: 2, 
    title: 'Sabor de Valencia en Logroño', 
    duration: '6h', 
    places: 4, 
    color: 'bg-[#0E4E64]', 
    image: '/banner_sabor_valencia.png',
    description: 'Un viaje gastronómico que combina la tradición valenciana de la paella a leña con los famosos pinchos y vinos de La Rioja.',
    stops: [
      { name: 'Calle del Laurel', time: '13:00', desc: 'Ruta de pinchos típicos riojanos para abrir el apetito.', img: '/calle_laurel.png' },
      { name: 'Parking Valbuena', time: '14:30', desc: 'Degustación de Paella Gigante Valenciana a leña.', img: '/parking_valbuena.png' },
      { name: 'Café Moderno', time: '17:00', desc: 'Sobremesa con buñuelos de calabaza y chocolate artesano.', img: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb' },
      { name: 'Plaza San Bartolomé', time: '19:00', desc: 'Reparto de Agua de Valencia con música en directo.', img: '/calle_bartolome_logrono.png' }
    ]
  },
  { 
    id: 3, 
    title: 'Ruta de Pinchos (Calle Laurel)', 
    duration: '2h', 
    places: 5, 
    color: 'bg-[#E64A19]', 
    image: '/banner_ruta_pinchos.png',
    description: 'La esencia de Logroño en un solo lugar. Recorre la Calle Laurel y descubre por qué es famosa en todo el mundo.',
    stops: [
      { name: 'El Champi', time: '13:00', desc: 'El mítico champiñón de la Laurel. Un inicio obligado.', img: '/champi_soriano.png' },
      { name: 'La Tavina', time: '13:30', desc: 'Sabor riojano con un toque moderno y gran selección de vinos.', img: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3' },
      { name: 'Bar Blanco y Negro', time: '14:00', desc: 'El matrimonio más famoso de la ciudad: boquerón y anchoa.', img: '/blanco_negro_laurel.png' }
    ]
  },
  { 
    id: 4, 
    title: 'Ruta del Vino 🍷', 
    duration: '3h', 
    places: 3, 
    color: 'bg-[#6B1B1B]', 
    image: '/bodega_franco_logrono.png',
    description: 'Descubre el alma de La Rioja a través de su vino en el corazón de Logroño.',
    stops: [
      { name: 'Bodegas Franco-Españolas', time: '11:00', desc: 'Visita guiada por una bodega histórica al borde del Ebro.', img: '/bodega_franco_logrono.png' },
      { name: 'Calado de San Gregorio', time: '12:30', desc: 'Cata de vinos en un calado medieval restaurado.', img: '/calado_san_gregorio.png' }
    ]
  },
  { 
    id: 5, 
    title: 'Ruta Cultural Logroñesa', 
    duration: '4h', 
    places: 4, 
    color: 'bg-[#5D4037]', 
    image: '/banner_ruta_cultural.png',
    description: 'Historia, arquitectura y religiosidad en el casco antiguo de la capital riojana.',
    stops: [
      { name: 'Concatedral de La Redonda', time: '10:00', desc: 'Admira sus torres gemelas y el cuadro del Calvario de Miguel Ángel.', img: '/la_redonda.png' },
      { name: 'Iglesia de Santiago', time: '11:30', desc: 'Punto clave en el Camino de Santiago con su imponente retablo.', img: '/iglesia_santiago.png' },
      { name: 'Puente de Piedra', time: '13:00', desc: 'La entrada histórica de los peregrinos a la ciudad sobre el río Ebro.', img: '/puente_piedra.png' }
    ]
  },
];
