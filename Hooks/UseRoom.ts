import { useEffect, useState } from "react";
export interface IUseRoomsProps {
    fetchingCb: () => void;
    URL?: string;
}

export default function UseRoom({ fetchingCb, URL }: IUseRoomsProps) {
    const [rooms, setRooms] = useState([]);
    const [isFetching, setIsFetching] = useState(false);

    useEffect(() => {}, []);

    return rooms;
}
