import { useEffect, useState, useCallback } from 'react';
import { getMeters, getAreasByIds } from '../api/api';
import { Meter, Area, MeterWithArea } from '../types/types';

export const useMetersData = () => {
  const [meters, setMeters] = useState<Meter[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [loadingAreas, setLoadingAreas] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [areasCache, setAreasCache] = useState<Map<string, Area>>(new Map());

  const transformMeterWithArea = useCallback(
    (meter: Meter, area?: Area): MeterWithArea => {
      const defaultArea = {
        str_number_full: '',
        house: {
          address: '',
        },
      };

      return {
        id: meter.id,
        description: meter.description,
        initial_values: meter.initial_values,
        installation_date: meter.installation_date || null,
        is_automatic: meter.is_automatic || null,
        _type: meter._type,
        area: area
          ? {
              str_number_full: area.str_number_full,
              house: {
                address: area.house.address,
              },
            }
          : defaultArea,
      };
    },
    []
  );

  const loadAreasForMeters = useCallback(
    async (metersList: Meter[]) => {
      const uniqueAreaIds = Array.from(
        new Set(metersList.map((m) => m.area.id))
      );
      const missingIds = uniqueAreaIds.filter((id) => !areasCache.has(id));

      if (missingIds.length === 0) return;

      setLoadingAreas(true);
      try {
        const areas = await getAreasByIds(missingIds);
        setAreasCache((prev) => {
          const newCache = new Map(prev);
          areas.forEach((area) => newCache.set(area.id, area));
          return newCache;
        });
      } catch (err) {
        console.error('Ошибка загрузки');
      } finally {
        setLoadingAreas(false);
      }
    },
    [areasCache]
  );

  const fetchMeters = useCallback(
    async (page: number) => {
      setLoading(true);
      setError(null);

      try {
        const offset = (page - 1) * 20;
        const response = await getMeters(20, offset);

        setMeters(response.results);
        setTotalCount(response.count);
        setCurrentPage(page);

        await loadAreasForMeters(response.results);
      } catch (err) {
        setError('Ошибка загрузки');
      } finally {
        setLoading(false);
      }
    },
    [loadAreasForMeters]
  );

  const changePage = useCallback(
    (page: number) => {
      if (page >= 1 && page <= Math.ceil(totalCount / 20)) {
        fetchMeters(page);
      }
    },
    [totalCount, fetchMeters]
  );

  const transformedData = meters.map((meter) => {
    const area = areasCache.get(meter.area.id);
    return transformMeterWithArea(meter, area);
  });

  useEffect(() => {
    fetchMeters(1);
  }, []);

  return {
    data: transformedData,
    loading,
    loadingAreas,
    error,
    totalCount,
    currentPage,
    totalPages: Math.ceil(totalCount / 20),
    changePage,
    refresh: () => fetchMeters(currentPage),
  };
};
