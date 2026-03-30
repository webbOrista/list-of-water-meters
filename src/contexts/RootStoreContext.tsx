import React, { createContext, ReactNode } from 'react';
import { initializeStore, IRootStore } from '../stores/rootStore';

export const RootStoreContext = createContext<IRootStore | null>(null);

interface RootStoreProviderProps {
  children: ReactNode;
}

export const RootStoreProvider: React.FC<RootStoreProviderProps> = ({
  children,
}) => {
  const store = initializeStore();

  return (
    <RootStoreContext.Provider value={store}>
      {children}
    </RootStoreContext.Provider>
  );
};
