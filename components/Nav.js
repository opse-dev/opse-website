import React from 'react';
import Link from 'next/Link';

const Nav = () => {
    return (
        <ul>
            <li>
                <Link href='/'>Home</Link>
            </li>
            <li>
                <Link href='/schedule'>Schedule</Link>
            </li>
            <li>
                <Link href='/standings'>Standings</Link>
            </li>
        </ul>
    );
};

export default Nav;