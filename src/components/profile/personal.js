import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';

class Personal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: this.props.username,
            personalInfo: [],
            inEditMode: false,
            loading: true
        };
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        fetch('/personal-info', {
            method: 'POST',
            body: JSON.stringify({ username: this.state.username }),
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => res.json())
            .then(personalInfo =>
                this.setState({ personalInfo: personalInfo, loading: false })
            );
        console.log(this.state);
        // console.log(this.state.personalInfo);
    }

    mySubmitHandler = event => {
        // event.preventDefault();

        fetch('/personal-info/edit', {
            method: 'POST',
            body: JSON.stringify({
                username: this.state.personalInfo.username,
                email: this.state.personalInfo.email,
                fname: this.state.personalInfo.fname,
                lname: this.state.personalInfo.lname,
                nickname: this.state.personalInfo.nickname,
                username: this.state.personalInfo.username
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

        alert('Submitted!');
        window.location.reload();
    };

    changeEditMode = () => {
        this.setState({ inEditMode: true });
    };

    handleChange(evt) {
        this.setState({
            [evt.target.name]: evt.target.value
        });
    }

    renderEditView = () => {
        return (
            <div>
                <div className='info-card'>
                    <form onSubmit={this.mySubmitHandler}>
                        <div className='info-card-lc'>
                            <h1>
                                First Name:{' '}
                                <input
                                    type='text'
                                    className='form-control'
                                    name='fname'
                                    onChange={this.handleChange}
                                    value={this.state.personalInfo.fname}
                                />
                            </h1>
                            <h1>
                                Last Name:{' '}
                                <input
                                    type='text'
                                    className='form-control'
                                    name='lname'
                                    onChange={this.handleChange}
                                    value={this.state.personalInfo.lname}
                                />
                            </h1>
                            <h1>
                                Email:{' '}
                                <input
                                    type='text'
                                    className='form-control'
                                    name='email'
                                    onChange={this.handleChange}
                                    value={this.state.personalInfo.email}
                                />
                            </h1>
                            <h1>
                                Username:{' '}
                                <input
                                    type='text'
                                    className='form-control'
                                    name='username'
                                    onChange={this.handleChange}
                                    value={this.state.personalInfo.userid}
                                />
                            </h1>
                            <h1>
                                Nickname:{' '}
                                <input
                                    type='text'
                                    className='form-control'
                                    name='nickname'
                                    onChange={this.handleChange}
                                    value={this.state.personalInfo.nickname}
                                />
                            </h1>
                        </div>
                        <div className='info-card-rc'>
                            <button
                                type='submit'
                                class='btn btn-link btn-lg'
                                onClick={() => this.mySubmitHandler()}
                            >
                                SAVE
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    };

    renderDefaultView = () => {
        return (
            <div>
                <div className='info-card'>
                    <div className='info-card-lc'>
                        <h1>First Name: {this.state.personalInfo.fname}</h1>
                        <h1>Last Name: {this.state.personalInfo.lname}</h1>
                        <h1>Email: {this.state.personalInfo.email}</h1>
                        <h1>Username: {this.state.personalInfo.userid}</h1>
                        <h1>Nickname: {this.state.personalInfo.nickname}</h1>
                    </div>
                    <div className='info-card-rc'>
                        <button
                            type='button'
                            class='btn btn-link btn-lg'
                            onClick={() => this.changeEditMode()} //need form to input cc
                        >
                            EDIT
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    render() {
        return (
            <div>
                {this.state.loading ? (
                    <LinearProgress />
                ) : this.state.inEditMode ? (
                    this.renderEditView()
                ) : (
                    this.renderDefaultView()
                )}
            </div>
        );
    }
}

export default Personal;
