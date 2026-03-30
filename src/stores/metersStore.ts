import { types, flow, cast, getSnapshot } from 'mobx-state-tree';
import { Meter, Area, MeterWithArea } from '../types/types';
import {
  getMeters,
  getAreasByIds,
  deleteMeter as deleteMeterApi,
} from '../api/api';

const AreaModel = types.model('Area', {
  id: types.string,
  str_number_full: types.string,
  house: types.model({
    address: types.string,
  }),
});

const MeterModel = types.model('Meter', {
  id: types.string,
  description: types.string,
  initial_values: types.array(types.number),
  installation_date: types.maybeNull(types.string),
  is_automatic: types.maybeNull(types.boolean),
  _type: types.array(types.string),
  area: types.maybe(AreaModel),
});

export const MetersStore = types
  .model('MetersStore', {
    meters: types.array(MeterModel),
    areasCache: types.map(AreaModel),
    loading: types.optional(types.boolean, false),
    loadingAreas: types.optional(types.boolean, false),
    error: types.maybeNull(types.string),
    totalCount: types.optional(types.number, 0),
    currentPage: types.optional(types.number, 1),
    itemsPerPage: types.optional(types.number, 20),
  })
  .actions((self) => {
    const setError = (error: string | null) => {
      self.error = error;
    };
    const setLoading = (v: boolean) => {
      self.loading = v;
    };
    const setLoadingAreas = (v: boolean) => {
      self.loadingAreas = v;
    };

    const loadAreasForMeters = flow(function* (meters: Meter[]) {
      const uniqueAreaIds = Array.from(new Set(meters.map((m) => m.area.id)));
      const missingIds = uniqueAreaIds.filter((id) => !self.areasCache.has(id));

      if (missingIds.length === 0) return;

      setLoadingAreas(true);
      try {
        const areas: Area[] = yield getAreasByIds(missingIds);
        areas.forEach((area: Area) => {
          self.areasCache.set(area.id, area);
        });
      } catch (e) {
        console.error('Failed to load areas:', e);
      } finally {
        setLoadingAreas(false);
      }
    });

    const fetchMeters = flow(function* (page: number) {
      setLoading(true);
      setError(null);

      try {
        const offset = (page - 1) * self.itemsPerPage;
        const response = yield getMeters(self.itemsPerPage, offset);

        yield loadAreasForMeters(response.results);

        const preparedMeters = response.results.map((m: Meter) => {
          const areaFromCache = self.areasCache.get(m.area.id);

          return {
            id: m.id,
            description: m.description,
            initial_values: m.initial_values,
            installation_date: m.installation_date,
            is_automatic: m.is_automatic,
            _type: m._type,
            area: areaFromCache ? getSnapshot(areaFromCache) : undefined,
          };
        });

        self.meters = cast(preparedMeters);
        self.totalCount = response.count;
        self.currentPage = page;
      } catch (e) {
        console.error('Fetch error:', e);
        setError('Ошибка загрузки');
      } finally {
        setLoading(false);
      }
    });

    const deleteMeterAction = flow(function* (meterId: string) {
      try {
        yield deleteMeterApi(meterId);

        const index = self.meters.findIndex((m) => m.id === meterId);
        if (index !== -1) {
          self.meters.splice(index, 1);
        }
      } catch (e) {
        console.error('Delete error:', e);
        setError('Ошибка удаления');
      }
    });

    return {
      fetchMeters,
      deleteMeter: deleteMeterAction,
      changePage(page: number) {
        if (
          page >= 1 &&
          page <= Math.ceil(self.totalCount / self.itemsPerPage)
        ) {
          fetchMeters(page);
        }
      },
    };
  })
  .views((self) => ({
    get totalPages() {
      return Math.ceil(self.totalCount / self.itemsPerPage);
    },

    get transformedData(): MeterWithArea[] {
      return self.meters.map((meter) => ({
        id: meter.id,
        description: meter.description,
        initial_values: meter.initial_values.slice(),
        installation_date: meter.installation_date,
        is_automatic: meter.is_automatic,
        _type: meter._type.slice(),
        area: meter.area
          ? {
              str_number_full: meter.area.str_number_full,
              house: { address: meter.area.house.address },
            }
          : { str_number_full: 'Загрузка...', house: { address: '' } },
      }));
    },
    get loadingState() {
      return self.loading;
    },
    get errorState() {
      return self.error;
    },
    get currentPageState() {
      return self.currentPage;
    },
    get loadingAreasState() {
      return self.loadingAreas;
    },
  }));
