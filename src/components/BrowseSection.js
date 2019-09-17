import React from "react";

import BookCard from "./BookCard";

class BrowseSection extends React.Component {
    constructor(props) {
        super(props);
        this.state = { books: [] };
    }

    componentDidMount() {
        fetch("/books")
            .then(res => res.json())
            .then(books => this.setState({ books }));
        console.log(this.state.books);
    }

    render() {
        const card = this.state.books.map(book => (
            <BookCard bookID={book.bookID} title={book.title} />
        ));

        return (
            <div>
                <div class='btn-group dropright'>
                    <button
                        type='button'
                        class='btn btn-secondary dropdown-toggle'
                        data-toggle='dropdown'
                        aria-haspopup='true'
                        aria-expanded='false'
                    >
                        Dropright
                    </button>
                    <div class='dropdown-menu'></div>
                </div>
                <div id='browse-body'>{card}</div>
            </div>
        );
    }
}

export default BrowseSection;
