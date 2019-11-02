import React from "react";
import BookCard from '../BookCard'

class AuthorWorksSection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            relatedBooks: [],
        }
    }

    componentDidMount(){
        fetch('/books')
            .then(res => res.json())
            .then(books =>{
                this.setState({relatedBooks: books.filter(book => book.author === this.props.author)});
            });
    }

    render() {
        const card = this.state.relatedBooks.map(book =>
        <BookCard
                            username={"context.username"}
                            isLoggedIn={false}
                            bookID={book.bookid}
                            title={book.title}
                            author={book.author}
                            genre={book.genre}
                            price={book.price}
                            rating={book.rating}
                            date={book.date}
                        />)
        return (
            <div class='book-container'>
                <h1>Other Works</h1>
                <div class='book-body'>{card}</div>
            </div>
        );
    }
}

export default AuthorWorksSection;
