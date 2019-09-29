import React from "react";
import Header from "./Header";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        {/* <button
            className='navbar-toggler'
            type='button'
            data-toggle='collapse'
            data-target='#navbarSupportedContent'
            aria-controls='navbarSupportedContent'
            aria-expanded='false'
            aria-label='Toggle navigation'
        >
            <span className='navbar-toggler-icon'></span>
        </button> */}

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <div id="navbar-left">
            <ul className="navbar-nav navbar-items">
              <li
                className="nav-item active"
                id="home-logo"
                onClick={Header.handleCLick}
              >
                <Link to="/">
                  <i className="fas fa-home fa-lg"></i>
                </Link>
              </li>

              <li>
                <div className="ui vertical large button" tabIndex="0">
                  <div className="visible content">
                    <Link to="/Browse">Browse</Link>
                  </div>
                </div>
              </li>
              <li>
                <div className="ui vertical large button" tabIndex="0">
                  <div className="visible content">Wishlist</div>
                </div>
              </li>
            </ul>
          </div>
          <div id="navbar-right">
            <ul className="navbar-nav navbar-items">
              <li>
                <div className="ui vertical large button" tabIndex="0">
                  <div className="visible content">Sign in</div>
                </div>
              </li>
              <li>
                <div className="ui vertical large button" tabIndex="0">
                  <div className="visible content">
                    <Link to="/cart">
                      <i className="shop icon"></i>
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
export default NavBar;
