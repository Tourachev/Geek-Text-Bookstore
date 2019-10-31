// gonna make book card a click event
//include a readmore click event
import React from "react";
import { Table } from "reactstrap";
import { Button } from "react-bootstrap";
import { Icon } from "semantic-ui-react";
import {
    useParams
  } from "react-router-dom";
class DetailsSection extends React.Component {

    constructor(props) {
        super(props);
    }

    child() {
        // We can use the `useParams` hook here to access
        // the dynamic pieces of the URL.
        let { id } = useParams();

        return (
          <div>
            <h3>ID: {id}</h3>
          </div>
        );
    }

    render() {
        return (
            <div id='purchase-container'>
                {this.child}
            </div>
        );
    }
}

export default DetailsSection;
