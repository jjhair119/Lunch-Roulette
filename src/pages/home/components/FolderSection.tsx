import React from "react";
import styled from "styled-components";
import {useFolderStore} from "@/common/zustands/useFolderStore.ts";
import {useSelectedFolderStore} from "@/common/zustands/useSelectedFolderStore.ts";
import {useUIStore} from "@/common/zustands/useUIStore.ts";

export default function FolderSection() {
    const folders = useFolderStore(state => state.folders);
    const newFolderName = useFolderStore(state => state.newFolderName);
    const setNewFolderName = useFolderStore(state => state.setNewFolderName);
    const addFolder = useFolderStore(state => state.addFolder);
    const handleFolderChange = useFolderStore(state => state.handleFolderChange);

    const selectedFolder = useSelectedFolderStore(state => state.selectedFolder);
    const setShowFolderManagement = useUIStore(state => state.setShowFolderManagement);

    return <FolderSectionWrapper>
        <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", justifyItems:"center", marginBottom:"15px"}}>
            <div style={{ color: '#172554', fontWeight:'600', fontSize:"20px", userSelect:"none" }}>폴더</div>
            <FolderManageButton onClick={()=> setShowFolderManagement(true)}>폴더 관리</FolderManageButton>
        </div>
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
                onKeyUp={(e) => e.key === 'Enter' && addFolder()}
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
    box-shadow: 0 2px 8px rgba(23, 37, 84, 0.1);
    height: min-content;
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


const FolderManageButton = styled.button`
    padding: 10px;
    background-color: #60a5fa;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 14px;
    transition: background-color 0.2s;

    &:hover {
        background-color: #1d4ed8;
    }
`;
