import styled from "styled-components";

export const MenuWrapper = styled.ul`
    display: flex;
    width: 100%;
    & > a {
        padding: 10px;
        color: #fff;
    }
    & > a:hover {
        transform: translateY(-5px);
        transition: all 0.2s linear;
    }
`;
