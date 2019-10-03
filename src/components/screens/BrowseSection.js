import React from 'react';

import BookCard from '../BookCard';
class BrowseSection extends React.Component {

  constructor(props) {
    super(props);
    this.state = { books: [] };
  }

  //the states
  state = {
    data: null,
    total: null,
    per_page: null,
    current_page: 1
  };

  componentDidMount() {
    this.makeHttpRequestWithPage(1);
  }

  makeHttpRequestWithPage = async pageNumber => {
    let response = await fetch(
      `https://reqres.in/api/users?page=${pageNumber}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      }
    );

    const data = await response.json();

    this.setState({
      data: data.data,
      total: data.total,
      per_page: data.per_page,
      current_page: data.page
    });
  };

  sortAlphabeticaly() {
    this.setState = this.state.books.sort((a, b) =>
      a.author > b.author ? 1 : -1
    );

    // console.log(this.state.books);
  }

  componentDidMount() {
    fetch("/books")
      .then(res => res.json())
      .then(books =>
        this.setState({
          books
        })
      );
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
    this.setState = this.state.books.sort((a, b) => (b.date < a.date ? 1 : -1));
    this.forceUpdate();
  }
  sortDateH2L(props) {
    this.setState = this.state.books.sort((a, b) => (a.date < b.date ? 1 : -1));
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
    let renderPageNumbers;
    const card = this.state.books.map(book => (
      <BookCard
        bookID={book.bookID}
        title={book.title}
        author={book.author}
        genre={book.genre}
        price={book.price}
        rating={book.rating}
        date={book.date}
      />
    ));

    const pageNumbers = [];

    if (this.state.total !== null) {
      for (
        let i = 1;
        i <= Math.ceil(this.state.total / this.state.per_page);
        i++
      ) {
        pageNumbers.push(i);
      }
    }

    // renderPageNumbers = pageNumbers.map(number => {
    //     let classes =
    //         this.state.current_page === number ? styles.active : '';

    //     if (
    //         number === 1 ||
    //         number === this.state.total ||
    //         (number >= this.state.current_page - 1 &&
    //             number <= this.state.current_page + 1)
    //     ) {
    //         return (
    //             <span
    //                 key={number}
    //                 className={classes}
    //                 onClick={() => this.makeHttpRequestWithPage(number)}
    //             >
    //                 {number}
    //             </span>
    //         );
    //     }
    // });

    return (
      <div id="browse-body">
        <div id="nav-browse-body">
          <div class="dropdown">
            <button
              type="button"
              class="btn btn-lg btn-light dropdown-toggle"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Sort By
            </button>
            <div class="dropdown-menu">
              <a class="dropdown-item" onClick={() => this.sortAuthorA2Z()}>
                Author: A-Z
              </a>
              <a class="dropdown-item" onClick={() => this.sortAuthorZ2A()}>
                Author: Z-A
              </a>
              <a class="dropdown-item" onClick={() => this.sortTitleA2Z()}>
                Title: A-Z
              </a>
              <a class="dropdown-item" onClick={() => this.sortTitleZ2A()}>
                Title: Z-A
              </a>
              <a class="dropdown-item" onClick={() => this.sortPriceL2H()}>
                Price: Low-High
              </a>
              <a class="dropdown-item" onClick={() => this.sortPriceH2L()}>
                Price: High-Low
              </a>
              <a class="dropdown-item" onClick={() => this.sortDateL2H()}>
                Date: Old-New
              </a>
              <a class="dropdown-item" onClick={() => this.sortDateH2L()}>
                Date: New-Old
              </a>
              <a class="dropdown-item" onClick={() => this.sortRatingL2H()}>
                Rating: Low-High
              </a>
              <a class="dropdown-item" onClick={() => this.sortRatingH2L()}>
                Rating: High-Low
              </a>
=======
    constructor(props) {
        super(props);
        this.state = {
            books: [],
            ogBooks: []
        };
    }

    handleInputChange(event) {
        const target = event.target;
        const isChecked =
            target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        let value = target.value;
        const ogList = this.state.ogBooks;

        if (name === 'rating') {
            value = parseInt(value);
        }

        if (isChecked === true) {
            let filteredList = this.state.books.filter(book => {
                if (book[name] === value) {
                    return true;
                } else {
                    return false;
                }
            });
            console.log(filteredList);
            this.setState({
                books: filteredList
            });
            this.forceUpdate();
        } else {
            this.setState({
                books: ogList
            });
            console.log('False');
        }
    }

    sortAlphabeticaly() {
        this.setState = this.state.books.sort((a, b) =>
            a.author > b.author ? 1 : -1
        );

        console.log(this.state.books);
    }

    componentDidMount() {
        fetch('/books')
            .then(res => res.json())
            .then(books => this.setState({ books: books, ogBooks: books }));
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
        this.setState = this.state.books.sort((a, b) =>
            b.date < a.date ? 1 : -1
        );
        this.forceUpdate();
    }
    sortDateH2L(props) {
        this.setState = this.state.books.sort((a, b) =>
            a.date < b.date ? 1 : -1
        );
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
                date={book.date}
            />
        ));

        return (
            <div id='browse-container'>
                <div id='sidebar'>
                    <div>
                        <h2>Genre</h2>
                        <p>
                            Sci-Fi{' '}
                            <input
                                name='genre'
                                value='Sci-Fi'
                                type='checkbox'
                                onChange={this.handleInputChange.bind(this)}
                            />
                        </p>
                        <p>
                            Biography{' '}
                            <input
                                name='genre'
                                value='Biography'
                                type='checkbox'
                                onChange={this.handleInputChange.bind(this)}
                            />
                        </p>
                        <p>
                            Horror{' '}
                            <input
                                name='genre'
                                value='Horror'
                                type='checkbox'
                                onChange={this.handleInputChange.bind(this)}
                            />
                        </p>
                        <p>
                            Pulp Fiction{' '}
                            <input
                                name='genre'
                                value='Pulp Fiction'
                                type='checkbox'
                                onChange={this.handleInputChange.bind(this)}
                            />
                        </p>
                        <p>
                            Drama{' '}
                            <input
                                name='genre'
                                value='Drama'
                                type='checkbox'
                                onChange={this.handleInputChange.bind(this)}
                            />
                        </p>
                        <p>
                            Comedy{' '}
                            <input
                                name='genre'
                                value='Comedy'
                                type='checkbox'
                                onChange={this.handleInputChange.bind(this)}
                            />
                        </p>
                        <hr />
                        <h3>
                            Top Sellers Only <input type='checkbox' />
                        </h3>
                        <hr />
                        <h2>Rating</h2>
                        <p>
                            <i class='fas fa-star'></i>
                            <i class='fas fa-star'></i>
                            <i class='fas fa-star'></i>
                            <i class='fas fa-star'></i>
                            <i class='fas fa-star'></i>{' '}
                            <input
                                name='rating'
                                value='5'
                                type='checkbox'
                                onChange={this.handleInputChange.bind(this)}
                            />
                        </p>
                        <p>
                            <i class='fas fa-star'></i>
                            <i class='fas fa-star'></i>
                            <i class='fas fa-star'></i>
                            <i class='fas fa-star'></i>{' '}
                            <input
                                name='rating'
                                value='4'
                                type='checkbox'
                                onChange={this.handleInputChange.bind(this)}
                            />
                        </p>
                        <p>
                            <i class='fas fa-star'></i>
                            <i class='fas fa-star'></i>
                            <i class='fas fa-star'></i>{' '}
                            <input
                                name='rating'
                                value='3'
                                type='checkbox'
                                onChange={this.handleInputChange.bind(this)}
                            />
                        </p>
                        <p>
                            <i class='fas fa-star'></i>
                            <i class='fas fa-star'></i>{' '}
                            <input
                                name='rating'
                                value='2'
                                type='checkbox'
                                onChange={this.handleInputChange.bind(this)}
                            />
                        </p>
                        <p>
                            <i class='fas fa-star'></i>{' '}
                            <input
                                name='rating'
                                value='1'
                                type='checkbox'
                                onChange={this.handleInputChange.bind(this)}
                            />
                        </p>
                    </div>
                </div>

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

            </div>
          </div>

          <div class="dropdown">
            <button
              type="button"
              class="btn btn-lg btn-light dropdown-toggle"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Books Per Page:
            </button>
            <div class="dropdown-menu">
              <a class="dropdown-item" href="#">
                10
              </a>
              <a class="dropdown-item" href="#">
                20
              </a>
            </div>
          </div>
        </div>
        <hr className="sexy_line" />

        <div id="card-body">{card}</div>
        <div id="browse-body-bottom">
          {/* <div className={styles.pagination}> */}
          <span onClick={() => this.makeHttpRequestWithPage(1)}>&laquo;</span>
          {renderPageNumbers}
          <span onClick={() => this.makeHttpRequestWithPage(1)}>&raquo;</span>
        </div>
      </div>
      //   </div>
    );
  }
}

export default BrowseSection;
