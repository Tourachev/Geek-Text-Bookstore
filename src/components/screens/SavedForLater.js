import React from 'react';
import { Table } from 'reactstrap';
import { Button } from 'react-bootstrap';
import { Icon } from 'semantic-ui-react';
class SavedForLater extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cartBooks: [], //Actual Books in the cart
            cartItems: [], //HTML of the Table
            username: this.props.username //should use context here
        };
        // this.addItems = this.addItems.bind(this);
        this.getCartItems = this.getCartItems.bind(this);
        this.removeCartItems = this.removeCartItems.bind(this);
    }

    componentDidMount() {
        fetch('/saved-for-later', {
            method: 'post',
            body: JSON.stringify({ username: this.state.username }),
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => res.json())
            .then(books => {
                this.getCartItems(books.result);
            });
    }

    getCartItems(books) {
        //Below all books get mapped onto the cart. Delete after
        let cart = books.map(item => {
            return (
                <tr key={item.bookId}>
                    <td>{item.title}</td>
                    <td>${item.price.toFixed(2)}</td>
                    <td>
                        <button type='button' class='btn btn-outline-dark'>
                            Move To Cart
                        </button>
                        <Button
                            onClick={this.removeCartItems.bind(this, item)}
                            style={{
                                backgroundColor: 'rgba(0,0,0,0)',
                                border: 'none'
                            }}
                        >
                            <Icon name='close' color='red' />
                        </Button>
                    </td>
                </tr>
            );
        });
        console.log(books);
        this.setState({ cartBooks: books, cartItems: cart });
        this.forceUpdate();
    }

    removeCartItems(item) {
        this.state.cartBooks.splice(
            this.state.cartBooks.findIndex(book => book.bookID === item.bookid),
            1
        );
        this.getCartItems(this.state.cartBooks);
        fetch('/saved-for-later/delete', {
            method: 'POST',
            body: JSON.stringify({
                userid: this.state.username,
                bookid: item.bookid
            }),
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => console.log(res.body))
            .then(newInfo => {
                console.log('Item Deleted');
            })
            .catch(err => {
                console.log(err);
            });
    }

    render() {
        return (
            <div id='purchase-container'>
                <div id='purchase-body'>
                    <h1 className='display-4' style={{ marginBottom: '3%' }}>
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
                        <tbody>{this.state.cartItems}</tbody>
                    </Table>
                </div>
            </div>
        );
    }
}

export default SavedForLater;
