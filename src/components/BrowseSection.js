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

    render() {
        const card = this.state.books.map(book => (
            <BookCard
                bookID={book.bookID}
                title={book.title}
                author={book.author}
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
                            <a class='dropdown-item' href='#'>
                                Action
                            </a>
                            <a class='dropdown-item' href='#'>
                                Another action
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
                            Sort By
                        </button>
                        <div class='dropdown-menu'>
                            <a class='dropdown-item' href='#'>
                                Action
                            </a>
                            <a class='dropdown-item' href='#'>
                                Another action
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
