import React from 'react';

class Address extends React.Component {
    constructor(props) {
        super();
    }

    render() {
        return (
            <div>
                <h1>Address: </h1>
                <h1>City: </h1>
                <h1>Zip: </h1>
                <h1>Country: </h1>
            </div>
        );
    }
}

export default Address;
