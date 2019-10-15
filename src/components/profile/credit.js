import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';

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
        this.getInfo();
        console.log('Mounted');
        // console.log(this.state.personalInfo);
    }

    getInfo() {
        fetch('/credit-info', {
            method: 'POST',
            body: JSON.stringify({ username: this.props.username }),
            headers: { 'Content-Type': 'application/json' }
        })
        .then(res => res.json())
        .then(newInfo => {
                this.setState({ creditInfo: newInfo, loading: false });
        })
        .catch(err => {
            console.log(err);
        });
    }

    handleInsert(newEntry) {
        fetch('/credit-info/insert', {
            method: 'POST',
            body: JSON.stringify({ username: this.props.username, info: newEntry }),
            headers: { 'Content-Type': 'application/json' }
        })
        .then(res => res.json())
        .then(newInfo => {
            this.getInfo();
        })
        .catch(err => {
            console.log(err);
        });
    }

    handleDelete(entry) {
        fetch('/credit-info/delete', {
            method: 'POST',
            body: JSON.stringify({ username: this.props.username, ccnum: entry }),
            headers: { 'Content-Type': 'application/json' }
        })
        .then(res => res.json())
        .then(newInfo => {
            this.getInfo();
        })
        .catch(err => {
            console.log("Hello " + err);
        });
    }

    render() {
        const card = this.state.creditInfo.map(creditInfo => (
            <div>
                <div className='info-card'>
                    <div className='info-card-lc'>
                        <h1>Credit Card Number: {creditInfo.ccnum}</h1>
                        <h1>Expiration Date: {creditInfo.expdate}</h1>
                        <h1>CVV: {creditInfo.cvv}</h1>
                        <h1>Name On Card: {creditInfo.name}</h1>
                        <h1>Zip: {creditInfo.zip}</h1>
                    </div>
                    <div className='info-card-rc'>
                        <button type='button' class='btn btn-link btn-lg'
                            onClick={() => this.handleInsert(creditInfo)} //need form to input cc
                        >
                            EDIT
                        </button>
                        <button type='button' class='btn btn-link btn-lg'
                            onClick={() => this.handleDelete(creditInfo.ccnum)}
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

export default Credit;
