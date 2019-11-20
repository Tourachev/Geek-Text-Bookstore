import React from 'react';
import PurchaseSection from '../screens/PurchaseSection';
import { Table } from "reactstrap";
import { Button } from "react-bootstrap";
import { Icon } from "semantic-ui-react";

class CartPageWrapper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cartBooks: [],
            savedBooks: [], //Actual Books in the cart
            savedItems: [], //HTML of the Table
            username: this.props.username
        }
        this.changeQuantity = this.changeQuantity.bind(this);
        this.getSavedItems = this.getSavedItems.bind(this);
        this.removeSavedItems = this.removeSavedItems.bind(this);
        this.moveToCartHandler = this.moveToCartHandler.bind(this);
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

        fetch("/saved-for-later", {
            method: "post",
            body: JSON.stringify({ username: this.state.username }),
            headers: { "Content-Type": "application/json" }
        })
            .then(res => res.json())
            .then(books => {
                this.getSavedItems(books.result);
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


    //SAVED FOR LATER METHODS HERE
    moveToCartHandler = (event, item) => {
        console.log("I WORKED!")
        /* this.state.savedBooks.splice(
            this.state.savedBooks.findIndex(book => book.bookID === item.bookid),
            1
        );

        fetch("/saved-for-later/swap", {
            method: "POST",
            body: JSON.stringify({
                username: this.state.username,
                bookID: item.bookid,
                price: item.price,
                title: item.title
            }),
            headers: { "Content-Type": "application/json" }
        })
            .then(res => res.json())
            // .then(newInfo => {
            //     //look at address-info for return values
            //     this.getInfo();
            // })
            .catch(err => {
                console.log(err);
            });*/
    };

    getSavedItems(books) {
        //Below all books get mapped onto the cart. Delete after
        let cart = books.map(item => {
            return (
                <tr key={item.bookId}>
                    <td>{item.title}</td>
                    <td>${item.price.toFixed(2)}</td>
                    <td>
                        <button
                            onClick={this.moveToCartHandler.bind(this, item)}
                            type='button'
                            class='btn btn-outline-dark'
                        >
                            Move To Cart
                        </button>
                        <Button
                            onClick={this.removeSavedItems.bind(this, item)}
                            style={{
                                backgroundColor: "rgba(0,0,0,0)",
                                border: "none"
                            }}
                        >
                            <Icon name='close' color='red' />
                        </Button>
                    </td>
                </tr>
            );
        });
        console.log(books);
        this.setState({ savedBooks: books, savedItems: cart });
        this.forceUpdate();
    }

    removeSavedItems(item) {
        this.state.savedBooks.splice(
            this.state.savedBooks.findIndex(
                book => book.bookid === item.bookid
            ), 1
        );
        this.getSavedItems(this.state.savedBooks);
        fetch("/saved-for-later/delete", {
            method: "POST",
            body: JSON.stringify({
                userid: this.state.username,
                bookid: item.bookid
            }),
            headers: { "Content-Type": "application/json" }
        })
        .then(res => console.log(res.body))
        .then(newInfo => {
            console.log("Item Deleted");
        })
        .catch(err => {
            console.log(err);
        });
    }

    render() {
        return (
            <div>
                <PurchaseSection
                    username={this.props.username}
                    isLoggedIn={this.props.isLoggedIn}
                    cartBooks={this.state.cartBooks}
                    changeQuantity={this.changeQuantity}
                />

                <div id='purchase-container'>
                    <div id='purchase-body'>
                        <h1 className='display-4' style={{ marginBottom: "3%" }}>
                            Saved For Later
                        </h1>
                        <Table>
                            <thead>
                                <tr>
                                    <th>Book Title</th>
                                    <th>Price</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>{this.state.savedItems}</tbody>
                        </Table>
                    </div>
                </div>
            </div>
        )
    }
}

export default CartPageWrapper;
