import React, { useEffect, useRef } from 'react';
export interface IVideoPlayerProps {
    stream?: MediaStream;
}
function VideoPlayer({ stream }: IVideoPlayerProps) {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (videoRef.current && stream) videoRef.current.srcObject = stream;
    }, [stream]);

    return (
        <video
            className="room__video-container--user-video"
            ref={videoRef}
            style={{ width: '200px' }}
            autoPlay
            muted={true}
        ></video>
    );
}

export default VideoPlayer;
