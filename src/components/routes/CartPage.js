import React from "react";

import NavBar from "../NavBar";
import Footer from "../Footer";
import PurchaseSection from "../screens/PurchaseSection"

class CartPage extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div>
                <div className='body'>
                    <NavBar />
                    <Footer />
                </div>
            </div>
        );
    }
}

export default CartPage;
