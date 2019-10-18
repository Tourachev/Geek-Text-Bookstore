import React from "react";
import { Table } from "reactstrap";
import { Button } from "react-bootstrap";
import { Icon } from "semantic-ui-react";
class PurchaseSection extends React.Component {
    /*
        Cart Items has ALL the books right now.
        We will need to pass a variable across to have all
        items in the cart that stores the quantities as well
    */
    //
    constructor(props) {
        super(props);
        this.state = {
            cartBooks: [], //Actual Books in the cart
            cartItems: [], //HTML of the Table
            quantity: 0,
            username: "blanket", //should use context here
            totalPrice: 0.0
        };
        this.changeQuantity = this.changeQuantity.bind(this);
        this.getCartItems = this.getCartItems.bind(this);
        this.removeCartItems = this.removeCartItems.bind(this);
    }

    getCartItems(books) {
        let total = 0.0;

        //Below all books get mapped onto the cart. Delete after
        let cart = books.map(item => {
            total += item.price * item.quantity;
            return (
                <tr key={item.bookId}>
                    <td>{item.title}</td>
                    <td>
                        x
                        <input
                            class='purchase-input'
                            type='text'
                            value={item.quantity}
                            onChange={this.changeQuantity.bind(this, item)}
                        />
                    </td>
                    <td>${item.price.toFixed(2)}</td>
                    <td>
                        <Button
                            onClick={this.removeCartItems.bind(this, item)}
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

    changeQuantity(item, event) {
        let isNum = new RegExp("^[0-9]+$");
        if (isNum.test(event.target.value) && event.target.value.length < 6) {
            let id = item.bookID;
            let value = parseInt(event.target.value, 10);
            this.state.cartBooks.find(
                book => book.bookID === id
            ).quantity = value;
            this.getCartItems(this.state.cartBooks);
        }
    }

    removeCartItems(item) {
        this.state.cartBooks.splice(
            this.state.cartBooks.findIndex(book => book.bookID === item.bookID),
            1
        );
        this.getCartItems(this.state.cartBooks);
    }

    componentDidMount() {
        /*fetch("/cart", {
            method: 'post',
            body: JSON.stringify({username: this.state.username}),
            headers: {'Content-Type': 'application/json'},
        })*/
        fetch("/books")
            .then(res => res.json())
            .then(books => {
                this.getCartItems(books);
            });
    }

    render() {
        return (
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
                        <Button size='lg' style={{ width: "30%" }}>
                            Purchase
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default PurchaseSection;
