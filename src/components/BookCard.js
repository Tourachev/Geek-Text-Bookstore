import React from "react";
import faker from "faker";

const BookCard = props => {
    return (
        <div>
            <div class='card'>
                <img src={faker.image.cats()} class='card-img-top' alt='...' />
                <div class='card-body'>
                    <h5 class='card-title'>{props.title}</h5>
                    <p class='card-text'>
                        Some quick example text to build on the card title and
                        make up the bulk of the card's content.
                    </p>
                </div>
                <ul class='list-group list-group-flush'>
                    <li class='list-group-item'>Book ID: {props.bookID}</li>
                </ul>
                <div class='card-body'>
                    <a href='#' class='card-link'>
                        Card link
                    </a>
                    <a href='#' class='card-link'>
                        Another link
                    </a>
                </div>
            </div>
        </div>
    );
};

export default BookCard;
