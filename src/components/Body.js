import React from "react";

import BrowseSection from "./BrowseSection";
import SideBar from "./SideBar";

class Body extends React.Component {
    render() {
        return (
            <div>
                <div id='browse-container'>
                    <SideBar />
                    <BrowseSection />
                </div>
            </div>
        );
    }
}

export default Body;
