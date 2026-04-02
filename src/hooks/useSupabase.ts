import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { Event, Place } from '../types';
import { localEvents } from '../data/events';
import { localPlaces } from '../data/places';

const USE_LOCAL_ONLY = import.meta.env.VITE_USE_LOCAL_DATA === 'true' || !import.meta.env.VITE_SUPABASE_URL;

export const useEvents = (day?: string) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        
        if (USE_LOCAL_ONLY) {
          let filtered = localEvents;
          if (day) {
            filtered = localEvents.filter(e => e.date === `2026-04-${day.padStart(2, '0')}`);
          }
          setEvents(filtered as any);
          return;
        }

        let query = supabase.from('events').select('*').order('start_time', { ascending: true });
        if (day) {
          query = query.eq('date', `2026-04-${day.padStart(2, '0')}`);
        }

        const { data, error } = await query;
        if (error) throw error;
        setEvents(data || []);
      } catch (err: any) {
        console.warn('Supabase fetch failed, falling back to local data:', err.message);
        let filtered = localEvents;
        if (day) {
          filtered = localEvents.filter(e => e.date === `2026-04-${day.padStart(2, '0')}`);
        }
        setEvents(filtered as any);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [day]);

  return { events, loading };
};

export const usePlaces = (type?: string) => {
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        if (USE_LOCAL_ONLY) {
          setPlaces(localPlaces as any);
          return;
        }

        let query = supabase.from('places').select('*').order('name');
        if (type) query = query.eq('type', type);
        
        const { data, error } = await query;
        if (error) throw error;
        setPlaces(data || []);
      } catch (err) {
        setPlaces(localPlaces as any);
      } finally {
        setLoading(false);
      }
    };
    fetchPlaces();
  }, [type]);

  return { places, loading };
};
