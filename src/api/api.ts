import axios from 'axios';
import { Meter, Area } from '../types/types';

interface MetersResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Meter[];
}

interface AreasResponse {
  results: Area[];
}

const api = axios.create({
  baseURL: 'https://showroom.eis24.me/c300/api/v4/test',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

const areaCache = new Map<string, Area>();

export const getMeters = async (
  limit: number = 20,
  offset: number = 0
): Promise<MetersResponse> => {
  const response = await api.get<MetersResponse>('/meters/', {
    params: { limit, offset },
  });
  return response.data;
};

export const getAreasByIds = async (ids: string[]): Promise<Area[]> => {
  if (ids.length === 0) return [];

  const unknownIds = ids.filter((id) => !areaCache.has(id));

  if (unknownIds.length === 0) {
    return ids.map((id) => areaCache.get(id)!);
  }

  const response = await api.get<AreasResponse>('/areas/', {
    params: new URLSearchParams(unknownIds.map((id) => ['id__in', id])),
  });

  response.data.results.forEach((area) => {
    areaCache.set(area.id, area);
  });

  return ids.map((id) => areaCache.get(id)!);
};

export const deleteMeter = async (meterId: string): Promise<void> => {
  await api.delete(`/meters/${meterId}/`);
};
