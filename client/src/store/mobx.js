import { createContext, useContext } from 'react';
import stores from '.';

const storeContext = createContext(null)

export const MobxStoreProvider = ({ store, children }) => {
  return <storeContext.Provider value={store}>{children}</storeContext.Provider>
}

export function useMobx() {
  const store = useContext(storeContext)
  if (!store) throw new Error('Store is not initialized!')
  return store
}

export const createStore = () => {
  const mobxStore = {}

  for (const storeKey in stores) {
    mobxStore[storeKey] = new stores[storeKey]()
  }

  return mobxStore
}
