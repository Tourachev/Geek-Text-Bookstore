
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
            <div>
                <div className='body'>
                    <DetailsSection bookid={this.props.match.params.id} />
                    <Footer />
                </div>
            </div>
     
        );
        
    }

}

export default ViewBookPage;