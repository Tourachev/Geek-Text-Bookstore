import React from 'react';
import Footer from '../Footer';
import { Link } from 'react-router-dom';
import Context from '../Context';
import WishlistCard from '../WishlistCard';

class Wishlist extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: this.props.username,
            isLoggedIn: this.props.isLoggedIn,
        };  
    }

    //Component must be dynamic, so here we are.....
    //Context is implemented. After user is logged in, the compenent will receive the data as props and execute queries.

    render() {
        if (this.state.isLoggedIn) {
            return (
                <div>
                    <div className='body'>
                    <WishlistCard 
                        listnum={1}
                        username={this.state.username}
                    />
                    <WishlistCard 
                        listnum={2}
                        username={this.state.username}
                    />
                    <WishlistCard 
                        listnum={3}
                        username={this.state.username}
                    />
                    <Footer />
                    </div>
                </div>
            );
        }
        else {
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
