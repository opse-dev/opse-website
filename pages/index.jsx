import { Component } from "react";
import Layout from '../components/Layout';

class Page extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Layout>
                <div className="row bg-dark">
                    <div className="container">
                        <h1>Hello World!</h1>
                        <h2>Hello World!</h2>
                        <h3>Hello World!</h3>
                        <h4>Hello World!</h4>
                    </div>
                </div>
            </Layout>
        );
    }
}

export default Page;