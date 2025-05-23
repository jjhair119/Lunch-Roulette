import { create } from 'zustand';
import {useSelectedFolderStore} from "@/common/zustands/useSelectedFolderStore.ts";

interface RouletteState {
    mustSpin: boolean;
    prizeNumber: number;
    result: string;
    setMustSpin: (spin: boolean) => void;
    setPrizeNumber: (num: number) => void;
    setResult: (result: string) => void;
    getColor: (index: number) => string;
    getTextColor: (index: number) => string;
    getRouletteData: () => Array<{option: string, style: {backgroundColor: string, textColor: string}}>;
    handleSpinClick: () => void;
    handleStopSpinning: () => void;
}

export const useRouletteStore = create<RouletteState>((set, get) => ({
    mustSpin: false,
    prizeNumber: 0,
    result: '',

    setMustSpin: (spin) => set({ mustSpin: spin }),
    setPrizeNumber: (num) => set({ prizeNumber: num }),
    setResult: (result) => set({ result }),

    getColor: (index) => {
        const colors = ['#bfdbfe', '#93c5fd', '#60a5fa', '#3b82f6', '#1d4ed8', '#1e3a8a'];
        return colors[index % colors.length];
    },

    getTextColor: (index) => {
        return index % 6 < 3 ? '#172554' : 'white';
    },

    getRouletteData: () => {
        const selectedFolder = useSelectedFolderStore.getState().selectedFolder;
        if (!selectedFolder) return [];

        const { getColor, getTextColor } = get();
        const selectedMenus = selectedFolder.menus.filter(menu => menu.selected);

        return selectedMenus.map((menu, index) => ({
            option: menu.name,
            style: {
                backgroundColor: getColor(index),
                textColor: getTextColor(index),
            }
        }));
    },

    handleSpinClick: () => {
        const rouletteData = get().getRouletteData();
        if (rouletteData.length === 0) return;

        const newPrizeNumber = Math.floor(Math.random() * rouletteData.length);
        set({
            prizeNumber: newPrizeNumber,
            mustSpin: true
        });
    },

    handleStopSpinning: () => {
        const { prizeNumber, getRouletteData } = get();
        const rouletteData = getRouletteData();

        set({
            mustSpin: false,
            result: rouletteData[prizeNumber].option
        });
    }
}));