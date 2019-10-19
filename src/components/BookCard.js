import React from 'react';
import faker from 'faker';

class BookCard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div class='card'>
                    <img
                        src={faker.image.cats()}
                        class='card-img-top'
                        alt={this.props.title}
                    />
                    <div class='card-body'>
                        <h5 class='card-title'>{this.props.author}</h5>
                        <p class='card-text'>{this.props.title}</p>
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
                        >
                            Add to Cart
                        </button>
                        <button
                            type='button'
                            class='btn btn-secondary cart-button'
                        >
                            Save For later
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default BookCard;
