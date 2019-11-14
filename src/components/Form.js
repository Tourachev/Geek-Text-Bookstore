import React, { Component } from "react";
import CommentList from "./ListComment";
import FormComponent from "./FormComponent";
import Footer from "./Footer";
import ListComment from "./ListComment";

export default class form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      loading: false
    };

    this.addComment = this.addComment.bind(this);
  }

  /**
   *
   * @param {Adcomment} comment
   */
  addComment(comment) {
    this.setState({
      loading: false,
      comments: [comment, ...this.state.comments]
    });
  }

  // componentDidMount() {
  //   //loading
  //   this.setState({ loading: true });

  //   //get all the comments
  //   fetch("/api/comments")
  //     .then(res => res.json())
  //     .then(comments => {
  //       this.setState(
  //         {
  //           comments: comments,
  //           loading: false
  //         },
  //         () => console.log("Comments fetched..", comments)
  //       );
  //     });
  //   // .catch(err => {
  //   //   this.setState({ loading: false });
  //   // });
  // }

  componentDidMount() {
    //loading mode
    this.setState({ loading: true });

    //get all the comments
    fetch("/comment")
      .then(res => res.json())
      .then(res => {
        this.setState({
          comments: res,
          loading: false
        });
      })
      .catch(err => {
        this.setState({ loading: false });
      });
  }

  render() {
    // const { comments, loading } = this.state;
    var imageName = require("../img/harryPotter.jpg");
    return (
      <React.Fragment>
        <div className='App container bg-light shadow'>
          <div>
            <img src={imageName} />
            <br />
            <h2>Harry Potter And the Goblet of Fire</h2>
          </div>
          <header className='App-header'>
            <h1 className='App-title'>
              Geek Text Comments
              <span className='px-2' role='img' aria-label='Chat'>
                💬
              </span>
            </h1>
          </header>

          <div className='row'>
            <div className='col-4  pt-3 border-right'>
              <h6>Say something about your purchase</h6>
              <FormComponent addComment={this.addComment} />
            </div>
            <div className='col-8  pt-3 bg-white'>
              <ListComment
                loading={this.state.loading}
                comments={this.state.comments}
              />
            </div>
          </div>
        </div>
        {/* <Footer /> */}
      </React.Fragment>
    );
  }
}
