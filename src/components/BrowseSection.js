import React from "react";

import BookCard from "./BookCard";

class BrowseSection extends React.Component {
    constructor(props) {
        super(props);
        this.state = { books: [] };
    }

    sortAlphabeticaly() {
        this.setState = this.state.books.sort((a, b) =>
            a.author > b.author ? 1 : -1
        );

        console.log(this.state.books);
    }

    componentDidMount() {
        fetch("/books")
            .then(res => res.json())
            .then(books => this.setState({ books }));
    }

    render() {
        const card = this.state.books.map(book => (
            <BookCard
                bookID={book.bookID}
                title={book.title}
                author={book.author}
                genre={book.genre}
                price={book.price}
            />
        ));

        return (
            <div id='browse-body'>
                <div id='nav-browse-body'>
                    <div class='dropdown'>
                        <button
                            type='button'
                            class='btn btn-lg btn-light dropdown-toggle'
                            data-toggle='dropdown'
                            aria-haspopup='true'
                            aria-expanded='false'
                        >
                            Sort By
                        </button>
                        <div class='dropdown-menu'>
                            <a
                                class='dropdown-item'
                                href='#'
                                onClick={() => this.sortAlphabeticaly()}
                            >
                                Author: A-Z
                            </a>
                            <a class='dropdown-item' href='#'>
                                Author: Z-A
                            </a>
                            <a class='dropdown-item' href='#'>
                                Title: A-Z
                            </a>
                            <a class='dropdown-item' href='#'>
                                Title: Z-A
                            </a>
                            <a class='dropdown-item' href='#'>
                                Price: Low-High
                            </a>
                            <a class='dropdown-item' href='#'>
                                Price: High-Low
                            </a>
                            <a class='dropdown-item' href='#'>
                                Date: Old-New
                            </a>
                            <a class='dropdown-item' href='#'>
                                Date: New-Old
                            </a>
                            <a class='dropdown-item' href='#'>
                                Rating: High-Low
                            </a>
                            <a class='dropdown-item' href='#'>
                                Rating: Low-High
                            </a>
                        </div>
                    </div>

                    <div class='dropdown'>
                        <button
                            type='button'
                            class='btn btn-lg btn-light dropdown-toggle'
                            data-toggle='dropdown'
                            aria-haspopup='true'
                            aria-expanded='false'
                        >
                            Books Per Page:
                        </button>
                        <div class='dropdown-menu'>
                            <a class='dropdown-item' href='#'>
                                10
                            </a>
                            <a class='dropdown-item' href='#'>
                                20
                            </a>
                        </div>
                    </div>
                </div>
                <hr className='sexy_line' />

                <div id='card-body'>{card}</div>
                <div id='browse-body-bottom'>
                    <nav aria-label='Page navigation example'>
                        <ul class='pagination pagination-lg'>
                            <li class='page-item'>
                                <a class='page-link' href='#'>
                                    Previous
                                </a>
                            </li>
                            <li class='page-item'>
                                <a class='page-link' href='#'>
                                    1
                                </a>
                            </li>
                            <li class='page-item'>
                                <a class='page-link' href='#'>
                                    2
                                </a>
                            </li>
                            <li class='page-item'>
                                <a class='page-link' href='#'>
                                    3
                                </a>
                            </li>
                            <li class='page-item'>
                                <a class='page-link' href='#'>
                                    Next
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        );
    }
}

export default BrowseSection;
