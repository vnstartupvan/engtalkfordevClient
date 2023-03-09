import styled from 'styled-components';

interface AvatarProps {
    borderType?: string;
    backgroundColor?: string;
}

interface ButtonProps {
    color: string;
}


export const RoomWrapper = styled.div`
    border: 1px solid #000;
    width: 30%;
    padding: 15px 10px;
    margin-bottom: 15px;
    text-align: center;
    margin-right: 10px;
`;

export const Header = styled.div`
    padding-bottom: 15px;
    display: flex;
    width: 100%;
    & .left {
        display: flex;
        width: 90%;
        & .room-info {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            width: 100%;
            padding-left: 10px;
            & div {
                display: flex;
                & h3 {
                    font-weight: bold;
                    text-transform: capitalize;
                    margin-right: 5px;
                }
                & p {
                    font-weight: lighter;
                    font-style: italic;
                }
            }
            & .topic {
                margin-top: 5px;
                font-weight: bold;
                font-size: 12px;
                text-transform: capitalize;
                color: rgb(47, 148, 233);
            }
        }
    }
    & .right {
        width: 10%;
        cursor: pointer;
        &:hover {
            color: #1677ff;
        }
    }
`;

export const UserList = styled.div`
    width: 100%;
    padding-bottom: 15px;

    display: flex;
    flex-wrap: wrap;

    && {
        margin-right: 5px;
    }
`;

export const Avatar = styled.div<AvatarProps>`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 10px 10px 0;
    font-weight: bold;
    color: white;
    border-radius: 50%;
    width: 60px;
    height: 60px;
    background: ${AvatarProps => AvatarProps.backgroundColor};
    border: 1px ${(AvatarProps) => AvatarProps.borderType} black;
`;

export const StyledButton = styled.button<ButtonProps>`
    padding: 5px 10px;
    display: inline-block;
    background-color: #ffffff;
    border: 1px dashed #000;
    color: ${ButtonProps => ButtonProps.color};
`;
