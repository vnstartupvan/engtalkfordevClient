import { Button } from 'antd';

export interface IUserProps {
    fullname: string;
    stream: any;
    cb: any;
}

const User = ({ fullname, stream, cb }: IUserProps) => {
    return (
        <Button
        onClick={()=> {cb(stream)}}
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
