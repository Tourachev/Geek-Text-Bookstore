// gonna make book card a click event
//include a readmore click event

import React from 'react';
import {Button} from 'react-bootstrap';
import {Icon} from 'semantic-ui-react';
import {useParams} from 'react-router-dom';
import {Link} from 'react-router-dom';
import ModalImage from 'react-modal-image';
import Context from '../Context';
import CommentSection from './CommentSection';

class DetailsSection extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			bookData: {
				author: 'Author Name',
				authorid: 999,
				bookDesc: 'Book Description',
				bookid: 9999,
				date: '1000-01-01',
				genre: 'A Genre',
				imagelink: 'A URL',
				price: 0.99,
				publisher: "Publisher's Inc",
				rating: 1,
				title: 'Book Title'
			},

			authorData: {
				authorid: 999,
				bio: "Author's Life History",
				name: 'Author Name',
				img: 'A URL'
			},

			commentData: []
		};
		this.getStars = this.getStars.bind(this);
		this.getAverage = this.getAverage.bind(this);
	}

	componentDidMount() {
		fetch('/books/getBook', {
			method: 'POST',
			body: JSON.stringify({
				bookid: this.props.bookid
			}),
			headers: {'Content-Type': 'application/json'}
		})
			.then(res => res.json())
			.then(details => {
				console.log(details.result[0].authorid);
				fetch('/books/getAuthInfo', {
					method: 'POST',
					body: JSON.stringify({
						authorid: details.result[0].authorid
					}),
					headers: {'Content-Type': 'application/json'}
				})
					.then(res => res.json())
					.then(author => {
						this.setState({authorData: author.result[0]});
						console.log(this.state.authorData);
					});
				this.setState({bookData: details.result[0]});
				console.log(this.state.bookData);
			});
		fetch('/books/getComments', {
			method: 'POST',
			body: JSON.stringify({
				bookid: this.props.bookid
			}),
			headers: {'Content-Type': 'application/json'}
		})
			.then(res => res.json())
			.then(details => {
				this.setState({commentData: details});
			});
	}

	getAverage() {
		let rating = 0,
			commList = this.state.commentData;
		if (this.state.commentData.length > 0) {
			rating =
				commList
					.map(comment => comment.rating)
					.reduce((total, val) => {
						total += val;
						return total;
					}) / commList.length;
			console.log('RATING: ' + rating);
		}
		return this.getStars(rating);
	}

	getStars(rating) {
		let count = 0;
		let stars = [];
		while (count < rating) {
			stars.push(<i class='fas fa-star'></i>);
			count++;
		}

		while (count < 5) {
			stars.push(<i class='far fa-star'></i>);
			count++;
		}
		return stars;
	}

	render() {
		return (
			<div clsas='book-container'>
				<div class='book-body'>
					<h1>{this.props.text}</h1>

					<div class='book-imgcontainer'>
						<ModalImage
							small={this.state.bookData.imagelink}
							large={this.state.bookData.imagelink}
							className='card-top'
							alt={this.state.bookData.title}
						/>
					</div>

					<div class='book-details'>
						<h1>{this.state.bookData.title}</h1>
						<Link
							to={{
								pathname:
									'/author/' + this.state.bookData.author
							}}
						>
							<h2 id='subtitle'>{this.state.bookData.author}</h2>
						</Link>
						<p>
							Published By <b>{this.state.bookData.publisher}</b>
						</p>
						<div id='book-rating'>
							<div id='stars'>
								{this.getAverage(this.state.bookData.rating)}
							</div>
							<p id='rating-text'>
								{this.state.commentData.length} Reviews
							</p>
						</div>
						<h3>${this.state.bookData.price}</h3>
						<p>{this.state.bookData.bookDesc}</p>
						<div class='book-rating'>
							<Link to='/cart'>
								<Button
									size='lg'
									style={{width: '30%', marginRight: '5vw'}}
								>
									Purchase
								</Button>
							</Link>
							<Link to='/wishlist'>
								<Button
									size='lg'
									style={{width: '30%'}}
									class='option-button'
								>
									Save to Wishlist
								</Button>
							</Link>
						</div>
					</div>
				</div>
				<div class='section'>
					<h1>About the Author</h1>
					<div class='author-details'>
						<img
							class='author-img'
							src={this.state.authorData.img}
						></img>
						<p>
							<h1 style={{marginBottom: '3%'}}>
								{this.state.bookData.author}
							</h1>
							{this.state.authorData.bio}
						</p>
					</div>
				</div>
				<div class='section'>
					<h1>Comments</h1>
					{/* <Context.Provider value={{state: this.state.bookData}}>
                    <Link to={{pathname:"/comments" + "/book/" + this.props.bookid }} >
                    <Button size="lg" style={{ width: "30%", marginRight:"5vw" }}>Comments</Button>
                    </Link>
                    </Context.Provider> */}
					<Context.Consumer>
						{context => (
							<CommentSection
								bookid={this.props.bookid}
								imagelink={this.state.bookData.imagelink}
								title={this.state.bookData.title}
								username={context.username}
								isLoggedIn={context.isLoggedIn}
							/>
						)}
					</Context.Consumer>
				</div>
			</div>
		);
	}
}

export default DetailsSection;
