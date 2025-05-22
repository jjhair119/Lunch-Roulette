import styled from "styled-components";

export default function Alert(
    {
        title,
        message,
        alert,
        closeAlert,
    }:{
        title?:string,
        message?:string,
        alert:boolean,
        closeAlert:() => void,
    }
) {
    return <AlertWrapper alert={alert}>
        <div>
            {title && <AlertTitle>{title}</AlertTitle>}
            {message && <AlertText>{message}</AlertText>}
        </div>
        <CloseButton onClick={() => closeAlert()}>X</CloseButton>
    </AlertWrapper>
}

const AlertWrapper = styled.div<{ alert: boolean }>`
    position: absolute;
    top: 98px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fef3c7;
    border-radius: 8px;
    width: fit-content;
    min-width: 270px;
    padding: 20px;
    
    box-shadow: 0 0 14px 0 rgb(0, 0, 0, 0.3);
    
    ${({ alert }) => alert ? `
        opacity: 1;
        transition: opacity 0.3s ease-in-out;
    ` : `
        opacity: 0;
        transition: opacity 0.3s ease-in-out;
        pointer-events: none
    `}
`;

const AlertTitle = styled.div`
    font-size: 18px;
    color: #172554;
    text-align: center;
`;

const AlertText = styled.div`
    font-size: 14px;
    color: #172554;
    text-align: center;
`;

const CloseButton = styled.button`
    position: absolute;
    top: 10px;
    right: 10px;
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
`;