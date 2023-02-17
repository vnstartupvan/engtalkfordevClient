import {useEffect} from 'react'
import {useRef} from 'react'
import io, {ManagerOptions, SocketOptions, Socket} from 'socket.io-client'

function useSocket(uri: string, otps?: Partial<ManagerOptions & SocketOptions> | undefined) {
    const {current: socket} = useRef(io(uri, otps))

    useEffect(() => {
        return () => {
            if (socket) socket.close()
        }
    }, [socket])

    return socket
}

export default useSocket
