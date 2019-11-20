import React from 'react';
import PurchaseSection from '../screens/PurchaseSection';
import { Table } from "reactstrap";
import { Button } from "react-bootstrap";
import { Icon } from "semantic-ui-react";
import SavedForLater from '../screens/SavedForLater';


class CartPageWrapper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cartBooks: [], //Actual Books in the cart
            savedItems: [], //HTML of the Table
            cartItems:[],
            savedBooks: [],
            quantity: 0,
            username: this.props.username, //should use context here
            totalPrice: 0.0
        }
        this.changeQuantity = this.changeQuantity.bind(this);
        this.getCartItems = this.getCartItems.bind(this);
        this.removeCartItems = this.removeCartItems.bind(this);
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
            this.getCartItems(books.result)
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
                userid: this.state.username,
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
     getCartItems(books) {
        let total = 0.0;
        console.log("BOOKS START:")
        console.log(books);
        //Below all books get mapped onto the cart. Delete after
        let cart = books.map(item => {
            total += item.price * item.quantity;
            return (
                <tr key={item.bookid}>
                    <td>{item.title}</td>
                    <td>
                        x
                        <input
                            class='purchase-input'
                            type='number'
                            value={item.quantity}
                            onChange={this.changeQuantity.bind(item,this)}
                        />
                    </td>
                    <td>${item.price.toFixed(2)}</td>

                    <td>
                        <button
                            type='button'
                            class='btn btn-outline-dark'
                            // onClick={this.onSaveForLater.bind(this, item)}
                        >
                            Save For Later
                        </button>
                        <Button
                            onClick={this.removeCartItems.bind(this, item)}
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
        })            .then(res => console.log(res.body))
            .then(newInfo => {
                console.log("Item Deleted");
            })
            .catch(err => {
                console.log(err);
            });
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
        this.setState({ cartBooks: books, cartItems: cart, totalPrice: total });
        this.forceUpdate();
    }

    removeCartItems(item) {
        this.state.cartBooks.splice(
            this.state.cartBooks.findIndex(book => book.bookID === item.bookid),
            1
        );
        this.getCartItems(this.state.cartBooks);
        fetch("/cart/delete", {
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
                {/* CART RENDER */}
                <div id='purchase-container'>
                <div id='purchase-body'>
                    <h1 className='display-4' style={{ marginBottom: "3%" }}>
                        Your Cart
                    </h1>
                    <Table>
                        <thead>
                            <tr>
                                <th>Book Title</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>{this.state.cartItems}</tbody>
                    </Table>
                    <div className='price-row'>
                        <h3>
                            Total Price: ${this.state.totalPrice.toFixed(2)}
                        </h3>
                    </div>
                    <div className='price-row'>
                        <Button
                            size='lg'
                            style={{ width: "30%" }}
                            onClick={this.addItems}
                        >
                            Purchase
                        </Button>
                    </div>
                </div>
            </div>
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
