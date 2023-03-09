import { IUserResponse } from '@libs/models/user';
import styled from 'styled-components';
import User from './User';

export interface IUserListProps {
    users: IUserResponse[];
}

function UserList({ users }: IUserListProps) {
    return (
        <StyledUserList>
            {users.map((user) => {
                return <User key={user._id} fullname={user.fullname} />;
            })}
        </StyledUserList>
    );
}

const StyledUserList = styled.div`
    background: blue;
    width: 100%;
    height: 20%;
`;

export default UserList;
