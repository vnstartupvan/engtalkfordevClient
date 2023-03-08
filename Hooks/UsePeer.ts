import { IUserResponse } from './../libs/models/user';
import { useEffect, useState } from 'react';

function UsePeer(myProfile: IUserResponse | null) {
    const [peer, setPeer] = useState<any>(null);
    useEffect(() => {
        if (!myProfile) return;
        import('peerjs').then(({ default: Peer }) => {
            // normal synchronous code
            const myPeer = new Peer();
            setPeer(myPeer);
        });
    }, [myProfile]);

    return peer;
}

export default UsePeer;
