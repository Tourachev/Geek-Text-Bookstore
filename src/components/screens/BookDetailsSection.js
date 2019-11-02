// gonna make book card a click event
//include a readmore click event
import React from "react";
import { Button } from "react-bootstrap";
import { Icon } from "semantic-ui-react";
import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom';

class DetailsSection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bookData: {
                author: "Chinua Achebe",
                authorid: null,
                bookid: 1,
                date: "1958-01-01",
                genre: "Nonfiction",
                imagelink: "https://images-na.ssl-images-amazon.com/images/I/91yNF5xdR4L.jpg",
                price: 9.99,
                rating: 4,
                sales: 400,
                title: "Things Fall apart",
                topseller: 0
            }
        }

        this.getRating = this.getRating.bind(this);
    }

    componentDidMount(){
        fetch('/books/getBook', {
            method: 'POST',
            body: JSON.stringify({
                bookid: this.props.bookid,
            }),
            headers: { 'Content-Type': 'application/json' }
        }).then(res => res.json()).then(details => {
            this.setState({bookData:details.result[0]})
            console.log(this.state.bookData);
        });
    }

    getRating(rating) {
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

    render() {
        return (
            <div clsas='book-container'>
                <div class='book-body'>
                <div className='popup'>
<div className='popup\_inner'>
<h1>{this.props.text}</h1>
<button onClick={this.props.closePopup}>close me</button>
</div>
</div>
                    <div class="book-imgcontainer">
                        <img class="book-img" src={this.state.bookData.imagelink}></img>
                    </div>

                    <div class="book-details">
                        <h1>{this.state.bookData.title}</h1>
                        <Link to={{pathname: "/author/" + this.state.bookData.author}}><h2 id="subtitle">{this.state.bookData.author}</h2></Link>
                        <div id="book-rating">
                            <div id="stars">
                                {this.getRating(this.state.bookData.rating)}
                            </div>
                            <p id="rating-text"> 10 Reviews | 10 Comments</p>
                        </div>
                        <h3>${this.state.bookData.price}</h3>
                        <p>
                            Skid on floor, crash into wall dismember a mouse and then regurgitate parts of it on the family room floor, munch on tasty moths. I bet my nine lives on you-oooo-ooo-hooo purr as loud as possible, be the most annoying cat that you can, and, knock everything off the table, for cough furball yowling nonstop the whole night. Stare at ceiling pretend not to be evil. Cough hairball, eat toilet paper. Cough hairball, eat toilet paper jump on human and sleep on her all night long be long in the bed, purr in the morning and then give a bite to every human around for not waking up request food, purr loud scratch the walls, the floor, the windows, the humans and you call this cat food and drool. Spit up on light gray carpet
                        </p>
                        <div class="book-rating">
                            <Button size="lg" style={{ width: "30%", marginRight:"5vw" }}>Purchase</Button>
                            <Button size="lg" style={{ width:"30%"}} class="option-button">Save to Wishlist</Button>
                        </div>
                    </div>
                </div>
                <div class="section">
                    <h1>ABOUT THE AUTHOR</h1>
                    <p>Skid on floor, crash into wall dismember a mouse and then regurgitate parts of it on the family room floor, munch on tasty moths. I bet my nine lives on you-oooo-ooo-hooo purr as loud as possible, be the most annoying cat that you can, and, knock everything off the table, for cough furball yowling nonstop the whole night. Stare at ceiling pretend not to be evil. Cough hairball, eat toilet paper. Cough hairball, eat toilet paper jump on human and sleep on her all night long be long in the bed, purr in the morning and then give a bite to every human around for not waking up request food, purr loud scratch the walls, the floor, the windows, the humans and you call this cat food and drool. Spit up on light gray carpet</p>
                </div>
                <div class="section">
                    <h1>Ratings AND Comments</h1>
                </div>
            </div>
        );
    }
}

export default DetailsSection;
