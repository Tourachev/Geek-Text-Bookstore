import React from 'react';
import { Table } from 'reactstrap';
import { Button, DropdownButton, Dropdown, Modal } from 'react-bootstrap';
import { Icon } from 'semantic-ui-react'
import ModalHeader from 'react-bootstrap/ModalHeader';

class WishlistCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            wishlist: [],
            listBody: [],
            listname: '',
            listnum: this.props.listnum,
            username: this.props.username,
        }

        this.getBooks = this.getBooks.bind(this);
        this.getBody = this.getBody.bind(this);
        this.toCart = this.toCart.bind(this);
        this.moveToWish = this.moveToWish.bind(this);
        this.remove = this.remove.bind(this);
        this.changeName = this.changeName.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    getBooks() {
        fetch('/wishlist', {
            method: 'POST',
            body: JSON.stringify({
                userid: this.state.username,
                listnum: this.state.listnum
            }),
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => res.json())
            .then(data => {
                this.getBody(data.books, data.names);
            });
    }

    componentDidMount() {

        this.getBooks();
    }

    remove(bookid) {
        fetch('/wishlist/remove', {
            method: 'POST',
            body: JSON.stringify({
                userid: this.state.username,
                listnum: this.state.listnum,
                bookid: bookid
            }),
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => res.json())
            .then(data => {
                this.getBooks();
            });
    }

    changeName(name) {
        fetch('/wishlist/rename', {
            method: 'POST',
            body: JSON.stringify({
                userid: this.state.username,
                listnum: this.state.listnum,
                newname: name
            }),
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => res.json())
            .then(data => {
                this.setState({listname: name});
            });
    }

    toCart(bid) {
        fetch('/wishlist/toCart', {
            method: 'POST',
            body: JSON.stringify({
                userid: this.state.username,
                listnum: this.state.listnum,
                bookid: bid
            }),
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => res.json())
            .then(data => {
                this.getBooks();
            });
    }

    moveToWish(num, bid, btitle) {
        fetch('/wishlist/toWish', {
            method: 'POST',
            body: JSON.stringify({
                userid: this.state.username,
                listnum: this.state.listnum,
                title: btitle,
                bookid: bid,
                othernum: num
            }),
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => res.json())
            .then(data => {
                this.getBooks();
            });
    }

    getBody(books, names) {

        var index1;
        var index2;

        if (this.state.listnum == 1) {
            index1 = 2;
            index2 = 3;
        } else if (this.state.listnum == 2) {
            index1 = 3;
            index2 = 1;
        } else {
            index1 = 1;
            index2 = 2;
        }

        let body = books.map(entry => {

            return (
                <tr key={entry.bookid}>
                    <td>{entry.title}</td>
                    <td>
                        <button type='button' class='btn btn-outline-dark'
                            onClick={this.toCart.bind(this, entry.bookid)}
                        >
                            Move to cart
                        </button>
                        <Button
                            onClick={this.remove.bind(this, entry.bookid)}
                            style={{
                                backgroundColor: 'rgba(0,0,0,0)',
                                border: 'none'
                            }}
                        >
                            <Icon name='close' color='red'/>
                        </Button>
                    </td>
                    <td>
                    <DropdownButton 
                        id="dropdown-basic-button" 
                        title="Move to other wish list"
                    >
                        <Dropdown.Item 
                            onClick={this.moveToWish.bind(this, index1, entry.bookid, 
                            entry.title)}>{names[index1 - 1]}
                        </Dropdown.Item>
                        <Dropdown.Item 
                            onClick={this.moveToWish.bind(this, index2, entry.bookid,
                            entry.title)}>{names[index2 - 1]}
                        </Dropdown.Item>
                    </DropdownButton>
                    </td>
                </tr>
            );
        });
        this.setState({ 
            listBody: body, 
            wishlist: books, 
            listname: names[this.state.listnum - 1]
        });
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    render() {
        var check = 1;
        var html;
        

        return(
            <div id='purchase-container'>
                <div id='purchase-body'>
                    <h1 className='display-4' style={{ marginBottom: '3%' }}>
                        { this.state.listname }
                        <form onSubmit={this.changeName}>
                            change list name to:
                            <input type='text' value={this.state.listname} onChange={this.handleChange}/>
                            <input type='submit' value='Submit'/>
                        </form>
                    </h1>
                    <Table>
                        <thead>
                            <tr>
                                <th>Book Title</th>
                            </tr>
                        </thead>
                        <tbody>{this.state.listBody}</tbody>
                    </Table>
                </div>
            </div>
        );
    }
}

export default WishlistCard;
