import styled from 'styled-components';

export const Header = styled.div`
    color: #fff;
    background: linear-gradient(to right, #ff99ff 0%, #0066cc 100%);

    display: flex;
    width: 100%;
    padding: 10px;
`;

export const WelcomeText = styled.h3`
    text-align: center;
    font-size: 20px;
    font-weight: bold;
`;

export const MainContent = styled.div`
    padding-left: 20px;
    width: 100%;
    & > div {
        display: flex;
        justify-content: space-between;

        padding-top: 10px;
    }
`;

export const StyledActionList = styled.div``;

export const UserIcon = styled.span`
    cursor: pointer;

    padding: 5px;
    color: #000;
    font-size: 20px;
`;

export const AuthAction = styled.div`
    display: flex;
    align-items: center;
    && > span {
        margin-left: 5px;
        display: inline-block;
        text-transform: capitalize;
    }
`;
