import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
export interface IVideoPlayerProps {
    stream?: MediaStream;
}
function VideoPlayer({ stream }: IVideoPlayerProps) {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (videoRef.current && stream) {
            videoRef.current.srcObject = stream;
        } else if (videoRef.current && !stream)
            videoRef.current.srcObject = null;
    }, [stream]);

    return (
        <StyledVideo
            className="room__video-container--user-video"
            ref={videoRef}
            autoPlay
            muted={true}
        ></StyledVideo>
    );
}

const StyledVideo = styled.video`
    width: 500px;
    box-shadow: inset 0 3px 6px rgba(0, 0, 0, 0.16),
        0 4px 6px rgba(0, 0, 0, 0.45);
    border-radius: 10px;
`;
export default VideoPlayer;
