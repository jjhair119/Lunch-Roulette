import { create } from 'zustand';
import { type MenuItem } from '@/pages/home/HomePage';
import { useSelectedFolderStore } from './useSelectedFolderStore';
import {useFolderStore} from "@/common/zustands/useFolderStore.ts";

interface MenuState {
    newMenuName: string;
    setNewMenuName: (name: string) => void;
    addMenu: () => void;
    deleteMenu: (menuId: string) => void;
    toggleMenuSelection: (menuId: string) => void;
    getSortedMenus: () => MenuItem[];
}

export const useMenuStore = create<MenuState>((set, get) => ({
    newMenuName: '',

    setNewMenuName: (name) => set({ newMenuName: name }),

    addMenu: () => {
        const { newMenuName } = get();
        const selectedFolder = useSelectedFolderStore.getState().selectedFolder;

        if (newMenuName.trim() && selectedFolder) {
            const newMenu: MenuItem = {
                id: Date.now().toString(),
                name: newMenuName.trim(),
                selected: true
            };

            const updatedFolder = {
                ...selectedFolder,
                menus: [...selectedFolder.menus, newMenu]
            };

            const folders = useFolderStore.getState().folders;
            useFolderStore.getState().setFolders(
                folders.map(folder => folder.id === selectedFolder.id ? updatedFolder : folder)
            );

            useSelectedFolderStore.getState().setSelectedFolder(updatedFolder);
            set({ newMenuName: '' });
        }
    },

    deleteMenu: (menuId) => {
        const selectedFolder = useSelectedFolderStore.getState().selectedFolder;

        if (selectedFolder) {
            const updatedFolder = {
                ...selectedFolder,
                menus: selectedFolder.menus.filter(menu => menu.id !== menuId)
            };

            const folders = useFolderStore.getState().folders;
            useFolderStore.getState().setFolders(
                folders.map(folder => folder.id === selectedFolder.id ? updatedFolder : folder)
            );

            useSelectedFolderStore.getState().setSelectedFolder(updatedFolder);
        }
    },

    toggleMenuSelection: (menuId) => {
        const selectedFolder = useSelectedFolderStore.getState().selectedFolder;

        if (selectedFolder) {
            const updatedFolder = {
                ...selectedFolder,
                menus: selectedFolder.menus.map(menu =>
                    menu.id === menuId ? {...menu, selected: !menu.selected} : menu
                )
            };

            const folders = useFolderStore.getState().folders;
            useFolderStore.getState().setFolders(
                folders.map(folder => folder.id === selectedFolder.id ? updatedFolder : folder)
            );

            useSelectedFolderStore.getState().setSelectedFolder(updatedFolder);
        }
    },

    getSortedMenus: () => {
        const selectedFolder = useSelectedFolderStore.getState().selectedFolder;
        if (!selectedFolder) return [];

        return [...selectedFolder.menus].sort((a, b) => a.name.localeCompare(b.name, 'ko'));
    }
}));