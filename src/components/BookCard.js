import React from 'react';
import faker from 'faker';

const BookCard = props => {
    console.log(props);
    return (
        <div>
            <div class='card'>
                <img
                    src={faker.image.cats()}
                    class='card-img-top'
                    alt={props.title}
                />
                <div class='card-body'>
                    <h5 class='card-title'>{props.author}</h5>
                    <p class='card-text'>{props.title}</p>
                </div>
                <ul class='list-group list-group-flush'>
                    <li class='list-group-item'>Genre: {props.genre}</li>
                    <li class='list-group-item'>Price: ${props.price}</li>
                    <li class='list-group-item'>Rating: {props.rating}</li>
                    <li class='list-group-item'>Release Date: {props.date}</li>
                    {/* <li class='list-group-item'>Book ID: {props.bookID}</li> */}
                </ul>
                <div class='card-body card-links'>
                    <button type='button' class='btn btn-secondary cart-button'>
                        Add to Cart
                    </button>
                    <button type='button' class='btn btn-secondary cart-button'>
                        Save For later
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BookCard;
