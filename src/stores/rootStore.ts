import { types, Instance } from 'mobx-state-tree';
import { MetersStore } from './metersStore';

export const RootStore = types.model('RootStore', {
  metersStore: types.optional(MetersStore, {}),
});

export type IRootStore = Instance<typeof RootStore>;

let rootStore: IRootStore;

export function initializeStore() {
  if (!rootStore) {
    rootStore = RootStore.create({
      metersStore: {},
    });
  }
  return rootStore;
}
