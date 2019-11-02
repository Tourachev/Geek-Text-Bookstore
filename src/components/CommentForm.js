import React, { Component } from "react";
import moment from "moment";

export default class CommentForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      comments: this.props.commentsList || [],
      newComment: {
        name: "",
        text: "",
        slug: this.props.slug,
        parentCommentId: null
      },
      submitting: false,
      success: false,
      error: false
    };
  }

  onSubmitComment = async event => {
    event.preventDefault();
    alert("Submitted!");

    // Set this so the button can't be pressed repeatedly
    this.setState({ submitting: true });

    const { newComment, comments } = this.state;
    const { slug } = this.props;

    try {
      // POST to /comments
      const response = await fetch("https://www.example.com/comments", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        method: "post",
        body: JSON.stringify(newComment)
      });

      // Append comment and reset newComment
      this.setState(prevState => ({
        ...prevState,
        comments: [newComment, ...comments],
        newComment: {
          name: "",
          text: "",
          slug,
          parentCommentId: null
        },
        success: true,
        error: false
      }));
    } catch (error) {
      this.setState({ ...this.initialState, error: true });
    }
  };

  handleChange = event => {
    const { newComment } = this.state;
    const { name, value } = event.target;

    this.setState({
      newComment: { ...newComment, [name]: value }
    });
  };

  render() {
    const {
      submitting,
      success,
      error,
      comments,
      newComment: { name, text }
    } = this.state;

    const showError = () =>
      error && (
        <div className="error">
          <p>Comment failed to submit.</p>
        </div>
      );

    const showSuccess = () =>
      success && (
        <div className="success">
          <p>Comment submitted!</p>
        </div>
      );

    const commentform = () => (
      <form id="new-comment" onSubmit={this.onSubmitComment}>
        <input
          type="text"
          name="name"
          id="name"
          value={name}
          onChange={this.handleChange}
          maxLength="255"
          placeholder="Name"
          required
        />
        <textarea
          rows="2"
          cols="5"
          name="text"
          id="text"
          value={text}
          onChange={this.handleChange}
          placeholder="Comment"
          required
        />
        <button
          type="submit"
          disabled={!name || !text || text.length < 20 || submitting}
        >
          Submit
        </button>
      </form>
    );

    return (
      <section id="comments">
        {success || error ? showError() || showSuccess() : commentform()}
        {comments.length > 0 &&
          comments
            .filter(comment => !comment.parent_comment_id)
            .map((comment, i) => {
              let child;
              if (comment.id) {
                child = comments.find(c => comment.id === c.parent_comment_id);
              }

              return (
                <div className="comment" key={i}>
                  <header>
                    <h2>{comment.name}</h2>
                    <div className="comment-date">
                      {moment(comment.date).fromNow()}
                    </div>
                  </header>
                  <p>{comment.text}</p>
                  {child && (
                    <div className="comment reply">
                      <header>
                        <h2>{child.name}</h2>
                        <div className="comment-date">
                          {moment(child.date).fromNow()}
                        </div>
                      </header>
                      <p>{child.text}</p>
                    </div>
                  )}
                </div>
              );
            })}
      </section>
    );
  }
}
