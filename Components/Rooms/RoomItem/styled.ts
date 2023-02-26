import styled from "styled-components";

interface AvatarProps {
    borderType: string;
}

export const RoomWrapper = styled.div`
    border: 1px solid #000;
    width: 30%;
    padding: 15px 10px;
    margin-bottom: 15px;
    text-align: center;
`;

export const Header = styled.div`
    padding-bottom: 15px;
`;

export const UserList = styled.div`
    width: 100%;
    padding-bottom: 15px;

    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
`;

export const Avatar = styled.div<AvatarProps>`
    display: inline-block;
    border-radius: 50%;
    width: 80px;
    height: 80px;
    border: 1px ${(AvatarProps) => AvatarProps.borderType} black;
`;

export const StyledButton = styled.button`
    padding: 5px 10px;
    display: inline-block;
    background-color: #ffffff;
    border: 1px dashed #000;
`;
