import { useState, useEffect } from 'react';
import { apiFetch } from '../services/api';

export function useFetch<T>(ruta: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let activo = true;

    const cargar = async () => {
      try {
        setLoading(true);
        setError(null);

        const resultado = await apiFetch<T>(ruta);
        if (activo) {
          setData(resultado);
        }
      } catch (e) {
        if (activo) {
          setError(e instanceof Error ? e.message : 'Error desconocido');
        }
      } finally {
        if (activo) {
          setLoading(false);
        }
      }
    };

    cargar();

    return () => {
      activo = false;
    };
  }, [ruta]);

  return { data, loading, error };
}