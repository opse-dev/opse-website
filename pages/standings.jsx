const Page = () => {
    return <>Hello World</>;
};

Page.getInitialProps = async (ctx) => {
    return {
        title: 'OPSE - Standings',
    };
};

export default Page;
