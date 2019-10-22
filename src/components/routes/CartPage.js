import React from 'react';
import Footer from '../Footer';
import PurchaseSection from '../screens/PurchaseSection';
import Context from './components/Context';

class CartPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
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
                            </div>
                        )}
                    </Context.Consumer>

                    <Footer />
                </div>
            </div>
        );
    }
}

export default CartPage;
