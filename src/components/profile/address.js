import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';

class AddressCard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div>
                    <h1>Address: {this.props.address}</h1>
                    <h1>City: {this.props.address}</h1>
                    <h1>Zip: {this.props.address}</h1>
                </div>
            </div>
        );
    }
}

class Address extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: this.props.username,
            addressInfo: [],
            loading: true
        };
    }

    componentDidMount() {
        fetch('/address-info', {
            method: 'POST',
            body: JSON.stringify({ username: this.state.username }),
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => res.json())
            .then(addressInfo =>
                this.setState({ addressInfo: addressInfo, loading: false })
            );
        // console.log(this.state.personalInfo);
    }

    render() {
        const card = this.state.addressInfo.map(addressInfo => (
            <AddressCard
                address={addressInfo.address}
                city={addressInfo.city}
                zip={addressInfo.zip}
            />
        ));

        return <div>{card}</div>;
    }
}

export default Address;
