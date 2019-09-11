import React from 'react';

const NavBar = () => {
    return (
        <div>
            <nav className='navbar navbar-expand-lg navbar-light bg-light'>
                <button
                    className='navbar-toggler'
                    type='button'
                    data-toggle='collapse'
                    data-target='#navbarSupportedContent'
                    aria-controls='navbarSupportedContent'
                    aria-expanded='false'
                    aria-label='Toggle navigation'
                >
                    <span className='navbar-toggler-icon'></span>
                </button>

                <div
                    className='collapse navbar-collapse'
                    id='navbarSupportedContent'
                >
                    <ul className='navbar-nav '>
                        <li className='nav-item active' id='home-logo'>
                            <a className='nav-link' href='index.html'>
                                <i className='fas fa-home fa-lg'></i>
                            </a>
                        </li>
                    </ul>

                    <div
                        className='ui vertical large animated button'
                        tabIndex='0'
                    >
                        <div className='hidden content'>It's Free!</div>
                        <div className='visible content'>Sign-up</div>
                    </div>

                    <div
                        className='ui vertical large animated button'
                        tabIndex='0'
                    >
                        <div className='hidden content'>Welcome!</div>
                        <div className='visible content'>Sign in</div>
                    </div>

                    {/* <div
                        className='ui vertical large animated button'
                        tabIndex='0'
                    >
                        <div className='hidden content'>Cart</div>
                        <div className='visible content'>
                            <i className='shop icon'></i>
                        </div>
                    </div> */}
                </div>
            </nav>
        </div>
    );
};
export default NavBar;
