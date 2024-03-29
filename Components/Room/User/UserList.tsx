import { IUserResponse } from '@libs/models/user';
import styled from 'styled-components';
import User from './User';

export interface IUserListProps {
    users: IUserResponse[];
    cb: any;
}

function UserList({ users, cb }: IUserListProps) {
    return (
        <StyledUserList>
            {users.map((user) => {
                return (
                    <User
                        key={user._id}
                        fullname={user.fullname}
                        stream={user.mediaStream}
                        cb={cb}
                    />
                );
            })}
        </StyledUserList>
    );
}

const StyledUserList = styled.div`
    width: 100%;
    height: 20%;
`;

export default UserList;
