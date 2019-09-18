import React from 'react';
import faker from 'faker';

const BookCard = props => {
    console.log(props);
    return (
        <div>
            <div class='card'>
                <img src={faker.image.cats()} class='card-img-top' alt='...' />
                <div class='card-body'>
                    <h5 class='card-title'>{props.author}</h5>
                    <p class='card-text'>{props.title}</p>
                </div>
                <ul class='list-group list-group-flush'>
                    <li class='list-group-item'>Genre: {props.genre}</li>
                    <li class='list-group-item'>Price: ${props.price}</li>
                    <li class='list-group-item'>Rating: {props.rating}</li>
                    {/* <li class='list-group-item'>Book ID: {props.bookID}</li> */}
                </ul>
                <div class='card-body card-links'>
                    <a href='#' class='card-link'>
                        Add To Cart
                    </a>
                    <a href='#' class='card-link'>
                        Save For Later
                    </a>
                </div>
            </div>
        </div>
    );
};

export default BookCard;
