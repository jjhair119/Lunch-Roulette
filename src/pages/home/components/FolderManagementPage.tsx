import styled from "styled-components";
import type {MenuFolder} from "@/pages/home/HomePage.tsx";
import React, {useState} from "react";

export default function FolderManagementPage(
    {
        folders,
        deleteFolder,
        addFolderWithName,
        setShowFolderManagement,
        manageFolderName,
        setManageFolderName,
    }: {
        folders: MenuFolder[];
        addFolderWithName: (name: string) => void;
        deleteFolder: (folderId: string) => void;
        setShowFolderManagement: (show: boolean) => void;
        manageFolderName: string;
        setManageFolderName: (name: string) => void;
    }
) {

    return <Container>
        <Background/>
        <Wrapper>
            <Header>
                📁 폴더 관리
                <CloseButton onClick={() => setShowFolderManagement(false)}>X</CloseButton>
            </Header>
            <CautionText>
                ⚠️ 폴더를 삭제하면 해당 폴더에 속한 모든 메뉴가 삭제됩니다!
            </CautionText>
            <FolderList>
                {folders.map(folder => (
                    <FolderCard key={folder.id} isSelected={false}>
                        <FolderName>
                            <span>{folder.name}</span>
                            <MenuCount>({folder.menus.length}개 메뉴)</MenuCount>
                        </FolderName>
                        <DeleteButton onClick={() => deleteFolder(folder.id)}>삭제</DeleteButton>
                    </FolderCard>
                ))}
            </FolderList>
            <FolderInputWrapper>
                <FolderInput
                    type="text"
                    placeholder="새 폴더 이름을 입력하세요"
                    value={manageFolderName}
                    onChange={(e) => setManageFolderName(e.target.value)}
                    onKeyUp={(e) => e.key === 'Enter' && addFolderWithName(manageFolderName)}
                />
                <Button onClick={() => addFolderWithName(manageFolderName)} disabled={!manageFolderName.trim()}>
                    폴더 추가
                </Button>
            </FolderInputWrapper>
        </Wrapper>
    </Container>
}

const Container = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 30px;
    background: white;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(23, 37, 84, 0.1);
    height: 60%;
    width: 500px;
    z-index: 1;
    gap: 16px;
`;

const Header = styled.div`
    color: #172554;
    font-size: 24px;
    font-weight: 600;
    position: relative;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    user-select: none;
`

const CloseButton = styled.button`
    position: absolute;
    right: 0;
    width: 24px;
    height: 24px;
    border-radius: 24px;
    border: none;

    background-color: #a3a3a3;
    color: white;
    cursor: pointer;
    font-size: 14px;
    transition: background-color 0.2s;

    &:hover {
        background-color: #737373;
    }
`

const CautionText = styled.div`
    color: #172554;
    background-color: #fef3c7;
    width: 100%;
    height: 50px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
`

const FolderList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
    width: 100%;
    height: 100%;
    justify-content: start;
    overflow-y: auto;
    overflow-x: hidden;

    &::-webkit-scrollbar {
        width: 8px;
    }

    &::-webkit-scrollbar-track {
        background: #eff6ff;
        border-radius: 5px;
    }

    &::-webkit-scrollbar-thumb {
        background: #bfdbfe;
        border-radius: 5px;
    }

    &::-webkit-scrollbar-thumb:hover {
        background: #93c5fd;
    }
`;

const FolderCard = styled.div<{ isSelected: boolean }>`
    background: ${props => props.isSelected ? '#bfdbfe' : 'white'};
    border: 2px solid ${props => props.isSelected ? '#1d4ed8' : '#bfdbfe'};
    border-radius: 8px;
    padding: 15px;
    cursor: pointer;
    transition: all 0.2s;
    display: flex;
    justify-content: space-between;
    width: calc(100% - 40px);

    &:hover {
        border-color: #1d4ed8;
    }
`;

const FolderName = styled.h3`
    color: #172554;
    margin: 0;
    font-size: 18px;
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: 500;
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
    
    user-select: none;

    &:hover {
        background: #dc2626;
    }
`;

const FolderInputWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    user-select: none;

    width: 100%;
`;

const FolderInput = styled.input`
    flex: 1;
    padding: 10px;
    border: 2px solid #bfdbfe;
    border-radius: 6px;
    font-size: 14px;
    width: 100%;

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

const Background = styled.div`
    background-color: #000000;
    opacity: 0.5;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;

    position: absolute;
    top: 0;
    left: 0;
`;