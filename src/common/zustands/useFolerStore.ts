import {create} from "zustand/index";
import type {MenuFolder} from "@/pages/home/HomePage.tsx";

interface FolderStoreState {
    folders: MenuFolder[];
    setFolders: (newFolders: MenuFolder[]) => void;
}

export const useFolderStore = create<FolderStoreState>(set => ({
    folders: [] as MenuFolder[],
    setFolders: (newFolders: MenuFolder[]) => set({folders: newFolders}),
}));