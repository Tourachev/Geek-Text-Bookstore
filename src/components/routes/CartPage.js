import React from 'react';
import Footer from '../Footer';
import PurchaseSection from '../screens/PurchaseSection';
import SavedForLater from '../screens/SavedForLater';
import Context from '../Context';
import { Link } from 'react-router-dom';

class CartPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.isLoggedIn) {
            return (
                <div>
                    <div className='body'>
                        <Context.Consumer>
                            {context => (
                                <div>
                                    <PurchaseSection
                                        username={context.username}
                                        isLoggedIn={context.isLoggedIn}
                                    />
                                    <SavedForLater
                                        username={context.username}
                                        isLoggedIn={context.isLoggedIn}
                                    />
                                </div>
                            )}
                        </Context.Consumer>

                        <Footer />
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

export default CartPage;
