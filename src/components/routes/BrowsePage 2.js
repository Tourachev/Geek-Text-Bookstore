import React from "react";

import BrowseSection from "../screens/BrowseSection";
import Navbar from "../NavBar";
import Footer from "../Footer";

class Body extends React.Component {
    render() {
        return (
            <div>
                <BrowseSection />
                <Footer />
            </div>
        );
    }
}

export default Body;
