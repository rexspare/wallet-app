import { create } from 'zustand';
import { createSelectors } from './common';


/**
 * State Structure
 */
export interface IWallet {
    // State values
    coinList: any[];
    setCoinList: (val: any) => void;
    coinBalanceList: any[];
    setCoinBalanceList: (val: any) => void;
    selectedWalletCoin: any;
    setSelectedWalletCoin: (val: any) => void;

}

const initialState: IWallet = {
    coinList: [],
    setCoinList: () => { },
    coinBalanceList: [],
    setCoinBalanceList: () => { },
    selectedWalletCoin: {},
    setSelectedWalletCoin: () => { },
};

/**
 * State hook definition
 */
export const useWallet = create<IWallet>((set, get) => ({
    ...initialState,
    setSelectedWalletCoin: val => set({ selectedWalletCoin: val }),
    setCoinList: val => set({ coinList: val }),
    setCoinBalanceList: val => set({ coinBalanceList: val }),
}));

/**
 * Selectors
 */
export const walletStateSelectors = createSelectors(initialState);
