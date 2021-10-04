import React from 'react';
import Nav from './Nav';
import Image from 'next/image'
import logo from '../public/assets/opse_logo.png'

const Header = () => {
    return (
        <header>
            <Image className="header-logo" layout="intrinsic" width={241} height={50} src={logo} alt="OPSE Logo" />
            <nav className="top-nav">
                <Nav />
            </nav>
            <nav className="mobile-nav">
                <Nav />
            </nav>
        </header>
    );
};

export default Header;