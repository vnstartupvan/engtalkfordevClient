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
`;
export default VideoPlayer;
