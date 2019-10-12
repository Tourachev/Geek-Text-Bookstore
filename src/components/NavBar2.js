import React from 'react';
import { Link } from 'react-router-dom';

const NavBar2 = () => {
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
                                <a className='nav-link' href='index.html'>
                                    <i className='fas fa-home fa-lg'></i>
                                </a>
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
                                        My Account
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
};
export default NavBar2;
