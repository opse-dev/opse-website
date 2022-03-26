import Link from 'next/link';
import Router from 'next/router';
import { useEffect, useState } from 'react';

const Links = [
    {
        text: 'Home',
        link: '/',
    },
    {
        text: 'Schedule',
        link: '/schedule',
    },
    {
        text: 'Standings',
        link: '/standings',
    },
];

const Component = () => {
    const [pathname, setPathname] = useState('');

    useEffect(() => {
        setPathname(location.pathname);
    }, []);

    Router.onRouteChangeComplete = (url) => {
        setPathname(url);
    };

    const Btn = ({ text, link, active }) => {
        return (
            <Link href={link}>
                <p
                    className={`m-auto cursor-pointer rounded-lg p-8 py-4 font-semibold ${
                        active ? 'bg-opse-red' : 'hover:bg-gray-700'
                    }`}
                >
                    {text}
                </p>
            </Link>
        );
    };

    return (
        <div className="fixed z-50 flex w-full items-center justify-between bg-gray-800 p-4">
            <img src="/assets/opse_logo.png" alt="logo" className="m-4 h-12" />
            <div className="flex gap-4">
                {Links.map(({ text, link }, key) => (
                    <Btn text={text} link={link} active={pathname == link} key={key} />
                ))}
            </div>
        </div>
    );
};

export default Component;
