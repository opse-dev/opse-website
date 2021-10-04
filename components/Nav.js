import React from 'react';
import Link from 'next/Link';

const Nav = () => {
    return (
        <nav>
            <ul>
                <li>
                    <Link herf='/'>Home</Link>
                </li>
                <li>
                    <Link herf='/'>Schedule</Link>
                </li>
                <li>
                    <Link herf='/'>Standing</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Nav;