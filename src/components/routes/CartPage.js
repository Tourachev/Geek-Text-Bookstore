import React from 'react';

import Navbar from '../NavBar';
import Footer from '../Footer';
import PurchaseSection from '../screens/PurchaseSection';

class CartPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div className='body'>
                    <PurchaseSection
                        username={this.props.username}
                        isLoggedIn={this.props.isLoggedIn}
                    />
                    <Footer />
                </div>
            </div>
        );
    }
}

export default CartPage;
