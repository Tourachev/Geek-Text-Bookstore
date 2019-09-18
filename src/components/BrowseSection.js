import React from 'react';

import BookCard from './BookCard';

class BrowseSection extends React.Component {
    constructor(props) {
        super(props);
        this.state = { books: [] };
    }

    componentDidMount() {
        fetch('/books')
            .then(res => res.json())
            .then(books => this.setState({ books }));
    }

    sortAuthorA2Z(props) {
        this.setState = this.state.books.sort((a, b) =>
            a.author > b.author ? 1 : -1
        );
        this.forceUpdate();
    }

    sortAuthorZ2A(props) {
        this.setState = this.state.books.sort((a, b) =>
            a.author < b.author ? 1 : -1
        );
        this.forceUpdate();
    }

    sortTitleA2Z(props) {
        this.setState = this.state.books.sort((a, b) =>
            a.title > b.title ? 1 : -1
        );
        this.forceUpdate();
    }

    sortTitleZ2A(props) {
        this.setState = this.state.books.sort((a, b) =>
            a.title < b.title ? 1 : -1
        );
        this.forceUpdate();
    }
    sortPriceL2H(props) {
        this.setState = this.state.books.sort((a, b) => a.price - b.price);
        this.forceUpdate();
    }
    sortPriceH2L(props) {
        this.setState = this.state.books.sort((a, b) => b.price - a.price);
        this.forceUpdate();
    }

    sortDateL2H(props) {
        this.setState = this.state.books.sort((a, b) => a.date - b.date);
        this.forceUpdate();
    }
    sortDateH2L(props) {
        this.setState = this.state.books.sort((a, b) => b.date - a.date);
        this.forceUpdate();
    }

    sortRatingL2H(props) {
        this.setState = this.state.books.sort((a, b) => a.rating - b.rating);
        this.forceUpdate();
    }
    sortRatingH2L(props) {
        this.setState = this.state.books.sort((a, b) => b.rating - a.rating);
        this.forceUpdate();
    }

    render() {
        const card = this.state.books.map(book => (
            <BookCard
                bookID={book.bookID}
                title={book.title}
                author={book.author}
                genre={book.genre}
                price={book.price}
                rating={book.rating}
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
                                onClick={() => this.sortAuthorA2Z()}
                            >
                                Author: A-Z
                            </a>
                            <a
                                class='dropdown-item'
                                onClick={() => this.sortAuthorZ2A()}
                            >
                                Author: Z-A
                            </a>
                            <a
                                class='dropdown-item'
                                onClick={() => this.sortTitleA2Z()}
                            >
                                Title: A-Z
                            </a>
                            <a
                                class='dropdown-item'
                                onClick={() => this.sortTitleZ2A()}
                            >
                                Title: Z-A
                            </a>
                            <a
                                class='dropdown-item'
                                onClick={() => this.sortPriceL2H()}
                            >
                                Price: Low-High
                            </a>
                            <a
                                class='dropdown-item'
                                onClick={() => this.sortPriceH2L()}
                            >
                                Price: High-Low
                            </a>
                            <a
                                class='dropdown-item'
                                onClick={() => this.sortDateL2H()}
                            >
                                Date: Old-New
                            </a>
                            <a
                                class='dropdown-item'
                                onClick={() => this.sortDateH2L()}
                            >
                                Date: New-Old
                            </a>
                            <a
                                class='dropdown-item'
                                onClick={() => this.sortRatingL2H()}
                            >
                                Rating: Low-High
                            </a>
                            <a
                                class='dropdown-item'
                                onClick={() => this.sortRatingH2L()}
                            >
                                Rating: High-Low
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
