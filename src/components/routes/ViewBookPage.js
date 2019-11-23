import React from "react";
import Header from "../Header";
import Footer from "../Footer";
import DetailsSection from "../screens/BookDetailsSection"
import { withRouter } from "react-router-dom";
import Context from "../Context";

class ViewBookPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        
          
        return (
            <Context.Consumer>
            {context => (
            <div>
                <div className='body'>
                    <DetailsSection bookid={this.props.match.params.id} nickname={context.nickname}/>
                    <Footer />
                </div>
            </div>
            
            )}
            </Context.Consumer>
        );
        
    }
}

export default ViewBookPage;
