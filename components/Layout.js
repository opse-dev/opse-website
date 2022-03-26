import Header from './Header';
import Footer from './Footer';

const Component = ({ children }) => {
    return (
        <>
            <Header />
            <div className="pt-28">{children}</div>
            <Footer />
        </>
    );
};

export default Component;
