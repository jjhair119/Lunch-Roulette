import {create} from "zustand";
import type {MenuFolder} from "@/pages/home/HomePage.tsx";

interface SelectedFolderStoreState {
    selectedFolder: MenuFolder | null;
    setSelectedFolder: (folder: MenuFolder | null) => void;
}

export const useSelectedFolderStore = create<SelectedFolderStoreState>(set => ({
    selectedFolder: null,
    setSelectedFolder: (folder: MenuFolder | null) => set({selectedFolder: folder}),
}));