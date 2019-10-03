import React from 'react';

import Navbar from '../NavBar';
import Footer from '../Footer';
import PurchaseSection from '../screens/PurchaseSection';

class CartPage extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div>
                <div className='body'>
                    <Navbar />
                    <PurchaseSection />
                    <Footer />
                </div>
            </div>
        );
    }
}

export default CartPage;
