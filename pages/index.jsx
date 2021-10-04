import { Component } from "react";
import Section from '../components/Section';
import Row from '../components/Row';
import { Toolbar } from 'primereact/toolbar';

class Page extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                {/* <Toolbar left="TEST" right="TEST"className="navBar" /> */}
                <Row>
                    <div class="container">
                        <h1>Hello World!</h1>
                        <h2>Hello World!</h2>
                        <h3>Hello World!</h3>
                        <h4>Hello World!</h4>
                    </div>
                </Row>
            </>
        )
    }
}

export default Page;