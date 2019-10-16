import React from "react";
import Header from "../Header";
import Footer from "../Footer";

class HomePage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div className='body'>
                    <Header />
                    <Footer />
                </div>
            </div>
        );
    }
}

export default HomePage;
