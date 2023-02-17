import axios from "axios";
export interface APIPRoomProps {
    id: string;
    users: {};
    userLimit: number;
    topic: string;
    language: string;
    level: string;
};

export const fetchRoomURL = async (room : APIPRoomProps) => {
    try {
        const url = `/room/create`;
        const response = await axios({
            method: "post",
            url,
            baseURL: "http://localhost:3001",
            data: room
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const fetchRoomList = async () => {
    try {
        const url = `/room/all`;
        const response = await axios({
            method: "get",
            url,
            baseURL: "http://localhost:3001",
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};