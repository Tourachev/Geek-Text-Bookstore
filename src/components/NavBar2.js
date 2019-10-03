import React from "react";
import { Link } from "react-router-dom";

const NavBar2 = () => {
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
              <li className="nav-item active" id="home-logo">
                <a className="nav-link" href="index.html">
                  <i className="fas fa-home fa-lg"></i>
                </a>
              </li>

              <div className="ui vertical large animated button" tabIndex="0">
                <div className="hidden content">Cart</div>
                <div className="visible content">
                  <i className="shop icon"></i>
                </div>
              </div>
            </ul>
          </div>
          <div id="navbar-right">
            <ul className="navbar-nav navbar-items">
              <li>
                <Link to="/signUp">
                  <div
                    className="ui vertical large animated button"
                    tabIndex="0"
                  >
                    <div className="hidden content">It's Free!</div>
                    <div className="visible content">Sign-up</div>
                  </div>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};
export default NavBar2;
