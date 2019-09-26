import React from "react";

import BrowseSection from "../screens/BrowseSection";
import SideBar from "../SideBar";
import NavBar from "../NavBar";
import Footer from "../Footer";

class Body extends React.Component {
    render() {
        return (
            <div>
                <NavBar />
                <div id='browse-container'>
                    <SideBar />
                    <BrowseSection />
                </div>
                <Footer />
            </div>
        );
    }
}

export default Body;
