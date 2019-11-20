import React, { Component } from 'react'
import Header from "../Header";
import Footer from "../Footer";
import CommentSection from "../screens/CommentSection"
import Context from '../Context';


export default class CommentPage extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <Context.Consumer>
                    {context => (
                      <div className='body'>
                          <CommentSection bookid={this.props.match.params.id} />
                          <Footer />
                      </div>

                    )}
               
                </Context.Consumer>
            </div>
        )
    }
}
