import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';

class Personal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: this.props.username,
            personalInfo: [],
            loading: true
        };
    }

    componentDidMount() {
        fetch('/personal-info', {
            method: 'POST',
            body: JSON.stringify({ username: this.state.username }),
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => res.json())
            .then(personalInfos =>
                this.setState({ personalInfo: personalInfos, loading: false })
            );
        console.log('Mounted');
        // console.log(this.state.personalInfo);
    }

    render() {
        return (
            <div>
                <div className='info-card'>
                    <div className='info-card-lc'>
                        <h1>
                            First Name: {` `}
                            {this.state.loading ? (
                                <LinearProgress />
                            ) : (
                                this.state.personalInfo.fname
                            )}
                        </h1>
                        <h1>
                            Last Name: {` `}
                            {this.state.loading ? (
                                <LinearProgress />
                            ) : (
                                this.state.personalInfo.lname
                            )}
                        </h1>
                        <h1>
                            Email: {` `}
                            {this.state.loading ? (
                                <LinearProgress />
                            ) : (
                                this.state.personalInfo.email
                            )}
                        </h1>
                        <h1>
                            Username: {` `}
                            {this.state.loading ? (
                                <LinearProgress />
                            ) : (
                                this.state.personalInfo.userid
                            )}
                        </h1>
                        <h1>
                            Nickname: {` `}
                            {this.state.loading ? (
                                <LinearProgress />
                            ) : (
                                this.state.personalInfo.nickname
                            )}
                        </h1>
                        {/* <h1>: {this.state.personalInfo.}</h1> */}
                    </div>
                    <div className='info-card-rc'></div>
                </div>
            </div>
        );
    }
}

export default Personal;
