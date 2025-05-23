import {Wheel} from "react-custom-roulette";
import React from "react";
import styled from "styled-components";
import {useRouletteStore} from "@/common/zustands/useRouletteStore.ts";
import {useSelectedFolderStore} from "@/common/zustands/useSelectedFolderStore.ts";

export default function RouletteSection(
    {
        selectedMenusCount,
    }:{
        selectedMenusCount:number;
    }
){

    const getRouletteData = useRouletteStore(state => state.getRouletteData);
    const mustSpin = useRouletteStore(state => state.mustSpin);
    const prizeNumber = useRouletteStore(state => state.prizeNumber);
    const result = useRouletteStore(state => state.result);
    const handleSpinClick = useRouletteStore(state => state.handleSpinClick);
    const handleStopSpinning = useRouletteStore(state => state.handleStopSpinning);

    const selectedFolder = useSelectedFolderStore(state => state.selectedFolder);
    const rouletteData = selectedFolder ? getRouletteData() : [];

    return <RouletteSectionWrapper>
        <div style={{ color: '#172554', marginBottom: '15px', fontWeight:'600', fontSize:"20px", userSelect:"none"}}>
            🎯 점심 룰렛 ({selectedMenusCount}개 메뉴)
        </div>

        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <Wheel
                mustStartSpinning={mustSpin}
                prizeNumber={prizeNumber}
                data={rouletteData}
                onStopSpinning={handleStopSpinning}
                backgroundColors={[
                    '#bfdbfe',
                    '#93c5fd',
                    '#60a5fa',
                    '#3b82f6',
                    '#1d4ed8',
                    '#1e3a8a',
                ]}
                outerBorderColor={"none"}
                textColors={['white', '#172554']}
                radiusLineWidth={0}
                fontSize={16}
            />
        </div>

        <div>
            <RouletteButton
                onClick={handleSpinClick}
                disabled={mustSpin || selectedMenusCount === 0}
            >
                {mustSpin ? '돌리는 중...' : '룰렛 돌리기!'}
            </RouletteButton>
        </div>

        {result ? (
            <Result>
                { mustSpin ? "룰렛 돌리는 중..." : `🎉 오늘의 점심은 ${result} 입니다!`}
            </Result>
        ):(
            <Result>
                { mustSpin ? "룰렛 돌리는 중..." : "룰렛을 돌려 점심 메뉴를 선택하세요!"}
            </Result>
        )}
    </RouletteSectionWrapper>
}

export const RouletteSectionWrapper = styled.div`
    background: white;
    border-radius: 12px;
    padding: 20px;
    text-align: center;
    justify-content: center;
    align-items: center;
    box-shadow: 0 2px 8px rgba(23, 37, 84, 0.1);
    height: min-content;
`;

const RouletteButton = styled.button`
    font-size: 18px;
    padding: 15px 30px;
    margin: 10px;

    background-color: #1d4ed8;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
        background-color: #172554;
    }

    &:disabled {
        background-color: #bfdbfe;
        cursor: not-allowed;
    }
`;

const Result = styled.div`
    margin-top: 10px;
    padding: 15px;
    background: #eff6ff;
    border-radius: 8px;
    font-size: 18px;
    font-weight: bold;
    color: #172554;
`;