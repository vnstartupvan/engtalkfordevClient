import React from 'react';
import styled from 'styled-components';

function Footer() {
    return <StyledFooter>© Created by Van</StyledFooter>;
}
const StyledFooter = styled.div`
    text-align: center;
    padding: 30px 0;
    background: linear-gradient(to right,#ff99ff 0%,#0066cc 100%);
    color: #fff;
`;
export default Footer;
