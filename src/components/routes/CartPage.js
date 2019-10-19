import React from 'react';
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
                    <PurchaseSection />
                    <Footer />
                </div>
            </div>
        );
    }
}

export default CartPage;
