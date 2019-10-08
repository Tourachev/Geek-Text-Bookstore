import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';

class CreditCard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div>
                    <h1>Credit Card Number: {this.props.ccnum}</h1>
                    <h1>Expiration Date: {this.props.expdate}</h1>
                    <h1>CVV: {this.props.cvv}</h1>
                    <h1>Name On Card: {this.props.name}</h1>
                    <h1>Zip: {this.props.zip}</h1>
                </div>
            </div>
        );
    }
}

class Credit extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: this.props.username,
            creditInfo: [],
            loading: true
        };
    }

    componentDidMount() {
        fetch('/credit-info', {
            method: 'POST',
            body: JSON.stringify({ username: this.state.username }),
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => res.json())
            .then(creditInfo =>
                this.setState({ creditInfo: creditInfo, loading: false })
            );
        console.log('Mounted');
        // console.log(this.state.personalInfo);
    }

    render() {
        const card = this.state.creditInfo.map(creditInfo => (
            <CreditCard
                ccnum={creditInfo.ccnum}
                cvv={creditInfo.cvv}
                name={creditInfo.name}
                expdate={creditInfo.expdate}
                zip={creditInfo.zip}
            />
        ));

        return <div>{card}</div>;
    }
}

export default Credit;
