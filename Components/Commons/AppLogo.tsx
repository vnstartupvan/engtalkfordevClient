import React from 'react';
import styled from 'styled-components';

function AppLogo() {
    return (
        <Logo>
            <i className="fa fa-code"></i>
        </Logo>
    )
}

export default AppLogo;

const Logo = styled.div`
    background-color:#080d42;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    border: 3px solid var(--main-border-color);
    border-left: 3px solid white;

    min-width: 50px;
    max-width: 50px;
    height: 50px;

    animation-name: rotate;
    animation-duration: 5s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
`;

