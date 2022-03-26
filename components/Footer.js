import Link from 'next/link';

const socials = [];

const Component = () => {
    return (
        <div className="flex w-full items-center justify-between bg-gray-800 p-4">
            &copy; {new Date().getFullYear()} OPSE
        </div>
    );
};

export default Component;
