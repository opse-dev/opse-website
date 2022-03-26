import Link from 'next/link';

const Nav = () => {
    return (
        <nav>
            <ul>
                <li>
                    <Link href='/'>Home</Link>
                </li>
                <li>
                    <Link href='/schedule'>Schedule</Link>
                </li>
                <li>
                    <Link href='/standings'>Standing</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Nav;