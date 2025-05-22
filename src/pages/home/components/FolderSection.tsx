import React from "react";
import styled from "styled-components";
import type {MenuFolder} from "@/pages/home/HomePage.tsx";

export default function FolderSection(
    {
        selectedFolder,
        newFolderName,
        setNewFolderName,
        folders,
        setSelectedFolder,
        addFolder,
        deleteFolder,
        handleFolderChange
    }: {
        selectedFolder: MenuFolder | null;
        newFolderName: string;
        setNewFolderName: (name: string) => void;
        folders: MenuFolder[];
        setSelectedFolder: (folder: MenuFolder) => void;
        addFolder: () => void;
        deleteFolder: (id: string) => void;
        handleFolderChange: (id: string) => void;

    }) {

    return <FolderSectionWrapper>
        <div style={{ color: '#172554', marginBottom: '15px', fontWeight:'600', fontSize:"20px", userSelect:"none" }}>폴더</div>
        <FolderSelectContainer>
            <FolderSelect
                value={selectedFolder?.id || ''}
                onChange={(e) => handleFolderChange(e.target.value)}
            >
                <option value="">폴더를 선택하세요</option>
                {folders.map(folder => (
                    <option key={folder.id} value={folder.id}>
                        {folder.name} ({folder.menus.length}개 메뉴)
                    </option>
                ))}
            </FolderSelect>
        </FolderSelectContainer>
        <FolderInputWrapper>
            <FolderInput
                type="text"
                placeholder="새 폴더 이름을 입력하세요"
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addFolder()}
            />
            <Button onClick={addFolder} disabled={!newFolderName.trim()}>
                폴더 추가
            </Button>
        </FolderInputWrapper>
    </FolderSectionWrapper>
}

const FolderSectionWrapper = styled.div`
    background: white;
    border-radius: 12px;
    padding: 20px;
    margin-bottom: 20px;
    box-shadow: 0 2px 8px rgba(23, 37, 84, 0.1);
    height: min-content;

    width: 100%;
`;

const FolderSelectContainer = styled.div`
    margin-bottom: 15px;
`;

const FolderSelect = styled.select`
    width: 100%;
    padding: 12px;
    border: 2px solid #bfdbfe;
    border-radius: 6px;
    font-size: 16px;
    background-color: white;
    color: #172554;

    &:focus {
        outline: none;
        border-color: #1d4ed8;
    }
`;

const FolderInputWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    user-select: none;
`;

const FolderInput = styled.input`
    flex: 1;
    padding: 10px;
    border: 2px solid #bfdbfe;
    border-radius: 6px;
    font-size: 14px;

    &:focus {
        outline: none;
        border-color: #1d4ed8;
    }
`;

const Button = styled.button`
    padding: 10px 15px;
    background-color: #1d4ed8;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 14px;
    transition: background-color 0.2s;

    &:hover {
        background-color: #172554;
    }

    &:disabled {
        background-color: #bfdbfe;
        cursor: not-allowed;
    }
`;

const FolderList = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 15px;
    margin-top: 20px;
`;

const FolderCard = styled.div<{ isSelected: boolean }>`
    background: ${props => props.isSelected ? '#bfdbfe' : 'white'};
    border: 2px solid ${props => props.isSelected ? '#1d4ed8' : '#bfdbfe'};
    border-radius: 8px;
    padding: 15px;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
        border-color: #1d4ed8;
        transform: translateY(-2px);
    }
`;

const FolderName = styled.h3`
    color: #172554;
    margin: 0 0 10px 0;
    font-size: 16px;
    display: flex;
    align-items: center;
    gap: 8px;
`;

const MenuCount = styled.p`
    color: #1d4ed8;
    margin: 0;
    font-size: 14px;
`;

const DeleteButton = styled.button`
    background: #ef4444;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 5px 8px;
    cursor: pointer;
    font-size: 12px;

    &:hover {
        background: #dc2626;
    }
`;