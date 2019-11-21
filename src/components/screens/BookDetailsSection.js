// gonna make book card a click event
//include a readmore click event
import React from "react";
import { Button } from "react-bootstrap";
import { Table, TextArea } from "semantic-ui-react";
import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom';
import { BookImgModal } from '../BookImgModal'
import ModalImage from "react-modal-image";

class DetailsSection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bookData: {
                author: "Author Name",
                authorid: 999,
                bookDesc: "Book Description",
                bookid: 9999,
                date: "1000-01-01",
                genre: "A Genre",
                imagelink: "A URL",
                price: 0.99,
                publisher: "Publisher's Inc",
                rating: 1,
                title: "Book Title"
            },

            authorData: {
                authorid: 999,
                bio: "Author's Life History",
                name: "Author Name",
                img: "A URL"
            },

            commentData: [],
        }

        this.getStars = this.getStars.bind(this);
        this.getComments = this.getComments.bind(this);
    }

    componentDidMount(){
        fetch('/books/getBook', {
            method: 'POST',
            body: JSON.stringify({
                bookid: this.props.bookid,
            }),
            headers: { 'Content-Type': 'application/json' }
        }).then(res => res.json()).then(details => {
            console.log(details.result[0].authorid);
            fetch('/books/getAuthInfo', {
                method: 'POST',
                body: JSON.stringify({
                    authorid: details.result[0].authorid,
                }),
                headers: { 'Content-Type': 'application/json' }
            }).then(res => res.json()).then(author => {
                this.setState({authorData:author.result[0]})
                console.log(this.state.authorData);
            });
            this.setState({bookData:details.result[0]})
            console.log(this.state.bookData);
        });

        fetch('/books/getComments', {
            method: 'POST',
            body: JSON.stringify({
                bookid: this.props.bookid,
            }),
            headers: { 'Content-Type': 'application/json' }
        }).then(res => res.json()).then(details => {
            this.setState({commentData: details})
        });
    }

    getAverage() {
        let rating = 0,
            commList = this.state.commentData;
        if (this.state.commentData.length > 0) {
            rating = commList.map(comment => comment.rating).reduce((total, val) => {
                total += val
                return total / commList.length;
            })
        }
        return this.getStars(rating);
    }

    getStars(rating) {
        let count = 0;
        let stars = [];
        while(count < rating) {
            stars.push(<i class='fas fa-star'></i>)
            count++;
        }

        while (count < 5) {
            stars.push(<i class='far fa-star'></i>)
            count++;
        }
        return stars;
    }

    //THIS IS TO CREATE A QUICK COMMENT / REVIEW TABLE FOR THIS FEATURE'S SAKE. DELETE WHEN U FINISH MIGRATING
    getComments() {
        //Below all books get mapped onto the cart. Delete after
        let comm = this.state.commentData.map(comment => {
            return (
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>
                                <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                                    <div>{comment.nickname}</div>
                                    <div>{this.getStars(comment.rating)}</div>
                                </div>
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        <Table.Row>
                            <Table.Cell>{comment.comment}</Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table>
                /*<tr key={comment.authorid}>
                    <td>
                        <tr>
                            <td>AUTHOR NICKNAME</td>
                            <td>REVIEW STARS</td>
                        </tr>
                        <tr> {comment.comment} </tr>
                    </td>
                </tr>*/
            )
        })
        return comm;
    }

    render() {
        return (
            <div clsas='book-container'>
                <div class='book-body'>
                    <h1>{this.props.text}</h1>

                    <div class="book-imgcontainer">
                        <ModalImage
                            small={this.state.bookData.imagelink}
                            large={this.state.bookData.imagelink}
                            className='card-top'
                            alt={this.state.bookData.title}
                        />
                    </div>

                    <div class="book-details">
                        <h1>{this.state.bookData.title}</h1>
                        <Link to={{pathname: "/author/" + this.state.bookData.author}}><h2 id="subtitle">{this.state.bookData.author}</h2></Link>
                        <p>Published By <b>{this.state.bookData.publisher}</b></p>
                        <div id="book-rating">
                            <div id="stars">
                                {this.getAverage(this.state.bookData.rating)}
                            </div>
                            <p id="rating-text">{this.state.commentData.length} Reviews</p>
                        </div>
                        <h3>${this.state.bookData.price}</h3>
                        <p>{this.state.bookData.bookDesc}</p>
                        <div class="book-rating">
                            <Button size="lg" style={{ width: "30%", marginRight:"5vw" }}>Purchase</Button>
                            <Button size="lg" style={{ width:"30%"}} class="option-button">Save to Wishlist</Button>
                        </div>
                    </div>
                </div>
                <div class="section">
                    <h1>About the Author</h1>
                    <div class="author-details">
                        <img class="author-img" src={this.state.authorData.img}></img>
                        <p><h1 style={{ marginBottom: "3%" }}>{this.state.bookData.author}</h1>{this.state.authorData.bio}</p>
                    </div>
                </div>
                <div class="section">
                    <h1>Ratings AND Comments</h1>
                    {/* OVERWRITE THIS CODE ONCE THE REVIEW & COMMENTS ARE WORKING. */}
                    {/* FOR NOW THIS IS JUST TO GET THE BOOK DETAILS WORKING. */}
                    <div>
                        <TextArea placeholder='Write a comment on this book!' style={{width:"100%",padding:"2%"}}/>
                        {this.getComments()}
                    </div>
                </div>
            </div>
        );
    }
}

export default DetailsSection;
