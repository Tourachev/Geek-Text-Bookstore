import React from 'react';
import Footer from './Footer';
import { Link } from 'react-router-dom';
import { Button, DropdownButton, Dropdown, Modal } from 'react-bootstrap';
import { Icon } from 'semantic-ui-react';
import { Table } from 'reactstrap';
import NameModal from './NameModal';

class WishlistPageWrapper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list1: [],
            list2: [],
            list3: [],
            body1: [],
            body2: [],
            body3: [],
            username: this.props.username,
            names: ['Wishlist1', 'Wishlist2', 'Wishlist3']
        };
    }

    handleRefresh = () => this.refresh();

    refresh() {
        fetch('/wishlist/mount', {
            method: 'POST',
            body: JSON.stringify({
                userid: this.props.username
            }),
            headers: { 'Content-Type': 'application/json' }
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            this.getBody([data.list1, data.list2, data.list3], data.names);
        }); 
    }

    componentDidMount() {
        this.refresh();
        this.forceUpdate();
    }

    toCart = (bookid, listnum, title) => {
        fetch('/wishlist/toCart', {
            method: 'POST',
            body: JSON.stringify({
                userid: this.state.username,
                bookid: bookid,
                listnum: listnum,
                title: title
            }),
            headers: { 'Content-Type': 'application/json' }
        })
        .then(res => res.json())
        .then(() => {
            this.refresh();
        })
    } 

    toWish = (bookid, listnum, othernum) => {
        fetch('/wishlist/toWish', {
            method: 'POST',
            body: JSON.stringify({
                userid: this.state.username,
                bookid: bookid,
                listnum: listnum,
                othernum: othernum
            }),
            headers: { 'Content-Type': 'application/json' }
        })
        .then(res => res.json())
        .then(() => {
            this.refresh();
        })
    }

    remove = (bookid, listnum) => {
        fetch('/wishlist/remove', {
            method: 'POST',
            body: JSON.stringify({
                userid: this.state.username,
                bookid: bookid,
                listnum: listnum
            }),
            headers: { 'Content-Type': 'application/json' }
        })
        .then(res => res.json())
        .then(() => {
            this.refresh();
        })
    }

    getNames(username) {
        fetch('/wishlist/getNames', {
            method: 'POST',
            body: JSON.stringify({
                userid: username
            }),
            headers: { 'Content-Type': 'application/json' }
        })
        .then(res => res.json())
        .then(name => {
            this.refresh();
        })
    }

    renameList = (listnum, name) => {
        fetch('/wishlist/getNames', {
            method: 'POST',
            body: JSON.stringify({
                userid: this.state.username,
                listnum: listnum,
                listname: name
            }),
            headers: { 'Content-Type': 'application/json' }
        })
        .then(res => res.json())
        .then(() => {
            this.refresh();
        })
    }

    getBody = (list, names) => {
        let body1 = list[0].map(entry => {
            return (
                <tr key={entry.bookid}>
                    <td>{entry.title}</td>
                    <td>
                        <button type='button' class='btn btn-outline-dark'
                            onClick={() => this.toCart(entry.bookid, 1, entry.title)}
                        >
                            Move to cart
                        </button>
                        <Button
                            onClick={() => this.remove(entry.bookid, 1)}
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
                            onClick={() => this.toWish(entry.bookid, 1, 2)}>{names[1]}
                        </Dropdown.Item>
                        <Dropdown.Item 
                            onClick={() => this.toWish(entry.bookid, 1, 3)}>{names[2]}
                        </Dropdown.Item>
                    </DropdownButton>
                    </td>
                </tr>
            );
        });
        let body2 = list[1].map(entry => {
            return (
                <tr key={entry.bookid}>
                    <td>{entry.title}</td>
                    <td>
                        <button type='button' class='btn btn-outline-dark'
                            onClick={() => this.toCart(entry.bookid, 2, entry.title)}
                        >
                            Move to cart
                        </button>
                        <Button
                            onClick={() => this.remove(entry.bookid, 2)}
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
                            onClick={() => this.toWish(entry.bookid, 2, 1)}>{names[0]}
                        </Dropdown.Item>
                        <Dropdown.Item 
                            onClick={() => this.toWish(entry.bookid, 2, 3)}>{names[2]}
                        </Dropdown.Item>
                    </DropdownButton>
                    </td>
                </tr>
            );
        });
        let body3 = list[2].map(entry => {
            return (
                <tr key={entry.bookid}>
                    <td>{entry.title}</td>
                    <td>
                        <button type='button' class='btn btn-outline-dark'
                            onClick={() => this.toCart(entry.bookid, 3, entry.title)}
                        >
                            Move to cart
                        </button>
                        <Button
                            onClick={() => this.remove(entry.bookid, 3)}
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
                            onClick={() => this.toWish(entry.bookid, 3, 1)}>{names[0]}
                        </Dropdown.Item>
                        <Dropdown.Item 
                            onClick={() => this.toWish(entry.bookid, 3, 2)}>{names[1]}
                        </Dropdown.Item>
                    </DropdownButton>
                    </td>
                </tr>
            );
        });
        this.setState({ body1: body1, body2: body2, body3: body3, names: names});
        this.forceUpdate();
    }

    render() {
        return(
            <div>
            <div id='purchase-container'>
                <div id='purchase-body'>
                    <h1 className='display-4' style={{ marginBottom: '3%' }}>
                        { this.state.names[0] }
                    <NameModal
                        listnum={1}
                        username={this.state.username}
                        refresh={this.handleRefresh}
                    />
                    </h1>
                    <Table>
                        <thead>
                            <tr>
                                <th>Book Title</th>
                            </tr>
                        </thead>
                        <tbody>{this.state.body1}</tbody>
                    </Table>
                </div>
            </div>
            <div id='purchase-container'>
                <div id='purchase-body'>
                    <h1 className='display-4' style={{ marginBottom: '3%' }}>
                        { this.state.names[1] }
                    <NameModal
                        listnum={2}
                        username={this.state.username}
                        refresh={this.handleRefresh}
                    />
                    </h1>
                    <Table>
                        <thead>
                            <tr>
                                <th>Book Title</th>
                            </tr>
                        </thead>
                        <tbody>{this.state.body2}</tbody>
                    </Table>
                </div>
            </div>
            <div id='purchase-container'>
                <div id='purchase-body'>
                    <h1 className='display-4' style={{ marginBottom: '3%' }}>
                        { this.state.names[2] }
                    <NameModal
                        listnum={3}
                        username={this.state.username}
                        refresh={this.handleRefresh}
                    />
                    </h1>
                    <Table>
                        <thead>
                            <tr>
                                <th>Book Title</th>
                            </tr>
                        </thead>
                        <tbody>{this.state.body3}</tbody>
                    </Table>
                </div>
            </div>
            </div>
        );
    }
}

export default WishlistPageWrapper;