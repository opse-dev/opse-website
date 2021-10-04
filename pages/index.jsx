import { Component } from "react";
import { Toolbar } from 'primereact/toolbar';
import Image from 'next/image';

class Page extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                {/* <Toolbar left="TEST" right="TEST"className="navBar" /> */}
                <h1>Hello World!</h1>
                <h2>Hello World!</h2>
                <h3>Hello World!</h3>
                <h4>Hello World!</h4>
            </>
        )
    }
}

export default Page;