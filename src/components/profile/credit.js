import React from "react";
import LinearProgress from "@material-ui/core/LinearProgress";

class Credit extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: this.props.username,
            creditInfo: [],
            // ccnum: "",
            // expdate: "",
            // cvv: "",
            // name: "",
            // zip: "",
            inEditMode: false,
            loading: true
        };
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.getInfo();
    }

    getInfo() {
        fetch("/credit-info", {
            method: "POST",
            body: JSON.stringify({ username: this.props.username }),
            headers: { "Content-Type": "application/json" }
        })
            .then(res => res.json())
            .then(newInfo => {
                this.setState({
                    creditInfo: newInfo,
                    loading: false
                    // ccnum: newInfo.ccnum,
                    // expdate: newInfo.expdate,
                    // cvv: newInfo.cvv,
                    // name: newInfo.name,
                    // zip: newInfo.zip
                });
                console.log(this.state);
            })
            .catch(err => {
                console.log(err);
            });
    }

    handleInsert(newEntry) {
        fetch("/credit-info/insert", {
            method: "POST",
            body: JSON.stringify({
                username: this.props.username,
                info: newEntry
            }),
            headers: { "Content-Type": "application/json" }
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
        fetch("/credit-info/delete", {
            method: "POST",
            body: JSON.stringify({
                username: this.props.username,
                ccnum: entry
            }),
            headers: { "Content-Type": "application/json" }
        })
            .then(res => res.json())
            .then(newInfo => {
                this.getInfo();
                alert("Deleted!");
            })
            .catch(err => {
                console.log("Hello " + err);
            });
    }

    mySubmitHandler = () => {};

    changeEditMode = () => {
        this.setState({ inEditMode: true });
    };

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
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
                            onClick={() => this.changeEditMode()} //need form to input cc
                        >
                            EDIT
                        </button>
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

        const editCard = this.state.creditInfo.map(creditInfo => (
            <div>
                <div className='info-card'>
                    <div className='info-card-lc'>
                        <h1>
                            Credit Card Number:{" "}
                            <input
                                type='text'
                                className='form-control'
                                name='ccnum'
                                onChange={this.handleChange}
                                value={creditInfo.ccnum}
                            />
                        </h1>
                        <h1>
                            Expiration Date:{" "}
                            <input
                                type='text'
                                className='form-control'
                                name='expdate'
                                onChange={this.handleChange}
                                value={creditInfo.expdate}
                            />
                        </h1>
                        <h1>
                            CVV:{" "}
                            <input
                                type='text'
                                className='form-control'
                                name='cvv'
                                onChange={this.handleChange}
                                value={creditInfo.cvv}
                            />
                        </h1>
                        <h1>
                            Name On Card:{" "}
                            <input
                                type='text'
                                className='form-control'
                                name='name'
                                onChange={this.handleChange}
                                value={creditInfo.name}
                            />
                        </h1>
                        <h1>
                            Zip:{" "}
                            <input
                                type='text'
                                className='form-control'
                                name='zip'
                                onChange={this.handleChange}
                                value={creditInfo.zip}
                            />
                        </h1>
                    </div>
                    <div className='info-card-rc'>
                        <button
                            type='button'
                            class='btn btn-link btn-lg'
                            onClick={() => this.mySubmitHandler()} //need form to input cc
                        >
                            SAVE
                        </button>
                    </div>
                </div>
            </div>
        ));
        return (
            <div>
                {this.state.loading ? (
                    <LinearProgress />
                ) : this.state.inEditMode ? (
                    editCard
                ) : (
                    card
                )}
            </div>
        );
    }
}

export default Credit;
