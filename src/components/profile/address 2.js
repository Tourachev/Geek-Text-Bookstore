import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import AddressAddModal from '../profile/AddressAddModal';
import Context from '../Context';

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
        this.getInfo(this.state.username);
        // console.log(this.state.personalInfo);
    }

    getInfo() {
        fetch('/address-info', {
            method: 'POST',
            body: JSON.stringify({username: this.state.username}),
            headers: {'Content-Type': 'application/json'}
        })
            .then(res => res.json())
            .then(newInfo => {
                this.setState({addressInfo: newInfo, loading: false});
            })
            .catch(err => {
                console.log(err);
            });
    }

    handleRefresh = () => this.getInfo();

    handleInsert(addressInfo) {
        fetch('/address-info/insert', {
            method: 'POST',
            body: JSON.stringify({
                username: this.state.username,
                state: addressInfo.state,
                city: addressInfo.city,
                address: addressInfo.address,
                zip: addressInfo.zip
            }),
            headers: {'Content-Type': 'application/json'}
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
                username: this.state.username,
                state: addressInfo.state,
                city: addressInfo.city,
                address: addressInfo.address,
                zip: addressInfo.zip
            }),
            headers: {'Content-Type': 'application/json'}
        })
            .then(res => res.json())
            .then(newInfo => {
                //look at address-info for return values
                this.getInfo(this.state.username);
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
                            onClick={() => this.handleDelete(addressInfo)}
                        >
                            DELETE
                        </button>
                    </div>
                </div>
            </div>
        ));

        const result = (
            <Context.Consumer>
                {context => (
                    <div className='profile-card'>
                        <div className='profile-card-header'>
                            <h1 className='display-4 '>Addresses On File</h1>
                            <AddressAddModal
                                username={context.username}
                                getInfo={this.handleRefresh}
                            />
                        </div>
                        <div className='profile-card-content'> {card} </div>
                    </div>
                )}
            </Context.Consumer>
        );

        return <div>{this.state.loading ? <LinearProgress /> : result}</div>;
    }
}

export default Address;
