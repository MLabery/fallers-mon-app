export type EventCategory = 'Pólvora' | 'Gastronomía' | 'Religioso' | 'Fuego' | 'Oficial' | 'Tradición' | 'Música' | 'Desfile' | 'Social' | 'Ocio' | 'Otros';

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  start_time: string;
  end_time?: string;
  location_name: string;
  latitude: number;
  longitude: number;
  pinX?: number;
  pinY?: number;
  category: EventCategory;
  highlight: boolean;
  image_url?: string;
}

export interface Place {
  id: string;
  name: string;
  description: string;
  type: 'restaurant' | 'bar' | 'ruta' | 'monument';
  latitude: number;
  longitude: number;
  image_url?: string;
  address?: string;
  rating?: number;
}

export interface Itinerary {
  id: string;
  title: string;
  description: string;
  duration: string;
  image_url?: string;
  events?: Event[];
}
