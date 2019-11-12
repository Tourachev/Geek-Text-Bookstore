import React, { Component } from "react";
import { Rating } from "semantic-ui-react";
import SetRating from "./SetRating";

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
      loading: false,
      error: "",
      totalStars: 5,

      comment: {
        name: "",
        message: "",
        rating: 0 // adding the star rating system
      }
    };

    //bind context to methods
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    //bind the starChange
    this.starChange = this.starChange.bind(this);
  }

  starChange(event) {
    this.setState({
      ...this.state,
      comment: { ...this.state.comment, rating: event } // adding the star rating system
    });
  }

  /**
   * Handle form input field changes & update the state
   */
  handleFieldChange = event => {
    const { value, name } = event.target;

    this.setState({
      ...this.state,
      comment: {
        ...this.state.comment,
        [name]: value
      }
    });
  };

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
    let { comment } = this.state;
    fetch("/comment", {
      method: "post",
      body: JSON.stringify(comment),
      headers: { "Content-Type": "application/json" }
    })
      .then(res => res.json())
      .then(res => {
        if (res.error) {
          this.setState({ loading: false, error: res.error });
        } else {
          // add time return from api and push comment to parent state
          // comment.rating = res.rating;
          this.props.addComment(comment);

          // clear the message box
          this.setState({
            loading: false,
            comments: { ...comment, message: "" }
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
      this.state.comment.name !== "" &&
      this.state.comment.message !== "" &&
      this.state.comment.rating !== 0
    );
  }

  renderError() {
    return this.state.error ? (
      <div className="alert alert-danger">{this.state.error}</div>
    ) : null;
  }

  render() {
    return (
      <React.Fragment>
        <form method="post" onSubmit={this.onSubmit}>
          <div className="form-group">
            <input
              onChange={this.handleFieldChange}
              value={this.state.comment.name}
              className="form-control"
              placeholder="🙂 Your Name"
              name="name"
              type="text"
            />
          </div>

          <div className="form-group">
            <textarea
              onChange={this.handleFieldChange}
              value={this.state.comment.message}
              className="form-control"
              placeholder="📚 Your Comment"
              name="message"
              rows="5"
            />
          </div>

          {this.renderError()}

          {/* <SetRating/> */}
          <div className="star-rating">
            {[...Array(this.state.totalStars)].map((x, i) => (
              <Star
                key={i}
                selected={i < this.state.comment.rating}
                onClick={() => this.starChange(i + 1)}
              />
            ))}
            <p>
              {this.state.comment.rating} of {this.state.totalStars} stars
            </p>
          </div>
          <br />

          <div className="form-group">
            <button disabled={this.state.loading} className="btn btn-primary">
              Comment ➤
            </button>
          </div>
        </form>
      </React.Fragment>
    );
  }
}

export default FormComponent;
