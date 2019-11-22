import React, { Component } from "react";
import PropTypes from "prop-types";
import "../css/stars.css";

const Star = ({ selected = false, onClick = f => f }) => (
  <div className={selected ? "star selected" : "star"} onClick={onClick}></div>
);

Star.propTypes = {
  selected: PropTypes.bool,
  onClick: PropTypes.func
};

export class FormComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFeteching: false,
      loading: false,
      error: "",
      totalStars: 5,

      nickname: "",
      comment: "",
      rating: 0, // adding the star rating system
      bookid: this.props.bookid,
      userid: this.props.username
    };

    //bind context to methods
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    //bind the starChange
    this.starChange = this.starChange.bind(this);
  }

  // componentDidMount() {
  //     fetch('/personal-info', {
  //         method: 'POST',
  //         body: JSON.stringify({username: this.props.username}),
  //         headers: {'Content-Type': 'application/json'}
  //     })
  //         .then(res => res.json())
  //         .then(personalInfo =>
  //             this.setState({
  //                 nickname: personalInfo.nickname
  //             })
  //         )
  //         .catch(err => {
  //             console.log(err);
  //         });
  // }

  starChange(event) {
    this.setState({
      ...this.state,
      rating: event // adding the star rating system
    });
  }

  /**
   * Handle form input field changes & update the state
   */
  handleFieldChange = event => {
    const { value, name } = event.target;

    this.setState({
      [name]: value
    });
  };

  //   componentDidMount() {
  //     //let {comment} = this.state;
  //     fetch('/personal-info', {
  //         method: 'POST',
  //         body: JSON.stringify({username: this.state.username}),
  //         headers: {'Content-Type': 'application/json'}
  //     })
  //         .then(res => res.json())
  //         .then(personalInfo =>
  //             this.setState({
  //                 nickname: personalInfo
  //             })
  //         )
  //         .catch(err => {
  //             console.log(err);
  //         });
  // }

  /**
   * Form submit handler
   */
  onSubmit(event) {
    event.preventDefault();

    if (!this.isFormValid()) {
      this.setState({ error: "All fields are required." });
      return;
    }

    // loading status and clear error
    this.setState({ error: "", loading: true });

    // persist the comments on server
    let { data } = this.state;
    fetch("/comments/insertComment", {
      method: "post",
      body: JSON.stringify({
        nickname: this.state.nickname,
        comment: this.state.comment,
        rating: this.state.rating, // adding the star rating system
        bookid: this.state.bookid,
        userid: this.state.userid
      }),
      headers: { "Content-Type": "application/json" }
    })
      .then(res => res.json())
      .then(res => {
        if (res.error) {
          this.setState({ loading: false, error: res.error });
        } else {
          // add time return from api and push comment to parent state
          // comment.rating = res.rating;
          this.props.addComment(data);

          // clear the message box
          this.setState({
            loading: false,
            comments: {
              nickname: "",
              comment: "",
              rating: 0, // adding the star rating system
              bookid: this.state.bookid,
              userid: this.state.userid
            }
          });
        }
      })
      .catch(err => {
        this.setState({
          error: "Something went wrong while submitting form.",
          loading: false
        });
      });
  }

  isFormValid() {
    return (
      this.state.nickname !== "" &&
      this.state.comment !== "" &&
      this.state.rating !== 0
    );
  }

  renderError() {
    return this.state.error ? (
      <div className='alert alert-danger'>{this.state.error}</div>
    ) : null;
  }

  render() {
    return (
      <React.Fragment>
        <p>{this.state.userid}</p>
        <p>{this.state.bookid}</p>
        {/* <p>{this.state.nickname}</p> */}
        <form method='post' onSubmit={this.onSubmit}>
          <div className='form-group'>
            <input
              onChange={this.handleFieldChange}
              value={this.state.nickname}
              className='form-control'
              placeholder='🙂 Your Nickname'
              name='nickname'
              type='text'
            />
          </div>

          <div className='form-group'>
            <textarea
              onChange={this.handleFieldChange}
              value={this.state.comment}
              className='form-control'
              placeholder='📚 Your Comment'
              name='comment'
              rows='5'
            />
          </div>

          {this.renderError()}

          <div className='star-rating'>
            {[...Array(this.state.totalStars)].map((x, i) => (
              <Star
                key={i}
                selected={i < this.state.rating}
                onClick={() => this.starChange(i + 1)}
              />
            ))}
            <p>
              {this.state.rating} of {this.state.totalStars} stars
            </p>
          </div>
          <br />

          <div className='form-group'>
            <button disabled={this.state.loading} className='btn btn-primary'>
              Comment ➤
            </button>
          </div>
        </form>
      </React.Fragment>
    );
  }
}
export default FormComponent;
