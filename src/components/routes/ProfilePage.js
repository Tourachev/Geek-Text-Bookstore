import React from 'react';
import Navbar2 from '../NavBar2';
import Footer from '../Footer';
import Personal from '../profile/personal';
import Credit from '../profile/credit';
import Address from '../profile/address';

class ProfilePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: this.props.location.state.username,
            personalInfo: [],
            addressInfo: [],
            creditInfo: []
        };
    }

    componentDidMount() {
        // console.log(this.state.username);
        // const addressPath = '/addressInfo' + this.user;
        // fetch(addressPath)
        //     .then(res => res.json())
        //     .then(personalInfo => this.setState({ addressInfo: personalInfo }));
        // const creditPath = '/creditInfo' + this.user;
        // fetch(creditPath)
        //     .then(res => res.json())
        //     .then(personalInfo => this.setState({ creditInfo: personalInfo }));
    }

    render() {
        return (
            <div>
                <div className='body'>
                    <Navbar2 />
                    <div className='container' id='profile-page'>
                        <h1 className='display-3 '>Profile Management</h1>
                        <hr />
                        <div className='profile-card'>
                            <div className='profile-card-header'>
                                <h1 className='display-4 '>Personnal Info</h1>
                                <button
                                    type='button'
                                    class='btn btn-link btn-lg'
                                >
                                    EDIT
                                </button>
                            </div>
                            <div className='profile-card-content'>
                                <Personal username={this.state.username} />
                            </div>
                        </div>
                        <hr />

                        <div className='profile-card'>
                            <div className='profile-card-header'>
                                <h1 className='display-4 '>
                                    Addresses On File
                                </h1>
                                <button
                                    type='button'
                                    class='btn btn-link btn-lg'
                                >
                                    EDIT
                                </button>
                            </div>
                            <div className='profile-card-content'>
                                <Address username={this.state.username} />
                            </div>
                        </div>
                        <hr />

                        <div className='profile-card'>
                            <div className='profile-card-header'>
                                <h1 className='display-4 '>
                                    Credit Cards On File
                                </h1>
                                <button
                                    type='button'
                                    class='btn btn-link btn-lg'
                                >
                                    EDIT
                                </button>
                            </div>
                            <div className='profile-card-content'>
                                <Credit username={this.state.username} />
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        );
    }
}

export default ProfilePage;
