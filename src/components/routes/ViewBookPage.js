import React from "react";
import Header from "../Header";
import Footer from "../Footer";
import DetailsSection from "../screens/BookDetailsSection"
import { withRouter } from "react-router-dom";

class ViewBookPage extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount(){
        fetch('/books/getBook', {
            method: 'POST',
            body: JSON.stringify({
                bookid: 1,
            }),
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => res.json())
            // .then(newInfo => {
            //     //look at address-info for return values
            //     this.getInfo();
            // })
            .catch(err => {
                console.log(err);
            })
    }

    render() {
        const {id} = this.props.match.params
        console.log(this.props);
        return (
            <div>
                <div className='body'>
                    <p>{id}</p>
                    <Footer />
                </div>
            </div>
        );
    }
}

export default ViewBookPage;
