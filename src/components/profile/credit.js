import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import CreditAddModal from '../profile/CreditAddModal';
import Context from '../Context';

class Credit extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: this.props.username,
            creditInfo: [],
            inEditMode: false,
            loading: true
        };
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.getInfo();
    }

    getInfo() {
        fetch('/credit-info', {
            method: 'POST',
            body: JSON.stringify({username: this.props.username}),
            headers: {'Content-Type': 'application/json'}
        })
            .then(res => res.json())
            .then(newInfo => {
                this.setState({
                    creditInfo: newInfo,
                    loading: false
                });
                console.log(this.state);
            })
            .catch(err => {
                console.log(err);
            });
    }

    handleRefresh = () => this.getInfo();

    handleInsert(newEntry) {
        fetch('/credit-info/insert', {
            method: 'POST',
            body: JSON.stringify({
                username: this.props.username,
                info: newEntry
            }),
            headers: {'Content-Type': 'application/json'}
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
            body: JSON.stringify({
                username: this.props.username,
                ccnum: entry
            }),
            headers: {'Content-Type': 'application/json'}
        })
            .then(res => res.json())
            .then(newInfo => {
                this.getInfo();
                alert('Deleted!');
            })
            .catch(err => {
                console.log('Hello ' + err);
            });
    }

    mySubmitHandler = event => {
        event.preventDefault();

        fetch('/personal-info/edit', {
            method: 'POST',
            body: JSON.stringify({
                ccnum: this.state.ccnum,
                cvv: this.state.cvv,
                name: this.state.name,
                zip: this.state.zip,
                expdate: this.state.expdate,
                username: this.state.username
            }),
            headers: {'Content-Type': 'application/json'}
        })
            .then(res => res.json())
            // .then(newInfo => {
            //     //look at address-info for return values
            //     this.getInfo();
            // })
            .catch(err => {
                console.log(err);
            });

        alert('Submitted!');
    };

    changeEditMode = () => {
        this.setState({inEditMode: true});
    };

    handleChange(e) {
        this.setState({[e.target.name]: e.target.value});
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
                        <button
                            type='button'
                            class='btn btn-link btn-lg'
                            onClick={() => this.handleDelete(creditInfo.ccnum)}
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
                            <h1 className='display-4 '>Credit Cards On File</h1>
                            <CreditAddModal
                                username={context.username}
                                getInfo={this.handleRefresh}
                            />
                        </div>
                        <div className='profile-card-content'>{card}</div>
                    </div>
                )}
            </Context.Consumer>
        );

        return <div>{this.state.loading ? <LinearProgress /> : result}</div>;
    }
}

export default Credit;
