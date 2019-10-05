import React from 'react';

class Credit extends React.Component {
    constructor(props) {
        super();
    }

    render() {
        return (
            <div>
                <h1>Card Number: </h1>
                <h1>Expiration Date: </h1>
                <h1>Name On Card: </h1>
                <h1>CVV: </h1>
            </div>
        );
    }
}

export default Credit;
