import React from "react";
import { Table } from "reactstrap";
import { Button } from "react-bootstrap";
import { Icon } from "semantic-ui-react";
import SaveForLater from "./SavedForLater"
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
            username: this.props.username, //should use context here
            totalPrice: 0.0
        };
        // this.addItems = this.addItems.bind(this);
        // this.changeQuantityEvent = this.changeQuantityEvent.bind(this);
        // this.getCartItems = this.getCartItems.bind(this);
        // this.removeCartItems = this.removeCartItems.bind(this);
        this.onSaveForLater = this.onSaveForLater.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps.cartBooks.result);
        if (nextProps.cartBooks.result) {
           //this.getCartItems(Array.from(nextProps.cartBooks.result));
        }
    }

   componentDidMount() {
        console.log("I RAN");


        /*fetch("/cart", {
            method: "post",
            body: JSON.stringify({ username: this.state.username }),
            headers: { "Content-Type": "application/json" }
        })
        .then(res => res.json())
        .then(books => {
            this.getCartItems(books.result);
        });
        this.forceUpdate();*/
    }

    onSaveForLater(item) {
        fetch("/saved-for-later/cart-to-later", {
            method: "post",
            body: JSON.stringify({
                userid: this.props.username,
                bookid: item.bookid,
                price: item.price,
                title: item.title
            }),
            headers: { "Content-Type": "application/json" }
        })
        // const s = new SaveForLater();
        // s.fetchLaterData();
        //     .then(books => {
        //         this.getCartItems(books.result);
        //     });
    }

    // changeQuantityEvent = () =>  {
    //     console.log("I RAN");
    //     this.props.changeQuantity(item, event)
    // }

    // getCartItems(books) {
    //     let total = 0.0;
    //     console.log("BOOKS START:")
    //     console.log(books);
    //     //Below all books get mapped onto the cart. Delete after
    //     let cart = books.map(item => {
    //         total += item.price * item.quantity;
    //         return (
    //             <tr key={item.bookid}>
    //                 <td>{item.title}</td>
    //                 <td>
    //                     x
    //                     <input
    //                         class='purchase-input'
    //                         type='number'
    //                         value={item.quantity}
    //                         onChange={this.changeQuantityEvent.bind(this.item,this)}
    //                     />
    //                 </td>
    //                 <td>${item.price.toFixed(2)}</td>

    //                 <td>
    //                     <button
    //                         type='button'
    //                         class='btn btn-outline-dark'
    //                         onClick={this.onSaveForLater.bind(this, item)}
    //                     >
    //                         Save For Later
    //                     </button>
    //                     <Button
    //                         onClick={this.removeCartItems.bind(this, item)}
    //                         style={{
    //                             backgroundColor: "rgba(0,0,0,0)",
    //                             border: "none"
    //                         }}
    //                     >
    //                         <Icon name='close' color='red' />
    //                     </Button>
    //                 </td>
    //             </tr>
    //         );
    //     });
    //     console.log(books);
    //     this.setState({ cartBooks: books, cartItems: cart, totalPrice: total });
    //     this.forceUpdate();
    // }

    // removeCartItems(item) {
    //     this.state.cartBooks.splice(
    //         this.state.cartBooks.findIndex(book => book.bookID === item.bookid),
    //         1
    //     );
    //     this.getCartItems(this.state.cartBooks);
    //     fetch("/cart/delete", {
    //         method: "POST",
    //         body: JSON.stringify({
    //             userid: this.props.username,
    //             bookid: item.bookid
    //         }),
    //         headers: { "Content-Type": "application/json" }
    //     })
    //         .then(res => console.log(res.body))
    //         .then(newInfo => {
    //             console.log("Item Deleted");
    //         })
    //         .catch(err => {
    //             console.log(err);
    //         });
    // }

    saveForLater() {}

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
        );
    }
}

export default PurchaseSection;
