import Link from "next/link";
import React from "react";
import { MenuWrapper } from './Menu.styled';

function Menu() {
    return (
        <MenuWrapper>
            <Link href="#">Menu Item</Link>
            <Link href="#">Menu Item</Link>
            <Link href="#">Menu Item</Link>
            <Link href="#">Menu Item</Link>
        </MenuWrapper>
    );
}



export default Menu;
