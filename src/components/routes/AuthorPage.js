import React from "react";

import AuthorWorksSection from '../screens/AuthorWorksSection'
import Navbar from "../NavBar";
import Footer from "../Footer";

class Body extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <AuthorWorksSection author={this.props.match.params.name}/>
                <Footer />
            </div>
        );
    }
}

export default Body;
