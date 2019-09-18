import React from "react";

import BrowseSection from "./BrowseSection";
import SideBar from "./SideBar";

class Body extends React.Component {
    render() {
        return (
            <div className='{this.props.showHideSidenav}'>
                <div id='jumbo-container'>
                    <div className='jumbotron header'>
                        <div className='container header-text'>
                            <h1 className='display-2'>Geek text_</h1>
                            <h1 className='display-4'>
                                Because geeks like reading too.
                            </h1>
                            <hr className='my-4' />
                            <button
                                className='ui secondary basic button huge'
                                id='browse-button'
                            >
                                Browse
                            </button>
                        </div>
                    </div>
                </div>
                <div id='browse-container'>
                    <SideBar />
                    <BrowseSection />
                </div>
            </div>
        );
    }
}

export default Body;
