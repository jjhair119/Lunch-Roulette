import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import MenuSection from "@/pages/home/components/MenuSection.tsx";
import FolderSection from "@/pages/home/components/FolderSection.tsx";
import RouletteSection, {RouletteSectionWrapper} from "@/pages/home/components/RouletteSection.tsx";
import FolderManagementPage from "@/pages/home/components/FolderManagementPage.tsx";

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
    const [folders, setFolders] = useState<MenuFolder[]>([]);
    const [selectedFolder, setSelectedFolder] = useState<MenuFolder | null>(null);
    const [newFolderName, setNewFolderName] = useState('');
    const [newMenuName, setNewMenuName] = useState('');
    const [mustSpin, setMustSpin] = useState(false);
    const [prizeNumber, setPrizeNumber] = useState(0);
    const [result, setResult] = useState<string>('');
    const [showFolderManagement, setShowFolderManagement] = useState(false);
    const [manageFolderName, setManageFolderName] = useState('');

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
    }, []);


    const addFolder = () => {
        if (newFolderName.trim()) {
            const newFolder: MenuFolder = {
                id: Date.now().toString(),
                name: newFolderName.trim(),
                menus: []
            };
            setFolders([...folders, newFolder]);
            setSelectedFolder(newFolder);
            setNewFolderName('');
            setManageFolderName('');
        }
    };

    const addFolderWithName = (name: string) => {
        if (name.trim()) {
            const newFolder: MenuFolder = {
                id: Date.now().toString(),
                name: name.trim(),
                menus: []
            };
            setFolders([...folders, newFolder]);
            setSelectedFolder(newFolder);
            setNewFolderName('');
            setManageFolderName('');
        }
    }

    const deleteFolder = (folderId: string) => {
        const remainingFolders = folders.filter(folder => folder.id !== folderId);
        setFolders(remainingFolders);

        if (remainingFolders.length === 0) {
            localStorage.removeItem('lunchRouletteFolders');
        }

        if (selectedFolder?.id === folderId) {
            setSelectedFolder(remainingFolders[0] || null);
        }
    };

    const handleFolderChange = (folderId: string) => {
        const folder = folders.find(f => f.id === folderId);
        setSelectedFolder(folder || null);
    };

    const getSortedMenus = (menus: MenuItem[]) => {
        return [...menus].sort((a, b) => a.name.localeCompare(b.name, 'ko'));
    };

    const addMenu = () => {
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

            setFolders(folders.map(folder =>
                folder.id === selectedFolder.id ? updatedFolder : folder
            ));
            setSelectedFolder(updatedFolder);
            setNewMenuName('');
        }
    };

    const deleteMenu = (menuId: string) => {
        if (selectedFolder) {
            const updatedFolder = {
                ...selectedFolder,
                menus: selectedFolder.menus.filter(menu => menu.id !== menuId)
            };

            setFolders(folders.map(folder =>
                folder.id === selectedFolder.id ? updatedFolder : folder
            ));
            setSelectedFolder(updatedFolder);
        }
    };

    const toggleMenuSelection = (menuId: string) => {
        if (selectedFolder) {
            const updatedFolder = {
                ...selectedFolder,
                menus: selectedFolder.menus.map(menu =>
                    menu.id === menuId ? { ...menu, selected: !menu.selected } : menu
                )
            };

            setFolders(folders.map(folder =>
                folder.id === selectedFolder.id ? updatedFolder : folder
            ));
            setSelectedFolder(updatedFolder);
        }
    };

    const getColor = (index: number) => {
        const colors = [
            '#bfdbfe',
            '#93c5fd',
            '#60a5fa',
            '#3b82f6',
            '#1d4ed8',
            '#1e3a8a'
        ];
        return colors[index % colors.length];
    };

    const getTextColor = (index: number) => {
        return index % 6 < 3 ? '#172554' : 'white';
    };

    const getRouletteData = () => {
        if (!selectedFolder) return [];

        const selectedMenus = selectedFolder.menus.filter(menu => menu.selected);
        return selectedMenus.map((menu, index) => ({
            option: menu.name,
            style: {
                backgroundColor: getColor(index),
                textColor: getTextColor(index),
            }
        }));
    };

    const handleSpinClick = () => {
        const rouletteData = getRouletteData();
        if (rouletteData.length === 0) return;

        const newPrizeNumber = Math.floor(Math.random() * rouletteData.length);
        setPrizeNumber(newPrizeNumber);
        setMustSpin(true);
    };

    const handleStopSpinning = () => {
        setMustSpin(false);
        const rouletteData = getRouletteData();
        setResult(rouletteData[prizeNumber].option);
    };

    const rouletteData = getRouletteData();
    const selectedMenusCount = selectedFolder?.menus.filter(menu => menu.selected).length || 0;
    const sortedMenus = selectedFolder ? getSortedMenus(selectedFolder.menus) : [];

    return (
        <Container>
            <Header>
                🍽️ 점심 메뉴 룰렛
            </Header>
            <ScrollBarScreen/>
            <ScrollSection>
                <FolderSection
                selectedFolder={selectedFolder}
                newFolderName={newFolderName}
                setNewFolderName={setNewFolderName}
                folders={folders}
                setSelectedFolder={setSelectedFolder}
                addFolder={addFolder}
                deleteFolder={deleteFolder}
                handleFolderChange={handleFolderChange}
                setShowFolderManagement={setShowFolderManagement}
            />
                {selectedFolder && (
                    <MenuSection
                        selectedFolder={selectedFolder}
                        newMenuName={newMenuName}
                        setNewMenuName={setNewMenuName}
                        addMenu={addMenu}
                        sortedMenus={sortedMenus}
                        toggleMenuSelection={toggleMenuSelection}
                        deleteMenu={deleteMenu}
                        deleteFolder={deleteFolder}
                    />
                )}
                {selectedFolder && rouletteData.length > 0 && (
                    <RouletteSection
                        selectedMenusCount={selectedMenusCount}
                        rouletteData={rouletteData}
                        mustSpin={mustSpin}
                        prizeNumber={prizeNumber}
                        handleSpinClick={handleSpinClick}
                        handleStopSpinning={handleStopSpinning}
                        result={result}
                    />
                )}
                {selectedFolder && rouletteData.length === 0 && (
                    <RouletteSectionWrapper>
                        <div style={{color: '#172554', fontWeight: '600', fontSize: "18px", lineHeight: "40px"}}>
                            선택된 메뉴가 없습니다. 메뉴를 추가하고 체크박스를 선택해주세요!
                        </div>
                    </RouletteSectionWrapper>
                )}
            </ScrollSection>
            {
                showFolderManagement && (
                    <FolderManagementPage
                        folders={folders}
                        addFolderWithName={addFolderWithName}
                        deleteFolder={deleteFolder}
                        setShowFolderManagement={setShowFolderManagement}
                        manageFolderName={manageFolderName}
                        setManageFolderName={setManageFolderName}
                    />
                )
            }
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
    gap:20px;
    flex-direction: column;
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

    backdrop-filter:blur(10px);
    z-index: 100;
`;

const ScrollBarScreen = styled.div`
    width: 6px;
    height: 80px;
    position: absolute;
    top: 0;
    right: 0;
    background-color: #eff6ff;
`