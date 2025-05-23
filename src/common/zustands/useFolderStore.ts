import { create } from 'zustand';
import { type MenuFolder, type MenuItem } from '@/pages/home/HomePage';
import { useSelectedFolderStore } from './useSelectedFolderStore';

interface FolderState {
    folders: MenuFolder[];
    newFolderName: string;
    manageFolderName: string;
    setFolders: (folders: MenuFolder[]) => void;
    setNewFolderName: (name: string) => void;
    setManageFolderName: (name: string) => void;
    addFolder: () => void;
    addFolderWithName: (name: string) => void;
    deleteFolder: (folderId: string) => void;
    renameFolder: (folderId: string, newName: string) => void;
    handleFolderChange: (folderId: string) => void;
}

export const useFolderStore = create<FolderState>((set, get) => ({
    folders: [],
    newFolderName: '',
    manageFolderName: '',

    setFolders: (folders: MenuFolder[]) => set({ folders }),
    setNewFolderName: (name: string) => set({ newFolderName: name }),
    setManageFolderName: (name: string) => set({ manageFolderName: name }),

    addFolder: () => {
        const { folders, newFolderName } = get();
        if (newFolderName.trim()) {
            const newFolder: MenuFolder = {
                id: Date.now().toString(),
                name: newFolderName.trim(),
                menus: []
            };
            set({
                folders: [...folders, newFolder],
                newFolderName: ''
            });
            useSelectedFolderStore.getState().setSelectedFolder(newFolder);
        }
    },

    addFolderWithName: (name: string) => {
        const { folders } = get();
        if (name.trim()) {
            const newFolder: MenuFolder = {
                id: Date.now().toString(),
                name: name.trim(),
                menus: []
            };
            set({
                folders: [...folders, newFolder],
                manageFolderName: ''
            });
            useSelectedFolderStore.getState().setSelectedFolder(newFolder);
        }
    },

    deleteFolder: (folderId: string) => {
        const { folders } = get();
        const remainingFolders = folders.filter((folder: MenuFolder) => folder.id !== folderId);
        set({ folders: remainingFolders });

        if (remainingFolders.length === 0) {
            localStorage.removeItem('lunchRouletteFolders');
        }

        const selectedFolder = useSelectedFolderStore.getState().selectedFolder;
        if (selectedFolder?.id === folderId) {
            useSelectedFolderStore.getState().setSelectedFolder(remainingFolders[0] || null);
        }
    },

    renameFolder: (folderId: string, newName: string) => {
        const { folders } = get();
        const updatedFolders = folders.map((folder: MenuFolder) =>
            folder.id === folderId ? {...folder, name: newName} : folder
        );
        set({ folders: updatedFolders });

        const selectedFolder = useSelectedFolderStore.getState().selectedFolder;
        if (selectedFolder && selectedFolder.id === folderId) {
            useSelectedFolderStore.getState().setSelectedFolder({...selectedFolder, name: newName});
        }
    },

    handleFolderChange: (folderId: string) => {
        const { folders } = get();
        const folder = folders.find((f: MenuFolder) => f.id === folderId);
        useSelectedFolderStore.getState().setSelectedFolder(folder || null);
    }
}));