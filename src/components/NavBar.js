import React from "react";
import { Link } from "react-router-dom";
import Context from "./Context";

// Navbar accepts the context as props and then we can render conditionally depending on if the user is logged in.

const NavBar = props => {
    if (!props.isLoggedIn) {
        return (
            <div>
                <nav className='navbar navbar-expand-lg navbar-light bg-light'>
                    <div
                        className='collapse navbar-collapse'
                        id='navbarSupportedContent'
                    >
                        <div id='navbar-left'>
                            <ul className='navbar-nav navbar-items'>
                                <li className='nav-item active' id='home-logo'>
                                    <Link to='/'>
                                        <i className='fas fa-home fa-lg'></i>
                                    </Link>
                                </li>

                                <li>
                                    <div
                                        className='ui vertical large button'
                                        tabIndex='0'
                                    >
                                        <div className='visible content'>
                                            <Link to='/Browse'>Browse</Link>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div id='navbar-right'>
                            <ul className='navbar-nav navbar-items'>
                                <li>
                                    <Link to='/login'>
                                        <div
                                            className='ui vertical large button'
                                            tabIndex='0'
                                        >
                                            <div className='visible content'>
                                                Login
                                            </div>
                                        </div>
                                    </Link>
                                </li>
                                <li>
                                    <div
                                        className='ui vertical large button'
                                        tabIndex='0'
                                    >
                                        <div className='visible content'>
                                            <Link to='/cart'>
                                                <i className='shop icon'></i>
                                            </Link>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        );
    } else {
        return (
            <div>
                <nav className='navbar navbar-expand-lg navbar-light bg-light'>
                    <div
                        className='collapse navbar-collapse'
                        id='navbarSupportedContent'
                    >
                        <div id='navbar-left'>
                            <ul className='navbar-nav navbar-items'>
                                <li className='nav-item active' id='home-logo'>
                                    <Link to='/'>
                                        <i className='fas fa-home fa-lg'></i>
                                    </Link>
                                </li>
                                <li>
                                    <div
                                        className='ui vertical large button'
                                        tabIndex='0'
                                    >
                                        <div className='visible content'>
                                            <Link to='/Browse'>Browse</Link>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        <div id='navbar-right'>
                            <ul className='navbar-nav navbar-items'>
                                <li>
                                    <div
                                        className='ui vertical large button'
                                        tabIndex='0'
                                    >
                                        <div className='visible content'>
                                            <Link to='/profile'>
                                                My Account
                                            </Link>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div
                                        className='ui vertical large button'
                                        tabIndex='0'
                                    >
                                        <div className='visible content'>
                                            Wishlist
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div
                                        className='ui vertical large button'
                                        tabIndex='0'
                                    >
                                        <Context.Consumer>
                                            {context => (
                                                <div
                                                    className='visible content'
                                                    onClick={context.logout}
                                                >
                                                    <Link to='/'>Sign Out</Link>
                                                </div>
                                            )}
                                        </Context.Consumer>
                                    </div>
                                </li>
                                <li>
                                    <div
                                        className='ui vertical large button'
                                        tabIndex='0'
                                    >
                                        <div className='visible content'>
                                            <Link to='/cart'>
                                                <i className='shop icon'></i>
                                            </Link>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
};
export default NavBar;
