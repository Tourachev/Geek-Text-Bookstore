import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

class WishlistCard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        //This don't work either yet.
        //Not sure how to map the data being received
        const list = this.props.wishlist.map(wishlist => this.whishlists);
        return (
            <div>
                <h1>List: </h1>
                {this.state.loading ? <CircularProgress /> : list}
            </div>
        );
    }
}

export default WishlistCard;
