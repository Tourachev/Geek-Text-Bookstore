import React from 'react';
import PurchaseSection from '../screens/PurchaseSection';
import SavedForLater from '../screens/SavedForLater';

class CartPageWrapper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cartBooks: [],
            savedBooks: []
        }
        this.changeQuantity = this.changeQuantity.bind(this);
    }

    componentDidMount(){
        fetch("/cart", {
            method: "post",
            body: JSON.stringify({ username: this.props.username }),
            headers: { "Content-Type": "application/json" }
        })
        .then(res => res.json())
        .then(books => {
            this.setState({cartBooks: books})
        });
        this.forceUpdate();
    }

    changeQuantity(item, event) {
        let value = parseInt(event.target.value, 10);
        let id = item.bookID;
        if (event.target.value == "") {
            value = 0;
        }
        fetch("/cart/edit", {
            method: "POST",
            body: JSON.stringify({
                quantity: value,
                price: item.price,
                total: (item.price * value).toFixed(2),
                title: item.title,
                userid: this.props.username,
                bookid: item.bookid
            }),
            headers: { "Content-Type": "application/json" }
        })
            .then(res => res.json())
            .then(newInfo => {
                console.log("ITEM EDITED");
            })
            .catch(err => {
                console.log(err);
            });
        console.log(this.state.cartBooks.result.find(book => book.bookID === id));
        this.state.cartBooks.result.find(book => book.bookID === id).quantity = value;
        this.forceUpdate();
    }

    render() {
        return (
            <div>
                <PurchaseSection
                    username={this.props.username}
                    isLoggedIn={this.props.isLoggedIn}
                    cartBooks={this.state.cartBooks}
                    changedQuantity={this.changeQuantity}
                />
                <SavedForLater
                    username={this.props.username}
                    isLoggedIn={this.props.isLoggedIn}
                    savedBooks={this.state.savedBooks}
                />
            </div>
        )
    }
}

export default CartPageWrapper;
