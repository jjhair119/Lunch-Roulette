import { create } from 'zustand';

interface UIState {
    alert: boolean;
    showFolderManagement: boolean;
    setAlert: (show: boolean) => void;
    setShowFolderManagement: (show: boolean) => void;
    onClickAlertClose: () => void;
}

export const useUIStore = create<UIState>((set) => ({
    alert: false,
    showFolderManagement: false,

    setAlert: (show) => set({ alert: show }),
    setShowFolderManagement: (show) => set({ showFolderManagement: show }),

    onClickAlertClose: () => {
        set({ alert: false });
        localStorage.setItem('lunchRouletteAlert', JSON.stringify(true));
    }
}));