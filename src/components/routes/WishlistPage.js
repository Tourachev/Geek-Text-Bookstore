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
            wishlists: {
                1: [],
                2: [],
                3: []
            }
        };
    }

    //Component must be dynamic, so here we are.....
    //Context is implemented. After user is logged in, the compenent will receive the data as props and execute queries.

    componentDidMount() {
        fetch('/wishlist', {
            method: 'post',
            body: JSON.stringify({ username: this.state.username }),
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => res.json())
            .then(lists => {
                this.setState({
                    wishlists: lists
                });
            });
    }

    render() {
        return (
            <div>
                <Context.Consumer>
                    {context => (
                        <div className='body'>
                            <div className='container' id='wishlist-page'>
                                <h1 className='display-3 '>
                                    Your Personal Wishlists
                                </h1>
                            </div>
                            <div>
                                <WishlistCard
                                    username={this.state.username}
                                    wishlist={this.state.wishlists[1]}
                                    listnum={1}
                                    listname={'Wishlist1'}
                                />
                            </div>
                            <div>
                                <WishlistCard
                                    username={this.state.username}
                                    wishlist={this.state.wishlists[2]}
                                    listnum={2}
                                    listname={'Wishlist2'}
                                />
                            </div>  
                            <div>
                                <WishlistCard
                                    username={this.state.username}
                                    wishlist={this.state.wishlists[3]}
                                    listnum={3}
                                    listname={'Wishlist3'}
                                />
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
