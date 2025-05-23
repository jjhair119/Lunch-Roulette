import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import MenuSection from "@/pages/home/components/MenuSection.tsx";
import FolderSection from "@/pages/home/components/FolderSection.tsx";
import RouletteSection, {RouletteSectionWrapper} from "@/pages/home/components/RouletteSection.tsx";
import FolderManagementPage from "@/pages/home/components/FolderManagementPage.tsx";
import Alert from "@/common/components/Alert.tsx";
import {useFolderStore} from "@/common/zustands/useFolderStore.ts";
import {useSelectedFolderStore} from "@/common/zustands/useSelectedFolderStore.ts";
import {useUIStore} from "@/common/zustands/useUIStore.ts";
import {useRouletteStore} from "@/common/zustands/useRouletteStore.ts";

export interface MenuItem {
    id: string;
    name: string;
    selected: boolean;
}

export interface MenuFolder {
    id: string;
    name: string;
    menus: MenuItem[];
}

const HomePage: React.FC = () => {
    const folders = useFolderStore(state => state.folders);
    const setFolders = useFolderStore(state => state.setFolders);

    const selectedFolder = useSelectedFolderStore(state => state.selectedFolder);
    const setSelectedFolder = useSelectedFolderStore(state => state.setSelectedFolder);

    const alert = useUIStore(state => state.alert);
    const setAlert = useUIStore(state => state.setAlert);
    const showFolderManagement = useUIStore(state => state.showFolderManagement);
    const onClickAlertClose = useUIStore(state => state.onClickAlertClose);

    const getRouletteData = useRouletteStore(state => state.getRouletteData);
    const rouletteData = selectedFolder ? getRouletteData() : [];

    useEffect(() => {
        if (localStorage.getItem('lunchRouletteAlert') === null) {
            localStorage.setItem('lunchRouletteAlert', JSON.stringify(false));
            setAlert(true);
        }
        else if (localStorage.getItem('lunchRouletteAlert') === 'false') {
            setAlert(true);
        }
    }, [setAlert]);

    useEffect(() => {
        if (folders.length > 0) {
            localStorage.setItem('lunchRouletteFolders', JSON.stringify(folders));
        }
    }, [folders]);

    useEffect(() => {
        const savedFolders = localStorage.getItem('lunchRouletteFolders');
        if (savedFolders) {
            const parsedFolders = JSON.parse(savedFolders);
            setFolders(parsedFolders);
            if (parsedFolders.length > 0) {
                setSelectedFolder(parsedFolders[0]);
            }
        }
    }, [setFolders, setSelectedFolder]);

    const selectedMenusCount = selectedFolder?.menus.filter(menu => menu.selected).length || 0;

    return (
        <Container>
            <Header>
                <HeaderBackground/>
                🍽️ 점심 메뉴 룰렛
            </Header>
            <Alert
                alert={alert}
                closeAlert={onClickAlertClose}
                title={"🍽 점심 메뉴 룰렛에 오신 것을 환영합니다!"}
                message={"폴더와 메뉴는 로컬 기기에 저장됩니다.\n 다른 기기와 동기화되지 않습니다."}
            />
            <ScrollBarScreen/>
            <ScrollSection>
                <FolderSection />
                {selectedFolder && <MenuSection />}
                {selectedFolder && rouletteData.length > 0 && (
                    <RouletteSection
                        selectedMenusCount={selectedMenusCount}
                    />
                )}
                {selectedFolder && rouletteData.length === 0 && (
                    <RouletteSectionWrapper>
                        <div style={{color: '#172554', fontWeight: '600', fontSize: "18px", padding: "8px 4px", userSelect: "none", lineHeight:"24px"}}>
                            선택된 메뉴가 없습니다.<br/>메뉴를 추가하고 체크박스를 선택해주세요!
                        </div>
                    </RouletteSectionWrapper>
                )}
            </ScrollSection>
            {showFolderManagement && <FolderManagementPage />}
        </Container>
    );
};

export default HomePage;

const Container = styled.div`
    background-color: #eff6ff;
    min-width: 100%;
    min-height: 100%;
    padding-top: 80px;
    padding-bottom: 20px;
    height: 100vh;

    overflow: auto;

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

const ScrollSection = styled.div`
    width: 100%;
    overflow: visible;
    display: flex;
    gap: 20px;
    flex-direction: column;
    padding-top: 20px;
    padding-bottom: 98px;
    align-items: center;

    & > * {
        min-width: 200px;
        max-width: 600px;
        width: 80vw;
    }
`

const Header = styled.div`
    text-align: center;
    color: #172554;
    font-weight: 700;
    line-height: 80px;
    font-size: 2.4rem;
    user-select: none;
    position: absolute;
    width: 100%;

    top: 0;
    left: 50%;
    transform: translateX(-50%);

    backdrop-filter: blur(10px);
    z-index: 100;
`;

const HeaderBackground = styled.div`
    width: 100%;
    height: 80px;
    background-color: #dbeafe;
    opacity: 0.4;
    position: absolute;
    z-index: -1;
`;

const ScrollBarScreen = styled.div`
    width: 6px;
    height: 80px;
    position: absolute;
    top: 0;
    right: 0;
    background-color: #eff6ff;
`