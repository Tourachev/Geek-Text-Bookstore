import React from 'react';
import Footer from '../Footer';
import Context from '../Context';
import WishlistCard from '../WishlistCard';

import CircularProgress from '@material-ui/core/CircularProgress';

class Wishlist extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: this.props.username,
            isLoggedIn: this.props.isLoggedIn,
            //Array of objects
            wishlists: []
        };
    }

    //Component must be dynamic, so here we are.....
    //Context is implemented. After user is logged in, the compenent will receive the data as props and execute queries.

    //Done, should work
    componentDidMount() {
        fetch('/wishlist', {
            method: 'post',
            body: JSON.stringify({ username: this.state.username }),
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => res.json())
            .then(wishlists => {
                this.setState({ wishlists: wishlists });
            });
    }

    //Ignore below, please don't delete.

    // handleDelete(addressInfo) {
    //     fetch('/address-info/delete', {
    //         method: 'POST',
    //         body: JSON.stringify({
    //             username: this.state.username,
    //             state: addressInfo.state,
    //             city: addressInfo.city,
    //             address: addressInfo.address,
    //             zip: addressInfo.zip
    //         }),
    //         headers: { 'Content-Type': 'application/json' }
    //     })
    //         .then(res => res.json())
    //         .then(newInfo => {
    //             //look at address-info for return values
    //             this.getInfo();
    //             alert('Deleted!');
    //         })
    //         .catch(err => {
    //             console.log(err);
    //         });
    // }

    render() {
        //Incomplete. Doesn't work... YET
        //This maps all lists onto the wishlistcards effectively showing all lists, need to pass the right data.

        //Map array of objects onto component. Each component receives an object.
        const card = this.state.wishlists.map(wishlist => (
            <WishlistCard content={wishlist.books} />
        ));

        return (
            <div>
                <Context.Consumer>
                    {context => (
                        <div className='body'>
                            <div className='container' id='wishlist-page'>
                                <h1 className='display-3 '>
                                    Your Personal Wishlists
                                </h1>
                                <hr />
                                {this.state.loading ? (
                                    <CircularProgress />
                                ) : (
                                    card
                                )}
                            </div>
                        </div>
                    )}
                </Context.Consumer>

                <Footer />
            </div>
        );
    }
}

export default Wishlist;
