import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import AddressEditModal from '../profile/AddressEditModal';

class Address extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            //this needs to change to userid using the context
            username: this.props.username,
            addressInfo: [],
            loading: true
        };
    }

    componentDidMount() {
        this.getInfo();
        // console.log(this.state.personalInfo);
    }

    getInfo() {
        fetch('/address-info', {
            method: 'POST',
            body: JSON.stringify({ username: this.state.username }), //change to userid
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => res.json())
            .then(newInfo => {
                this.setState({ addressInfo: newInfo, loading: false });
            })
            .catch(err => {
                console.log(err);
            });
    }

    handleInsert(addressInfo) {
        fetch('/address-info/insert', {
            method: 'POST',
            body: JSON.stringify({
                username: this.state.username, //change to userid
                state: addressInfo.state,
                city: addressInfo.city,
                address: addressInfo.address,
                zip: addressInfo.zip
            }),
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => res.json())
            .then(newInfo => {
                //look at address-info for return values
                this.getInfo();
            })
            .catch(err => {
                console.log(err);
            });
    }

    handleDelete(addressInfo) {
        fetch('/address-info/delete', {
            method: 'POST',
            body: JSON.stringify({
                username: this.state.username, //change to userid
                state: addressInfo.state,
                city: addressInfo.city,
                address: addressInfo.address,
                zip: addressInfo.zip
            }),
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => res.json())
            .then(newInfo => {
                //look at address-info for return values
                this.getInfo();
                alert('Deleted!');
            })
            .catch(err => {
                console.log(err);
            });
    }

    render() {
        const card = this.state.addressInfo.map((addressInfo, key) => (
            <div>
                <div className='info-card'>
                    <div className='info-card-lc'>
                        <h1>Address: {addressInfo.address}</h1>
                        <h1>City: {addressInfo.city}</h1>
                        <h1>State: {addressInfo.state}</h1>
                        <h1>Zip: {addressInfo.zip}</h1>
                    </div>
                    <div className='info-card-rc'>
                        <button
                            type='button'
                            class='btn btn-link btn-lg'
                            onClick={() => this.handleInsert(addressInfo)} //need form to input ADDRESS
                        >
                            EDIT
                        </button>

                        {/* <AddressEditModal /> */}
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
