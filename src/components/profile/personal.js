import React from 'react';

class Personal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: this.props.username,
            personalInfo: []
        };
    }

    componentDidMount() {
        fetch('/personal-info', {
            method: 'POST',
            body: JSON.stringify( {username: this.state.username} ),
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => res.json())
            .then(personalInfo =>
                this.setState({ personalInfo: personalInfo })
            );
        console.log('Mounted');
        // console.log(this.state.personalInfo);
    }

    render() {
        return (
            <div>
                <h1>First Name:{this.state.personalInfo.fname}</h1>
                <h1>Last Name: {this.state.personalInfo.fname}</h1>
                <h1>Email: {this.state.personalInfo.email}</h1>
                <h1>Username: {this.state.personalInfo.userid}</h1>
                <h1>Nickname: {this.state.personalInfo.nickname}</h1>
                {/* <h1>: {this.state.personalInfo.}</h1> */}
            </div>
        );
    }
}

export default Personal;
