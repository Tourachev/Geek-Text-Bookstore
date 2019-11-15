import React from 'react';
import { Table } from 'reactstrap';
import { Button } from 'react-bootstrap';
import { Icon } from 'semantic-ui-react'
import CircularProgress from '@material-ui/core/CircularProgress';

class WishlistCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            wishlist: [],
            listBody: [],
            listname: '',
            listnum: 1,
            username: ''
        }
        this.getBody = this.getBody.bind(this);
        this.toCart = this.toCart.bind(this);
    }

    toCart() {

    }

    getBody(books) {
        let body = books.map(entry => {
            return (
                <tr key={entry.bookid}>
                    <td>{entry.title}</td>
                    <td>
                        <button type='button' class='btn btn-outline-dark'>
                            Move to cart
                        </button>
                        <Button
                            onClick={this.toCart.bind(this)}
                            style={{
                                backgroundColor: 'rgba(0,0,0,0)',
                                border: 'none'
                            }}
                        >
                            <Icon name='close' color='red'/>
                        </Button>
                    </td>
                </tr>
            );
        });
        this.setState({ listBody: body });
    }

    render() {
        var name = this.state.listname;
        return(
            <div id='purchase-container'>
                <div id='purchase-body'>
                    <h1 className='display-4' style={{ marginBottom: '3%' }}>
                        { name }
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
