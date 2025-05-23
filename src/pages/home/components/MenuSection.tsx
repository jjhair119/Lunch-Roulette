import React from "react";
import styled from "styled-components";
import {type MenuFolder, type MenuItem} from "@/pages/home/HomePage.tsx";
import {useSelectedFolderStore} from "@/common/zustands/useSelectedFolderStore.ts";

export default function MenuSection(
    {
        newMenuName,
        setNewMenuName,
        addMenu,
        sortedMenus,
        toggleMenuSelection,
        deleteMenu,
        deleteFolder,
    }:{
        newMenuName:string,
        setNewMenuName:(name:string) => void,
        addMenu:() => void,
        sortedMenus:MenuItem[],
        toggleMenuSelection:(id:string) => void,
        deleteMenu:(id:string) => void,
        deleteFolder:(id:string) => void,
    }) {

    const selectedFolder = useSelectedFolderStore(state => state.selectedFolder);
    if (!selectedFolder) return null;

    return <MenuSectionWrapper>
        <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", justifyItems:"center", marginBottom:"15px"}}>
            <div style={{ color: '#172554', fontWeight:'600', fontSize:"20px", userSelect:"none", textAlign:"center"}}>
                "{selectedFolder.name}"의 메뉴
            </div>
            <FolderDeleteButton onClick={() => deleteFolder(selectedFolder.id)}>폴더 "{selectedFolder.name}" 삭제</FolderDeleteButton>
        </div>
        <MenuHeader>
            <MenuInput
                type="text"
                placeholder="새 메뉴 이름을 입력하세요"
                value={newMenuName}
                onChange={(e) => setNewMenuName(e.target.value)}
                onKeyUp={(e) => e.key === 'Enter' && addMenu()}
            />
            <Button onClick={addMenu} disabled={!newMenuName.trim()}>
                메뉴 추가
            </Button>
        </MenuHeader>

        <MenuList>
            {sortedMenus.map(menu => (
                <MenuItem
                    key={menu.id}
                    $isSelected={menu.selected}
                    onClick={() => toggleMenuSelection(menu.id)}
                >
                    <MenuCheckbox
                        type="checkbox"
                        checked={menu.selected}
                        onChange={(e) => {
                            e.stopPropagation();
                            toggleMenuSelection(menu.id);
                        }}
                    />
                    <MenuName $isSelected={menu.selected}>{menu.name}</MenuName>
                    <DeleteButton
                        onClick={(e) => {
                            e.stopPropagation();
                            deleteMenu(menu.id);
                        }}
                    >
                        삭제
                    </DeleteButton>
                </MenuItem>
            ))}
        </MenuList>
    </MenuSectionWrapper>
}

const Button = styled.button`
    padding: 10px 15px;
    background-color: #1d4ed8;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 14px;
    transition: background-color 0.2s;
    user-select: none;
    
    &:hover {
        background-color: #172554;
    }

    &:disabled {
        background-color: #bfdbfe;
        cursor: not-allowed;
    }
`;

const MenuSectionWrapper = styled.div`
    background: white;
    border-radius: 12px;
    padding: 20px;
    box-shadow: 0 2px 8px rgba(23, 37, 84, 0.1);

    height: min-content;
`;

const MenuHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
`;

const MenuInput = styled.input`
    flex: 1;
    padding: 10px;
    border: 2px solid #bfdbfe;
    border-radius: 6px;
    font-size: 14px;
    margin-right: 10px;
    &:focus {
        outline: none;
        border-color: #1d4ed8;
    
`;

const MenuList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    max-height: 200px;
    overflow-y: auto;

    padding: 4px;

    &::-webkit-scrollbar {
        width: 6px;
    }

    &::-webkit-scrollbar-track {
        background: #eff6ff;
        border-radius: 3px;
    }

    &::-webkit-scrollbar-thumb {
        background: #bfdbfe;
        border-radius: 3px;
    }

    &::-webkit-scrollbar-thumb:hover {
        background: #93c5fd;
    }
`;

const MenuItem = styled.div<{ $isSelected: boolean }>`
    display: flex;
    align-items: center;
    background: ${props => props.$isSelected ? '#eff6ff' : '#f8f9fa'};
    border-radius: 6px;
    border: 1px solid ${props => props.$isSelected ? '#bfdbfe' : '#e5e7eb'};
    transition: all 0.2s;
    padding: 10px;
    cursor: pointer;
`;

const MenuCheckbox = styled.input`
    margin-right: 10px;
    transform: scale(1.2);
`;

const MenuName = styled.span<{ $isSelected: boolean }>`
    color: ${props => props.$isSelected ? '#172554' : '#6b7280'};
    font-weight: ${props => props.$isSelected ? '500' : 'normal'};
    flex: 1;
`;

const DeleteButton = styled.button`
    background: #ef4444;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 5px 8px;
    cursor: pointer;
    font-size: 12px;
    user-select: none;

    &:hover {
        background: #dc2626;
    }
`;

const FolderDeleteButton = styled.button`
    padding: 8px;
    background-color: white;
    border: #ef4444 2px solid;
    color: #ef4444;
    border-radius: 6px;
    cursor: pointer;
    font-size: 14px;
    transition: background-color 0.2s;

    &:hover {
        background: #ef4444;
        color: white;
    }
`