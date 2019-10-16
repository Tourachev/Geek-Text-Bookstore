import React from "react";
import { Link } from "react-router-dom";

class Header extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div id='jumbo-container'>
                <div className='jumbotron header'>
                    <div className='container header-text'>
                        <h1 className='display-2'>Geek Text</h1>
                        <h1 className='display-4'>
                            Because geeks like reading too.
                        </h1>
                        <hr className='my-4' />
                        <button
                            className='ui secondary basic button huge'
                            id='browse-button'
                        >
                            <Link to='/Browse'>Browse</Link>
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Header;
