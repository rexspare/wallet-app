import { create } from 'zustand'
import { createSelectors } from './common';
import { setItem } from '../services/asyncStorage';
import { ASYNC_KEYS } from '../assets/constants';

/**
 * State Structure
 */
export interface IAppState {
  // State values
  isAuthenticated: boolean;
  user: any;
  setAuthenticated: (status: boolean, accessToken?: any) => void;
  setUser: (item: any) => void;
  token: any;
  isLoaderVisible: boolean;
  toggleLoader: (val: boolean) => void;
  notifications: any[];
  setNotifications: (val: any) => void;
}

const initialState: IAppState = {
  user: {},
  isAuthenticated: false,
  setAuthenticated: () => { },
  setUser: () => { },
  token: {},
  isLoaderVisible: false,
  toggleLoader: () => { },
  notifications: [],
  setNotifications: () => { }
};

/**
 * State hook definition
 */
export const useApp = create<IAppState>((set, get) => ({
  ...initialState,
  setAuthenticated: (status, token) =>
    set({ isAuthenticated: status, token: token ?? {} }),
  setUser: async (item) => {
    set({ user: item })
    try {
      await setItem(ASYNC_KEYS.USER, item)
    } catch (error) { }
  },
  toggleLoader: (val: boolean) => set({ isLoaderVisible: val }),
  setNotifications: (val: any) => set({ notifications: val }),
}));

/**
 * Selectors
 */
export const appStateSelectors = createSelectors(initialState);
