import React from 'react';
import Link from 'next/Link';

const Nav = () => {
    return (
        <nav>
            <ul>
                <li>
                    <Link href='/'>Home</Link>
                </li>
                <li>
                    <Link href='/sc'>Schedule</Link>
                </li>
                <li>
                    <Link href='/'>Standing</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Nav;