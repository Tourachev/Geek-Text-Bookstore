import React from "react";
import ModalImage from "react-modal-image";
import { Link } from "react-router-dom";

class BookCard extends React.Component {
    constructor(props) {
        super(props);
    }

    addToCartHandler = event => {
        event.preventDefault();

        console.log(this.props.username);
        console.log(this.props.bookID);

        fetch("/cart/insert", {
            method: "POST",
            body: JSON.stringify({
                username: this.props.username,
                bookID: this.props.bookID,
                quantity: 1,
                price: this.props.price,
                title: this.props.title
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
            })
            .then(alert("Submitted!"));
    };

    addToLaterHandler = event => {
        event.preventDefault();

        console.log(this.props.username);
        console.log(this.props.bookID);

        fetch("/saved-for-later/insert", {
            method: "POST",
            body: JSON.stringify({
                username: this.props.username,
                bookID: this.props.bookID,
                quantity: 1,
                price: this.props.price,
                title: this.props.title
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
            })
            .then(alert("Submitted!"));
    };

    render() {
        if (this.props.isLoggedIn) {
            return (
                <div>
                    <div class='card'>
                        <ModalImage
                            small={this.props.image}
                            large={this.props.image}
                            className='card-top'
                            alt={this.props.title}
                        />
                        <div class='card-body'>
                            <h5 class='card-title'>{this.props.author}</h5>
                            <Link
                                to={{ pathname: "/book/" + this.props.bookID }}
                            >
                                <p class='card-text'>{this.props.title}</p>
                            </Link>
                        </div>
                        <ul class='list-group list-group-flush'>
                            <li class='list-group-item'>
                                Genre: {this.props.genre}
                            </li>
                            <li class='list-group-item'>
                                Price: ${this.props.price}
                            </li>
                            <li class='list-group-item'>
                                Rating: {this.props.rating}
                            </li>
                            <li class='list-group-item'>
                                Release Date: {this.props.date}
                            </li>
                            {/* <li class='list-group-item'>Book ID: {props.bookID}</li> */}
                        </ul>
                        <div class='card-body card-links'>
                            <button
                                type='button'
                                class='btn btn-secondary cart-button'
                                onClick={event => this.addToCartHandler(event)}
                            >
                                Add to Cart
                            </button>
                            <button
                                type='button'
                                class='btn btn-secondary cart-button'
                                onClick={event => this.addToLaterHandler(event)}
                            >
                                Save For later
                            </button>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div>
                    <div class='card'>
                        {/* <img
                            src={this.props.image}
                            className='card-top image-zoom'
                            alt={this.props.title}
                        /> */}
                        <ModalImage
                            small={this.props.image}
                            large={this.props.image}
                            className='card-top'
                            alt={this.props.title}
                        />
                        <div class='card-body'>
                            <h5 class='card-title'>{this.props.author}</h5>
                            <Link
                                to={{ pathname: "/book/" + this.props.bookID }}
                            >
                                <p class='card-text'>{this.props.title}</p>
                            </Link>
                        </div>
                        <ul class='list-group list-group-flush'>
                            <li class='list-group-item'>
                                Genres: {this.props.genre}
                            </li>
                            <li class='list-group-item'>
                                Price: ${this.props.price}
                            </li>
                            <li class='list-group-item'>
                                Rating: {this.props.rating}
                            </li>
                            <li class='list-group-item'>
                                Release Date: {this.props.date}
                            </li>
                            {/* <li class='list-group-item'>Book ID: {props.bookID}</li> */}
                        </ul>
                        <div class='card-body card-links'>
                            <Link to='/login'>
                                <button
                                    type='button'
                                    className='btn btn-secondary btn-lg btn-block'
                                >
                                    Add To Cart
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

export default BookCard;
