import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';

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

    handleDelete(addressInfo) {
        fetch('/address-info/delete', {
            method: 'POST',
            body: JSON.stringify({ address: addressInfo.address }),
            headers: { 'Content-Type': 'application/json' }
        });
    }

    render() {
        const card = this.state.addressInfo.map((addressInfo, key) => (
            <div>
                <div className='info-card'>
                    <div className='info-card-lc'>
                        {/* <h1>{key + 1}</h1> */}
                        <h1>Address: {addressInfo.address}</h1>
                        <h1>City: {addressInfo.city}</h1>
                        <h1>State: {addressInfo.state}</h1>
                        <h1>Zip: {addressInfo.zip}</h1>
                    </div>
                    <div className='info-card-rc'>
                        <button type='button' class='btn btn-link btn-lg'>
                            EDIT
                        </button>
                        <button
                            type='button'
                            class='btn btn-link btn-lg'
                            onClick={() => this.handleDelete(addressInfo)}
                        >
                            DELETE
                        </button>
                    </div>
                </div>
            </div>
        ));

        return <div>{this.state.loading ? <LinearProgress /> : card}</div>;
    }
}

export default Address;
