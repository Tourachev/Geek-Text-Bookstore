import React from 'react';
import Footer from '../Footer';
import { Link } from 'react-router-dom';
import { Button, DropdownButton, Dropdown, Modal } from 'react-bootstrap';
import { Icon } from 'semantic-ui-react';
import { Table } from 'reactstrap';
import Context from '../Context';
import WishlistPageWrapper from './WishlistPageWrapper';

class Wishlist extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.isLoggedIn) {
            return (
                <div><div>
                    <h1 className='display-3'>
                        Your Personal Wishlists 
                    </h1>
                    <div className="body">
                        <WishlistPageWrapper
                            username={this.props.username}
                            isLoggedIn={this.props.isLoggedIn}
                        />
                    <Footer/>
                    </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div class='ohoh'>
                    <h1 class='display-4'>Oh, Oh!</h1>
                    <p class='lead'>Looks like you're not logged in!</p>
                    <p class='lead'>Click below to get to the login page.</p>
                    <hr class='my-4' />
                    <p class='lead'>
                        <Link to='/login'>
                            <button
                                type='button'
                                class='btn btn-outline-primary btn-block'
                            >
                                Take Me There!
                            </button>
                        </Link>
                    </p>
                </div>
            );
        }
    }

}

export default Wishlist;
