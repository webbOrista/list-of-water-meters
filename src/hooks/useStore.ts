import { useContext } from 'react';
import { RootStoreContext } from '../contexts/RootStoreContext';

export const useStore = () => {
  const store = useContext(RootStoreContext);
  if (!store) {
    throw new Error('Ошибка использования стора');
  }
  return store;
};
