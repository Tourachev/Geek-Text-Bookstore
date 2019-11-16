import React from 'react';
import Footer from '../Footer';
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
}

export default Wishlist;
