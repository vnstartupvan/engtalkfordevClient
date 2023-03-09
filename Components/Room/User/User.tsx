import { Button } from 'antd';

export interface IUserProps {
    fullname: string;
}

const User = ({ fullname }: IUserProps) => {
    return (
        <Button
            style={{
                backgroundColor: '#fde3cf',
                color: '#f56a00',
                border: '2px solid black',
            }}
        >
            {fullname.charAt(0)}
        </Button>
    );
};

export default User;
