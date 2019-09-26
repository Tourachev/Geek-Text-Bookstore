import React from "react";
import { Link } from 'react-router-dom'

class Header extends React.Component {
    constructor() {
        super();
        this.state = { showBrowse: false };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState({ showBrowse: true });
    }

    render() {
        const style = this.state.showBrowse ? { display: "none" } : {};

        return (
            <div id='jumbo-container' style={style}>
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
                            onClick={this.handleClick}
                        >
                            <Link to="/Browse">Browse</Link>
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Header;
